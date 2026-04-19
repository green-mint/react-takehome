import { TItinerary } from "./itn.types";
import { TDFlight, TDItinerary, TDLeg } from "./detailed-itn.types";
import { useMemo } from "react";
import { airportsMap } from "@/constants/airports";
import { airlinesMap } from "@/constants/airlines";

export default function useDetailedItns(itns: TItinerary[]) {
  const detailedItns = useMemo(() => {
    const detailed: TDItinerary[] = [];

    for (const itn of itns) {
      const dFlights: TDFlight[] = [];
      for (let i = 0; i < itn.flights.length; i++) {
        const f = itn.flights[i];
        // get expand legs
        const dLegs: TDLeg[] = [];
        for (const l of f.legs) {
          const _origin = airportsMap[l.origin];
          const _destination = airportsMap[l.destination];

          dLegs.push({
            ...l,
            origin: {
              code: _origin.iata,
              name: _origin.name,
              city: _origin.city,
              country: _origin.country,
            },
            destination: {
              code: _destination.iata,
              name: _destination.name,
              city: _destination.city,
              country: _destination.country,
            },
            airline: {
              code: l.airline,
              name: airlinesMap.get(l.airline) ?? "",
            },
            operatingAirline: l.operatingAirline
              ? {
                  code: l.operatingAirline,
                  name: airlinesMap.get(l.operatingAirline) ?? "",
                }
              : undefined,
          });
        }

        const airlines = itn.meta.airlines.perflight[i].all.map((airline) => ({
          code: airline,
          name: airlinesMap.get(airline) ?? "",
        }));

        dFlights.push({
          ...f,
          legs: dLegs,
          airlines,
          moc: itn.meta.airlines.perflight[i].moc,
          mocPercentage: itn.meta.airlines.perflight[i].mocPercentage,
          origin: dLegs[0].origin,
          destination: dLegs[dLegs.length - 1].destination,
          arrival: dLegs[dLegs.length - 1].arrival,
          departure: dLegs[0].departure,
        });
      }

      const airlines = itn.meta.airlines.all.map((airline) => ({
        code: airline,
        name: airlinesMap.get(airline) ?? "",
      }));

      detailed.push({
        ...itn,
        flights: dFlights,
        airlines,
      });
    }

    return detailed;
  }, [itns]);

  return detailedItns;
}
