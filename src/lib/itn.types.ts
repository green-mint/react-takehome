export enum TripTypes {
  Oneway = "oneway",
  Roundtrip = "roundtrip",
  MultiStop = "multistop",
}

export enum Cabins {
  Economy = "e",
  PremiumEconomy = "p",
  Business = "b",
  First = "f",
}

export type TLeg = {
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  airline: string;
  flightNumber: string;
  cabin: Cabins;
  duration: number;
  aircraft: string;
  layover: number;
  distance?: number;
  bookingCode?: string;
  operatingAirline?: string;
  operatingFlightNumber?: string;
};

export type TFlight = {
  id: string;
  legs: TLeg[];
  duration: number;
  premium: number;
};

export type TItinerary = {
  id: string;
  pax: number;
  flights: TFlight[];
  type: TripTypes.Oneway | TripTypes.Roundtrip | TripTypes.MultiStop;
  duration: number;
  total: number;
  validatingCarrier?: string;
  meta: TEMeta;
};

export type TEMeta = {
  airlines: {
    all: string[];
    perflight: { moc: string; mocPercentage: number; all: string[] }[];
  };
};
