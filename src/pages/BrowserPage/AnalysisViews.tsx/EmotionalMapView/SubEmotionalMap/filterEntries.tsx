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
  const [apiKey, setApiKey] = useState<string>();

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
        setApiKey(apiKey);
        apiLoaded = true;
      } catch (error) {
        console.error(error);
      }
    }
    if (!apiLoaded) {
      fetchGooglePlacesApiKey();
    }
    fetchData(), fetchGooglePlacesApiKey();
  }, []);

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const loadGoogleMapsScript = (
    placeId: string
  ): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!window.googleMapsLoaded) {
        const googleMapsScript = document.createElement("script");
        console.log("apiKey: ", apiKey);
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?id=${placeId}&key=${apiKey}&libraries=places&callback=Function.prototype`;
        googleMapsScript.async = true;
        googleMapsScript.defer = true;
        googleMapsScript.onload = () => {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ placeId }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              if (results && results.length > 0) {
                const location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
              } else {
                console.error(
                  "No geocoding results found for the provided placeId."
                );
                reject({ lat: 0, lng: 0 });
              }
            } else {
              console.error(
                "Geocode was not successful for the following reason: " + status
              );
              reject({ lat: 0, lng: 0 });
            }
          });
        };
        document.head.appendChild(googleMapsScript);
        window.googleMapsLoaded = true;
        setGoogleMapsLoaded(true);
      } else {
        // Resolve with default location if maps are already loaded
        resolve({ lat: 0, lng: 0 });
      }
    });
  };

  useEffect(() => {
    const getFilteredEntriesWithLocation = async () => {
      const filteredEntriesWithLocation = await Promise.all(
        entries
          .filter((entry) => entry.location.placeId !== "")
          .map(async (entry) => {
            const dateIndex = dates.indexOf(entry.date);
            const sentimentScore = dateIndex !== -1 ? scores[dateIndex] : 0;

            const locationDetails = await loadGoogleMapsScript(
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

  console.log("GML: " + googleMapsLoaded);
  if (!googleMapsLoaded) {
    return null;
  }

  return filteredEntries;
};

export default FilteredEntries;
