import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonSearchbar,
} from "@ionic/react";
import { EntriesData } from "../../GetPutData";
import ViewList from "./ViewListSub/ViewList";

const ViewCategoryPage = () => {
  const location = useLocation<{ selectedCategory?: string }>();
  const selectedCategory = location?.state?.selectedCategory || "";
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
    (entry) => entry.category === selectedCategory
  );

  return (
    <>
      <IonHeader>
      </IonHeader>
      <IonContent>
        <p
          style={{
            fontSize: "28px",
            marginLeft: "15px",
            fontWeight: "bold",
            marginTop: "35px",
            marginBottom: "10px",
          }}>
          {selectedCategory}
        </p>
        <IonSearchbar showClearButton="focus"></IonSearchbar>
        <ViewList entries={filteredEntries} />
      </IonContent>
    </>
  );
};

export default ViewCategoryPage;
