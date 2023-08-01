import { useEffect, useState } from "react";
import { SentimentResultData } from "../../../../../data/ResultConstructor";
import { EntryServiceImpl } from "../../../../../data/DataService";
import { Entry } from "../../../../../data/interfaces";

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

    fetchData();
  }, []);

  useEffect(() => {
    const getFilteredEntriesWithLocation = async () => {
      const filteredEntriesWithLocation = await Promise.all(
        entries
          .filter((entry) => entry.location.placeId !== "")
          .map(async (entry) => {
            const dateIndex = dates.indexOf(entry.date);
            const sentimentScore = dateIndex !== -1 ? scores[dateIndex] : 0;

            return {
              placeId: entry.location.placeId,
              placeName: entry.location.name,
              sentimentScore,
              lat: entry.location.lat,
              lng: entry.location.lng,
            };
          })
      );

      setFilteredEntries(filteredEntriesWithLocation);
    };

    getFilteredEntriesWithLocation();
  }, [entries, dates, scores]);

  return filteredEntries;
};

export default FilteredEntries;
