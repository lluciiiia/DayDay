import React from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonActionSheet,
  IonIcon,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";
import { ellipsisVerticalOutline } from "ionicons/icons";

import { decreaseCount } from "./Functionality/UpdateList";
import { deleteGraph } from "./Functionality/Analysis";

const ViewPage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const history = useHistory();
  const selectedDate = location.state?.selectedDate;

  const deleteEntry = () => {
    if (selectedDate) {
      const content = localStorage.getItem(selectedDate) ?? "";
      decreaseCount(content);
      localStorage.removeItem(selectedDate);

      // Remove the date from diaryDates
      const savedDates = JSON.parse(localStorage.getItem("diaryDates") || "[]");
      const indexDate = savedDates.indexOf(selectedDate);
      if (indexDate > -1) {
        savedDates.splice(indexDate, 1);
        localStorage.setItem("diaryDates", JSON.stringify(savedDates));
      }

      // Remove the date from dictionary
      const savedDict = JSON.parse(localStorage.getItem("diaryDates") || "[]");
      const indexDict = savedDict.indexOf(selectedDate);
      if (indexDict > -1) {
        savedDict.splice(indexDict, 1);
        localStorage.setItem("diaryDates", JSON.stringify(savedDict));
      }

      deleteGraph(selectedDate);

      history.replace("/");
      window.location.reload();
    }
  };

  const editEntry = () => {
    history.push("/edit", { selectedDate });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IonTitle>View Diary</IonTitle>
            <IonButton
              slot="end"
              id="open-action-sheet"
              style={{ marginLeft: "auto" }}>
              <IonIcon icon={ellipsisVerticalOutline} />
            </IonButton>
          </div>
          <IonActionSheet
            trigger="open-action-sheet"
            header="Actions"
            buttons={[
              {
                text: "Edit",
                handler: editEntry,
              },
              {
                text: "Delete",
                role: "destructive",
                handler: deleteEntry,
              },
              {
                text: "Cancel",
                role: "cancel",
              },
            ]}></IonActionSheet>
        </IonToolbar>
      </IonHeader>
      <div
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          borderRadius: 10,
          borderColor: "transparent",
          padding: "20px",
        }}>
        <IonContent
          scrollY={false}
          style={{
            height: 700,
            overflowY: "scroll",
            margin: "0 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {selectedDate && <div>{localStorage.getItem(selectedDate)}</div>}
        </IonContent>
      </div>
    </>
  );
};

export default ViewPage;
