import { useMemo } from "react";
import { TItinerary } from "./itn.types";

export const ITNS_TO_RENDER = 120;

export default function useSortItns(itns: TItinerary[]) {
  const sortedItns = useMemo(() => {
    return itns.sort((a, b) => a.total - b.total);
  }, [itns]);

  return sortedItns.slice(0, ITNS_TO_RENDER);
}
