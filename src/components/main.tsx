"use client";

import { TripTypes } from "@/lib/itn.types";
import useStreamItns from "@/lib/use-stream-itns";
import { useMediaQuery } from "@base-ui/react/unstable-use-media-query";
import ItinerariesList from "./itineraries-list";
import useSortItns from "@/lib/use-sort-itns";
import useDetailedItns from "@/lib/use-detailed-itns";

export default function Main() {
  const isDesktop = useMediaQuery("(min-width: 1024px)", {});
  const { itns, completed } = useStreamItns();
  const sorted = useSortItns(itns);
  const detailed = useDetailedItns(sorted);

  return (
    <div className="max-w-3xl mx-auto pt-20">
      <ItinerariesList
        itns={detailed}
        device={isDesktop ? "desktop" : "mobile"}
        completed={completed}
        tripType={TripTypes.Oneway}
      />
    </div>
  );
}
