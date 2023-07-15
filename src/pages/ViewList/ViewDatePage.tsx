import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IonContent,
  IonSearchbar,
} from "@ionic/react";
import { EntriesData } from "../../GetPutData";
import ViewList from "./ViewListSub/ViewList";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";

  const [entriesData, setEntriesData] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntriesData = async () => {
      const entriesData = new EntriesData();
      const entries = await entriesData.getEntriesData();
      setEntriesData(entries);
    };

    fetchEntriesData();
  }, []);

  const filteredEntries = entriesData.filter(
    (entry) => entry.date === selectedDate
  );

  return (
    <>
      <IonContent>
        <p
          style={{
            fontSize: "28px",
            marginLeft: "15px",
            fontWeight: "bold",
            marginTop: "35px",
            marginBottom: "10px",
          }}>
          {selectedDate}
        </p>
        <IonSearchbar showClearButton="focus"></IonSearchbar>
        <ViewList entries={filteredEntries} />
      </IonContent>
    </>
  );
};

export default ViewDatePage;
