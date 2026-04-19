"use client";

import ItineraryCard from "./itinerary-card";
import { TDItinerary } from "@/lib/detailed-itn.types";
import { Dialog as DialogBase } from "@base-ui/react/dialog";
import { Dialog, DialogTrigger, DialogContent } from "@/components/base/dialog";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/base/drawer";
import ItineraryPopup from "./itinerary-popup";
import ItineraryCardSkeleton from "./itinerary-card-skeleton";
import { TripTypes } from "../lib/itn.types";

type Props = {
  itns: TDItinerary[];
  device: "mobile" | "desktop";
  completed: boolean;
  tripType: TripTypes;
};

const handle = DialogBase.createHandle<TDItinerary>();

export default function ItinerariesList({
  itns,
  device,
  completed,
  tripType,
}: Props) {
  const Root = device === "desktop" ? Dialog : Drawer;
  const Trigger = device === "desktop" ? DialogTrigger : DrawerTrigger;

  if (completed && itns.length === 0) return <div>No itineraries found</div>;

  return (
    <div className="flex min-h-screen flex-col gap-4 px-6 pt-3 lg:gap-5 lg:px-0 lg:pt-0">
      {itns.map((itn) => (
        <Trigger
          key={itn.id}
          nativeButton={false}
          payload={itn}
          handle={handle}
          render={<ItineraryCard device={device} itn={itn} />}
        />
      ))}
      {!completed &&
        Array.from({ length: 10 }).map((_, i) => (
          <ItineraryCardSkeleton key={i + 500} tripType={tripType} />
        ))}
      <Root handle={handle}>
        {({ payload: itn }) => (
          <ItineraryPopupContent itn={itn} isDesktop={device === "desktop"} />
        )}
      </Root>
    </div>
  );
}

type ItnPopupBaseProps = {
  itn: TDItinerary | undefined;
  isDesktop: boolean;
};

function ItineraryPopupContent({ itn, isDesktop }: ItnPopupBaseProps) {
  if (isDesktop) {
    return (
      <DialogContent className="lg:max-w-200 xl:max-w-220 bg-background-bg-subtle-low flex h-[80vh] flex-col overflow-clip">
        {itn && <ItineraryPopup itn={itn} isDesktop={isDesktop} />}
      </DialogContent>
    );
  }

  return (
    <DrawerContent
      showHandle
      className="h-screen"
      contentClassName="flex flex-col min-h-full"
    >
      {itn && <ItineraryPopup itn={itn} isDesktop={isDesktop} />}
    </DrawerContent>
  );
}
