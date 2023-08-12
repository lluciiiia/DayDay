import { useEffect, useState } from "react";
import { Entry } from "../../../data/interfaces";
import { EntryServiceImpl } from "../../../data/DataService";

export const useFetchEntriesData = () => {
  const [entriesData, setEntriesData] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntriesData = async () => {
      const entriesData = new EntryServiceImpl();
      const entries = await entriesData.getAllEntries();
      setEntriesData(entries);
    };

    fetchEntriesData();
  }, []);

  return entriesData;
};

export default useFetchEntriesData;
