import { useEffect, useState } from "react";

export type GeoApiCity = {
  nom: string,
  centre: { type: string, coordinates: number[] },
  codesPostaux: string[],
  code: string,
  _score: number,
  departement: { code: string, nom: string }
}

export default function useSuggestedCities(inputValue: string | undefined) {
  const [cities, setCities] = useState<GeoApiCity[] | undefined>(undefined);
  useEffect(() => {
    let active = true;

    if (!inputValue) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${inputValue}&fields=nom,centre,departement,codesPostaux&boost=population&limit=5`
      );

      const cities = <GeoApiCity[] | undefined>await response.json();

      if (active) {
        setCities(cities);
      }
    })();

    return () => {
      active = false;
    };
  }, [inputValue]);
  return cities;
}