import React from "react";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { formatPrice } from "@/lib/utils";
import { TDItinerary } from "@/lib/detailed-itn.types";
import ItineraryDetails from "./itinerary-details";

type Props = {
  itn: TDItinerary;
  isDesktop: boolean;
};

export default function ItineraryPopup({ itn, isDesktop }: Props) {
  return (
    <React.Fragment>
      {isDesktop && (
        <DialogHeader className="bg-background-bg-base">
          <DialogTitle>Itinerary Details</DialogTitle>
          <DialogClose />
        </DialogHeader>
      )}
      <div
        id="expanded-itn-content"
        className="relative flex grow flex-col lg:min-h-0"
      >
        <div className="bg-background-bg-base no-scrollbar lg:rounded-b-4xl relative flex grow flex-col items-center pb-4 lg:min-h-0 lg:overflow-y-auto lg:border-b">
          <div className="max-w-110 w-full grow px-6">
            <ItineraryDetails itn={itn} />
          </div>
        </div>
        {isDesktop && (
          <DialogFooter className="flex-col items-end gap-1 px-7 py-6">
            <span>
              <span className="heading-1 font-semibold">
                {formatPrice(itn.total)}
              </span>
              {itn.pax > 1 && (
                <span className="heading-2 font-normal"> / person</span>
              )}
            </span>
          </DialogFooter>
        )}
      </div>
    </React.Fragment>
  );
}

// function getDisclaimers(itn: TDItinerary, isDesktop: boolean) {
//   const cabinMeta = getCabinsMeta(itn);
//   const shouldColorCabins = !!cabinMeta.cabinColor;

//   const disclaimers: { label: string; color?: string }[] = [
//     {
//       label: `${itn.pax} Passenger${itn.pax > 1 ? "s" : ""}`,
//     },
//   ];

//   if (itn.pax > 1 && isDesktop) {
//     disclaimers.push({
//       label: `${formatPrice(itn.total * itn.pax)} total`,
//     });
//   }

//   if (!isDesktop) {
//     disclaimers.push({
//       label: itn.type === TripTypes.Oneway ? "One way" : "Round trip",
//     });
//   }

//   disclaimers.push({
//     label: cabinMeta.label,
//     color: cabinMeta.cabinColor,
//   });

//   return {
//     disclaimers,
//     shouldColorCabins,
//   };
// }

// function getCabinsMeta(itn: TDItinerary) {
//   const cabins = Array.from(
//     new Set(itn.flights.flatMap((f) => f.legs.map((l) => l.cabin))),
//   );

//   if (cabins.length !== 1) {
//     if (
//       cabins.includes(Cabins["Premium Economy"]) ||
//       cabins.includes(Cabins.Economy)
//     ) {
//       return {
//         label: getCabinsLabel(cabins),
//         cabinColor: getCabinColor(Cabins.Economy),
//       };
//     } else if (cabins.includes(Cabins.First)) {
//       if (!areAllFirstClassLegsUSDomestic(itn)) {
//         return {
//           label: getCabinsLabel(cabins),
//           cabinColor: getCabinColor(Cabins.First),
//         };
//       }
//     }
//   }

//   return {
//     label: getCabinsLabel(cabins),
//     cabinColor: getCabinColor(Cabins.Business),
//   };
// }

// function areAllFirstClassLegsUSDomestic(itn: TDItinerary) {
//   return itn.flights.every((f) =>
//     f.legs.every((l) =>
//       l.cabin === Cabins.First
//         ? l.origin.country === "United States" &&
//           l.destination.country === "United States"
//         : true,
//     ),
//   );
// }

// function getCabinsLabel(cabins: Cabins[]) {
//   return cabins.map((c) => cabinMap[c].replace(" Class", "")).join(" + ");
// }
