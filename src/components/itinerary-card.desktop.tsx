import { formatPrice } from "@/lib/utils";
import { Checkbox } from "@/components/base/checkbox";
import { formatDateTime, minutesToHoursMinutes } from "@/lib/utils";
import AirlineImage from "@/components/airline-image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/tooltip";
import { TDFlight, TDItinerary } from "@/lib/detailed-itn.types";

type Props = {
  itn: TDItinerary;
};

export default function ItineraryCardDesktop({ itn }: Props) {
  const showCheckbox = itn.flights.length > 1;
  return (
    <div className="squircle-3xl shadow-(--shadow-elevation-itinerary-card-desktop) bg-background-bg-base relative flex divide-x overflow-clip">
      <div className="grow divide-y">
        {itn.flights.map((f) => (
          <Flight key={f.id} f={f} showCheckbox={showCheckbox} />
        ))}
      </div>
      <div className="w-33 flex items-end justify-end self-stretch p-7">
        <span className="heading-1 font-semibold">
          {formatPrice(itn.total)}
        </span>
      </div>
    </div>
  );
}

type FlightProps = {
  f: TDFlight;
  showCheckbox: boolean;
};

function Flight({ f, showCheckbox }: FlightProps) {
  const numStops = f.legs.length - 1;

  return (
    <div className="flex items-center gap-1.5 py-3 pl-7 pr-4">
      {showCheckbox && (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox className="squircle-base size-4 shadow-[0_3.429px_4.571px_0_rgba(0,0,0,0.04),0_1.143px_2.286px_0_rgba(0,0,0,0.10),0_0_0_1.143px_rgba(0,0,0,0.10)] [&_svg]:size-3" />
        </div>
      )}
      <div className="flex grow gap-5 p-4">
        <AirlineImage code={f.moc} className="squircle-lg size-9 shrink-0" />
        <div className="flex grow gap-6">
          <div className="flex w-1/2 flex-col gap-0.5">
            <span className="heading-2">
              {formatDateTime(f.departure, "h:mm a")} –{" "}
              {formatDateTime(f.arrival, "h:mm a")}
            </span>
            <p className="label-md text-foreground-fg-subtle">
              {f.airlines.map((airline, index) =>
                index === 0 && f.airlines.length > 1 ? (
                  <Tooltip key={airline.code}>
                    <TooltipTrigger
                      render={
                        <span key={airline.code}>
                          <span className="underline decoration-dotted underline-offset-2">
                            {airline.name}
                          </span>
                          {", "}
                        </span>
                      }
                    />
                    <TooltipContent side="bottom">
                      {f.mocPercentage}% {airline.name} operated
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span key={airline.code}>
                    {airline.name}
                    {f.airlines.length > 1 &&
                      index < f.airlines.length - 1 &&
                      ", "}
                  </span>
                ),
              )}
            </p>
          </div>
          <div className="flex w-1/2 gap-14">
            <div className="min-w-18 flex w-fit flex-col gap-0.5">
              <span className="heading-3 font-medium">
                {minutesToHoursMinutes(f.duration)}
              </span>
              <span className="label-md text-foreground-fg-subtle">
                {f.origin.code} - {f.destination.code}
              </span>
            </div>
            <div className="flex w-1/2 flex-col justify-center gap-0.5">
              <span className="heading-3 font-medium">
                {!numStops
                  ? "Nonstop"
                  : `${numStops} Stop${numStops > 1 ? "s" : ""}`}
              </span>
              {numStops > 0 && (
                <span className="label-md text-foreground-fg-subtle">
                  {f.legs
                    .slice(0, -1)
                    .map((l) => l.destination.code)
                    .join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
