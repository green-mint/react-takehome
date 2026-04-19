import { useEffect, useState } from "react";
import { TItinerary } from "./itn.types";

const BATCH_SIZE = 30;
const BATCH_DELAY_MS = 3000;

export default function useStreamItns() {
  const [itns, setItns] = useState<TItinerary[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const streamItns = async () => {
      try {
        const mockItns = await import("@/mock/itineraries.mock").then((m) => m.itineraries);
        const allItns = mockItns;

        if (cancelled) return;

        setItns([]);
        setCompleted(false);

        const appendBatch = (startIndex: number) => {
          if (cancelled) return;

          const nextBatch = allItns.slice(startIndex, startIndex + BATCH_SIZE);

          if (nextBatch.length === 0) {
            setCompleted(true);
            return;
          }

          setItns((currentItns) => currentItns.concat(nextBatch));

          const nextIndex = startIndex + BATCH_SIZE;

          if (nextIndex >= allItns.length) {
            setCompleted(true);
            return;
          }

          timeoutId = setTimeout(() => appendBatch(nextIndex), BATCH_DELAY_MS);
        };

        appendBatch(0);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to stream itineraries", error);
          setCompleted(true);
        }
      }
    };

    void streamItns();

    return () => {
      cancelled = true;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return { itns, completed };
}
