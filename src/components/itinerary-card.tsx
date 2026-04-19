import { cn } from "@/lib/utils";
import ItnCardMobile from "./itinerary-card.mobile";
import ItineraryCardDesktop from "./itinerary-card.desktop";
import { TDItinerary } from "@/lib/detailed-itn.types";

type Props = React.ComponentPropsWithRef<"div"> & {
  itn: TDItinerary;
  device: "mobile" | "desktop";
};

export default function ItineraryCard({
  itn,
  device,
  className,
  ref,
  ...props
}: Props) {
  return (
    <div ref={ref} className={cn(className)} {...props}>
      {device === "mobile" ? (
        <ItnCardMobile itn={itn} />
      ) : (
        <ItineraryCardDesktop itn={itn} />
      )}
    </div>
  );
}
