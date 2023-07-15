import { useEffect, useState } from "react";
import { EntriesData } from "../../../GetPutData";

const useFetchEntriesData = () => {
  const [entriesData, setEntriesData] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntriesData = async () => {
      const entriesData = new EntriesData();
      const entries = await entriesData.getEntriesData();
      setEntriesData(entries);
    };

    fetchEntriesData();
  }, []);

  return entriesData;
};

export default useFetchEntriesData;
