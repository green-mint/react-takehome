import {
  formatDateTime,
  minutesToHoursMinutes,
  formatPrice,
} from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { CSSProperties } from "react";
import AirlineImage from "@/components/airline-image";
import { TDFlight, TDItinerary } from "@/lib/detailed-itn.types";

export default function ItnCardMobile({ itn }: { itn: TDItinerary }) {
  return (
    <div className="squircle-3xl shadow-(--shadow-v2-border-card) divide-y overflow-clip">
      <div className="bg-background-bg-base gap-3.75 flex flex-col p-4 pr-6">
        {itn.flights.map((f) => (
          <FlightMobile key={f.id} f={f} moc={f.moc} />
        ))}
      </div>
      <div className="bg-background-subtle-low py-2.25 flex items-center gap-5 pl-4 pr-6">
        <span className="heading-5 text-foreground-fg-muted min-w-0 grow overflow-hidden text-ellipsis whitespace-nowrap">
          {itn.airlines.map((a) => a.name).join(", ")}
        </span>
        <span className="heading-3 text-[0.90625rem] font-semibold">
          {formatPrice(itn.total)}
        </span>
      </div>
    </div>
  );
}

type FlightMobileProps = {
  f: TDFlight;
  moc: string;
};

function FlightMobile({ f, moc }: FlightMobileProps) {
  const dayDifference = differenceInCalendarDays(
    new Date(f.arrival),
    new Date(f.departure),
  );

  const numStops = f.legs.length - 1;

  return (
    <div
      style={{ "--tc-width": "4rem" } as CSSProperties}
      className="flex items-center gap-3.5"
    >
      <AirlineImage className="squircle-md size-7 shrink-0" code={moc} />
      <div className="flex w-full justify-between gap-2">
        <div className="w-(--tc-width)">
          <span className="heading-4 block">
            {formatDateTime(f.departure, "h:mm a")}
          </span>
          <span className="label-md text-foreground-fg-muted block">
            {f.origin.code}
          </span>
        </div>
        <div className="max-w-30 flex grow flex-col items-center justify-center self-stretch">
          <Stops numStops={numStops} />
          <span className="heading-5 text-foreground-fg-subtle block">
            {numStops === 0 ? "Nonstop" : minutesToHoursMinutes(f.duration)}
          </span>
        </div>
        <div className="w-(--tc-width) relative text-right">
          {dayDifference > 0 && (
            <sup className="text-foreground-fg-muted -right-2.75 absolute top-1.5 text-[9px] tracking-[-1px]">
              +{dayDifference}
            </sup>
          )}
          <span className="heading-4 block">
            {formatDateTime(f.arrival, "h:mm a")}
          </span>
          <span className="label-md text-foreground-fg-muted block">
            {f.destination.code}
          </span>
        </div>
      </div>
    </div>
  );
}

function Stops({ numStops }: { numStops: number }) {
  return (
    <div className="h-3.75 z-1 relative flex w-full items-center justify-center gap-1">
      {Array.from({ length: numStops }).map((_, i) => (
        <div
          key={i}
          className="bg-background-bg-base size-2.75 rounded-full border border-black/10"
        />
      ))}
      <div className="-z-1 absolute top-1/2 h-px w-full -translate-y-1/2 bg-black/10" />
    </div>
  );
}
