import { TDFlight, TDItinerary, TDLeg } from "@/lib/detailed-itn.types";
import { formatDateTime, minutesToHoursMinutes } from "@/lib/utils";
import React, { useState } from "react";
import {
  CaretRightIcon,
  ClockIcon,
  ArrowCircleUpRightIcon,
  CaretUpIcon,
} from "@phosphor-icons/react/dist/ssr";
import Point from "@/components/base/point";
import { Cabins } from "@/lib/itn.types";
import { differenceInCalendarDays } from "date-fns";
import AirlineImage from "./airline-image";
import { IconButton } from "@/components/base/icon-button";
import { Dialog as DialogBase } from "@base-ui/react/dialog";
import { DialogTrigger } from "@/components/base/dialog";

type Props = {
  itn: TDItinerary;
};

type LegDrawerPayload = {
  idx: number;
  isOb: boolean;
};

const legDrawerHandle = DialogBase.createHandle<LegDrawerPayload>();

export default function ItineraryDetails({ itn }: Props) {
  return (
    <React.Fragment>
      <div className="pt-2.5 lg:pt-3">
        {itn.flights.map((f, i) => (
          <FlightDetails key={f.id} f={f} isOb={i === 0} />
        ))}
      </div>
    </React.Fragment>
  );
}

type FlightDetailsProps = {
  f: TDFlight;
  isOb: boolean;
};

