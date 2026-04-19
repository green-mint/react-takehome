import React from "react";
import { TripTypes } from "@/lib/itn.types";

type Props = {
  tripType: TripTypes;
};

export default function ItineraryCardSkeleton({ tripType }: Props) {
  const isRoundTrip = tripType === TripTypes.Roundtrip;

  return (
    <>
      <MobileItineraryCardSkeleton isRoundTrip={isRoundTrip} />
      <DesktopItineraryCardSkeleton isRoundTrip={isRoundTrip} />
    </>
  );
}

type SkeletonProps = {
  isRoundTrip: boolean;
};

function MobileItineraryCardSkeleton({ isRoundTrip }: SkeletonProps) {
  const rows = isRoundTrip ? 2 : 1;

  return (
    <div
      className={`squircle-3xl shadow-(--shadow-v2-border-card) bg-background-bg-base overflow-clip lg:hidden ${
        isRoundTrip ? "h-[154px]" : "h-[105px]"
      }`}
    >
      <div className="flex h-[calc(100%-40px)] flex-col justify-center px-4 pr-6">
        <div className={`flex flex-col ${isRoundTrip ? "gap-5" : "gap-3.5"}`}>
          {Array.from({ length: rows }).map((_, index) => (
            <MobileFlightRowSkeleton key={index} />
          ))}
        </div>
      </div>
      <div className="bg-background-subtle-low flex h-10 items-center justify-between gap-4 border-t border-black/5 px-4 pr-6">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-6 w-20" />
      </div>
    </div>
  );
}

function MobileFlightRowSkeleton() {
  return (
    <div className="flex items-center gap-3.5">
      <SkeletonBlock className="h-5 w-full" />
    </div>
  );
}

function DesktopItineraryCardSkeleton({ isRoundTrip }: SkeletonProps) {
  const rows = isRoundTrip ? 2 : 1;

  return (
    <div
      className={`squircle-3xl shadow-(--shadow-elevation-itinerary-card-desktop) bg-background-bg-base hidden overflow-clip lg:flex ${
        isRoundTrip ? "h-[191px]" : "h-[95px]"
      }`}
    >
      <div className="flex grow flex-col divide-y">
        {Array.from({ length: rows }).map((_, index) => (
          <DesktopFlightRowSkeleton key={index} />
        ))}
      </div>
      <div className="w-33 flex items-end justify-end border-l border-black/5 p-7">
        <SkeletonBlock className="h-10 w-20" />
      </div>
    </div>
  );
}

function DesktopFlightRowSkeleton() {
  return (
    <div className="flex flex-1 items-center gap-1.5 py-3 pl-7 pr-4">
      <SkeletonBlock className="h-1/2 min-h-6 w-full" />
    </div>
  );
}

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-neutral-200 ${className}`} />
  );
}
