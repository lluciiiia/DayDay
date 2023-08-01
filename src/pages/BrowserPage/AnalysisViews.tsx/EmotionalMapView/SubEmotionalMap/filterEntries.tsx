import { useEffect, useState } from "react";
import { SentimentResultData } from "../../../../../data/ResultConstructor";
import { EntryServiceImpl } from "../../../../../data/DataService";
import { Entry } from "../../../../../data/interfaces";
import { getPlaceAPI } from "../../../../../data/getPlaceAPI";

export interface FilteredEntry {
  placeId: string;
  placeName: string;
  sentimentScore: number;
  lat: number;
  lng: number;
}

export const FilteredEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<FilteredEntry[]>([]);
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const allEntries = new EntryServiceImpl();
      const allEntriesData = await allEntries.getAllEntries();
      setEntries(allEntriesData);

      const sentimentResult = new SentimentResultData();
      const sentimentData = await sentimentResult.getAllResults();

      if (sentimentData) {
        const sentimentDates: string[] = Object.keys(sentimentData);
        const sentimentScores: number[] = Object.values(sentimentData);
        setDates(sentimentDates);
        setScores(sentimentScores);
      }
    };

    let apiLoaded = false;
    async function fetchGooglePlacesApiKey() {
      try {
        const apiKey = await new getPlaceAPI().getEntry();
        console.log("apikey: ", apiKey);
        loadGoogleMapsScript(apiKey);

        apiLoaded = true;
      } catch (error) {
        console.error(error);
      }
    }
    if (!apiLoaded) {
      fetchGooglePlacesApiKey();
    }
    fetchData(), fetchGooglePlacesApiKey();
  }, [apiKey]);

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const loadGoogleMapsScript = (apiKey: string) => {
    if (!window.googleMapsLoaded) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = () => {};
      document.head.appendChild(googleMapsScript);
      window.googleMapsLoaded = true;
      setGoogleMapsLoaded(true);
    }
    if (!googleMapsLoaded) {
      // repeat the process til googleMapsLoaded is true
    }
  };

  useEffect(() => {
    const checkMapLoaded = () => {
      if (window.google && window.google.maps) {
        setGoogleMapsLoaded(true);
      } else {
        setTimeout(checkMapLoaded, 100);
      }
    };
  }, []);
  const fetchLocationDetails = async (placeId: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`
    );
    const data = await response.json();
    return {
      lat: data.results[0]?.geometry?.location?.lat || 0,
      lng: data.results[0]?.geometry?.location?.lng || 0,
    };
  };

  useEffect(() => {
    const getFilteredEntriesWithLocation = async () => {
      const filteredEntriesWithLocation = await Promise.all(
        entries
          .filter((entry) => entry.location.placeId !== "")
          .map(async (entry) => {
            const dateIndex = dates.indexOf(entry.date);
            const sentimentScore = dateIndex !== -1 ? scores[dateIndex] : 0;
            const locationDetails = await fetchLocationDetails(
              entry.location.placeId
            );

            return {
              placeId: entry.location.placeId,
              placeName: entry.location.name,
              sentimentScore,
              lat: locationDetails.lat,
              lng: locationDetails.lng,
            };
          })
      );

      setFilteredEntries(filteredEntriesWithLocation);
    };

    getFilteredEntriesWithLocation();
  }, [entries, dates, scores]);

  if (!googleMapsLoaded) {
    return null;
  }

  return filteredEntries;
};

export default FilteredEntries;
