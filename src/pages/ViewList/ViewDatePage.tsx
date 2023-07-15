import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  IonContent,
  IonSearchbar,
  IonIcon,
  IonButton,
  IonButtons,
} from "@ionic/react";
import ViewList from "./ViewListSub/ViewList";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";
import { closeCircleOutline } from "ionicons/icons";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";
  const entriesData = useFetchEntriesData();

  const filteredEntries = entriesData.filter(
    (entry) => entry.date === selectedDate
  );

  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true); // Set editMode to false
  };

  return (
    <>
      <IonContent>
        <div style={{ display: "flex", flexDirection: "row" }}>
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

          {editMode && (
            <IonButtons>
              <IonButton
                style={{ marginTop: "27px", marginLeft: "168px" }}
                onClick={() => setEditMode(false)}>
                Done
              </IonButton>
            </IonButtons>
          )}
          <IonButtons>
            <IonButton
              style={{
                display: editMode ? "none" : "block",
                marginTop: "27px",
                marginLeft: "174px",
              }}
              onClick={handleEditClick}>
              Edit
            </IonButton>
          </IonButtons>
        </div>

        <IonSearchbar showClearButton="focus"></IonSearchbar>
        <ViewList entries={filteredEntries} />
      </IonContent>
    </>
  );
};

export default ViewDatePage;
