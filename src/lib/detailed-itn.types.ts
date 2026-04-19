import { TFlight, TLeg, TItinerary } from "./itn.types";

type TAirline = {
  code: string;
  name: string;
};

type TAirport = {
  code: string;
  name: string;
  city: string;
  country: string;
};

export type TDItinerary = Omit<TItinerary, "flights"> & {
  flights: TDFlight[];
  airlines: TAirline[];
};

export type TDFlight = Omit<TFlight, "legs"> & {
  origin: TAirport;
  destination: TAirport;
  arrival: string;
  departure: string;
  legs: TDLeg[];
  moc: string;
  mocPercentage: number;
  airlines: TAirline[]; // sorted by duration
};

export type TDLeg = Omit<
  TLeg,
  "origin" | "destination" | "airline" | "operatingAirline"
> & {
  origin: TAirport;
  destination: TAirport;
  airline: TAirline;
  operatingAirline?: TAirline;
};
