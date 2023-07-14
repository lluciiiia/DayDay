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
              style={{ padding: "7px", fontSize: "18px"}}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      fontSize: "21px",
                      fontWeight: "bold",
                      marginRight: "auto",
                    }}>
                    {entry.title}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "rgb(165, 165, 165)",
                      marginLeft: "auto",
                      marginTop: "10px"
                    }}>
                    {entry.category}
                  </div>
                </div>

                <div style={{ fontSize: "16px", marginTop: "5px", marginBottom: "15px" }}>
                  content max 20 words .....................
                </div>
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default ViewDatePage;
