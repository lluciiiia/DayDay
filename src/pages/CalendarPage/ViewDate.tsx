import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from "@ionic/react";
import { EntriesData } from "../../GetPutData";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>View Date Page</IonTitle>
        </IonToolbar>
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
          {selectedDate}
        </p>
        <IonSearchbar showClearButton="focus"></IonSearchbar>
        <IonList>
          {filteredEntries.map((entry) => (
            <IonItem
              key={entry.date}
              style={{ padding: "7px", fontSize: "18px" }}
            >
              Title / category / content
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default ViewDatePage;