export function FlightDetails({ f, isOb }: FlightDetailsProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="">
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer select-none items-center justify-between py-5"
      >
        <div className="flex items-center gap-1.5">
          <ArrowCircleUpRightIcon
            className={`size-4.5 ${isOb ? "text-[#90C9FF]" : "text-[#5FC7A6A6]"}`}
          />
          <div className="flex items-center gap-2.5">
            <span className="heading-2 text-foreground-fg-base font-semibold">
              {f.origin.city} to {f.destination.city}
            </span>
            <div className="bg-foreground-fg-disabled h-2 w-px" />
            <span className="heading-3 text-foreground-fg-disabled">
              {minutesToHoursMinutes(f.duration)}
            </span>
          </div>
        </div>
        <IconButton
          variant="transparent"
          size="sm"
          className="left-1.25 relative"
          onClick={() => setOpen(!open)}
        >
          <CaretUpIcon
            className={`text-foreground-fg-muted size-4 ${open ? "" : "rotate-180"}`}
          />
        </IconButton>
      </div>
      {open && (
        <div className="pb-7 pt-1 [--fcolw:3.75rem] [--gap:1.25rem]">
          {f.legs.map((l, i) => (
            <React.Fragment key={i}>
              <LegCard
                key={i}
                l={l}
                isFirst={i === 0}
                isLast={i === f.legs.length - 1}
                fdeparture={f.departure}
                idx={i}
                isOb={isOb}
              />
              {l.layover > 0 && (
                <Layover l={l} nextOrigin={f.legs.at(i + 1)?.origin.code} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

type LegCardProps = {
  l: TDLeg;
  isFirst: boolean;
  isLast: boolean;
  fdeparture: string;
  idx: number;
  isOb: boolean;
};

function LegCard({ l, isFirst, isLast, fdeparture, idx, isOb }: LegCardProps) {
  const airline = l.operatingAirline ?? l.airline;

  return (
    <div className="">
      {isFirst && (
        <div
          style={{
            boxShadow: isOb
              ? "0 0 0 1px rgba(51, 127, 225, 0.07), 0 1px 0 0 #FFF inset"
              : "0 1px 0 0 #FFF inset, 0 0 0 1px rgba(4, 159, 111, 0.07)",
            backgroundColor: isOb ? "#F5F8FC" : "#F5FCFA",
          }}
          className="-mb-4 rounded-t-[20px] pb-4"
        >
          <div
            className={`label-sm pb-2.25 flex items-center gap-2 pl-4 pr-6 pt-2.5 font-medium ${isOb ? "text-[#94A4B7]" : "text-[#86A89D]"}`}
          >
            <span>Depart</span>
            <Point className={isOb ? "bg-[#94A4B7]" : "bg-[#86A89D]"} />
            <span>{formatDateTime(l.departure, "eee, d MMM")}</span>
          </div>
        </div>
      )}
      <DialogTrigger
        handle={legDrawerHandle}
        payload={{ idx, isOb }}
        nativeButton={false}
        render={
          <div
            style={{
              boxShadow: isOb
                ? "0 16px 120px 0 rgba(178, 178, 178, 0.09), 0 0 0 1px rgba(51, 127, 225, 0.06), 0 0 6px 0 rgba(51, 127, 225, 0.06), 0 8px 12px 0 rgba(51, 127, 225, 0.06)"
                : "0 0 0 1px rgba(4, 159, 111, 0.06), 0 0 6px 0 rgba(4, 159, 111, 0.06), 0 8px 12px 0 rgba(4, 159, 111, 0.06)",
            }}
            className="z-1 bg-background-bg-base gap-(--gap) squircle-3xl relative flex px-6 py-4"
          >
            <div className="w-(--fcolw) flex shrink-0">
              <div className="min-w-0 shrink grow basis-0" />
              <div className="flex min-w-fit shrink-0 flex-col items-end justify-between">
                <LegTime
                  time={l.departure}
                  daysDiff={differenceInCalendarDays(l.departure, fdeparture)}
                />
                <span className="heading-5 text-foreground-fg-muted">
                  {minutesToHoursMinutes(l.duration)}
                </span>
                <LegTime
                  time={l.arrival}
                  daysDiff={differenceInCalendarDays(l.arrival, fdeparture)}
                />
              </div>
              <div className="basis-1.25 min-w-0 shrink grow-0" />
            </div>
            <div className="flex flex-col items-center justify-center py-2">
              <div className="h-26 bg-black/6 w-px" />
            </div>
            <div className="flex grow flex-col justify-between overflow-hidden pl-2">
              <LegAirport airport={l.origin} />

              {/* Aircraft, cabin etc */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AirlineImage
                    code={airline.code}
                    className="squircle-lg size-7 shrink-0"
                  />
                  <div>
                    <span className="heading-5 text-foreground-fg-subtle block">
                      {airline.name}
                    </span>
                    <span
                      style={{
                        color: getCabinColor(l.cabin),
                      }}
                      className="label-sm text-foreground-fg-disabled block"
                    >
                      {cabinMap[l.cabin]}
                    </span>
                  </div>
                </div>
                <CaretRightIcon className="text-foreground-fg-muted size-2.5" />
              </div>
              <LegAirport airport={l.destination} />
            </div>
          </div>
        }
      />
      {isLast && (
        <div className="bg-background-bg-subtle-low border-black/2 -mt-3 rounded-b-[20px] border border-t-0 pt-3">
          <div className="label-sm text-foreground-fg-disabled pb-3 pt-2.5 text-center font-medium">
            <span>
              You’ll arrive in {l.destination.city} on{" "}
              {formatDateTime(l.arrival, "eee, d MMM")}{" "}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Layover({ l, nextOrigin }: { l: TDLeg; nextOrigin?: string }) {
  const isAirportChange = nextOrigin && l.destination.code !== nextOrigin;
  return (
    <div className="h-24.5 flex items-center gap-4 pl-[calc(var(--fcolw)+var(--gap)+1rem)]">
      <div className="gap-1.25 flex flex-col items-center self-stretch py-2">
        <div className="w-px grow -translate-x-1/2 border-l border-dashed border-black/10" />
        <div
          style={{
            boxShadow:
              "0 0.2px 2px 0 rgba(0, 0, 0, 0.02), 0 0.5px 2px 0 rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)",
          }}
          className="size-4.5 bg-background-bg-subtle-low grid place-items-center rounded-md"
        >
          <ClockIcon className="text-foreground-fg-disabled size-3" />
        </div>
        <div className="w-px grow -translate-x-1/2 border-l border-dashed border-black/10" />
      </div>
      <div className="space-y-1">
        <span className="text-foreground-fg-subtle heading-5 block font-semibold">
          {minutesToHoursMinutes(l.layover)} layover
        </span>
        {isAirportChange ? (
          <span className="text-accent-orange-fg-subtle label-sm block">
            Airport change from {l.destination.code} to {nextOrigin}
          </span>
        ) : (
          <span className="label-xs text-foreground-fg-disabled block underline decoration-dotted">
            {l.destination.name} - {l.destination.code}
          </span>
        )}
      </div>
    </div>
  );
}

function LegAirport({ airport }: { airport: { city: string; code: string } }) {
  return (
    <div className="flex h-5 items-center gap-2">
      <span className="heading-3 font-semibold">{airport.city}</span>
      <span className="heading-4 text-foreground-fg-muted">{airport.code}</span>
    </div>
  );
}

function LegTime({ time, daysDiff }: { time: string; daysDiff: number }) {
  return (
    <span className="heading-4 text-foreground-fg-base relative block whitespace-nowrap font-semibold leading-5">
      {formatDateTime(time, "h:mm a")}
      {daysDiff > 0 && (
        <span className="text-black/36 absolute -right-3 -top-1 text-[9px] font-medium">
          +{daysDiff}
        </span>
      )}
    </span>
  );
}

function getCabinColor(cabin: Cabins) {
  switch (cabin) {
    case Cabins.First:
      return "#9E7BE8";
    case Cabins.PremiumEconomy:
      return "#EEA672";
    case Cabins.Economy:
      return "#EEA672";
    default:
      return undefined;
  }
}

const cabinMap = {
  [Cabins.First]: "First Class",
  [Cabins.Business]: "Business Class",
  [Cabins.PremiumEconomy]: "Premium Economy",
  [Cabins.Economy]: "Economy",
};
