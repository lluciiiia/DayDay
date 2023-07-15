import {useState, useRef} from "react";
import { useLocation,  } from "react-router-dom";
import { IonContent, IonSearchbar,  } from "@ionic/react";
import ViewList from "./ViewListSub/ViewList";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";
  const entriesData = useFetchEntriesData();

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
