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

const ViewPage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const history = useHistory();
  const selectedDate = location.state?.selectedDate;

  const deleteEntry = () => {
    if (selectedDate) {
      localStorage.removeItem(selectedDate);
      history.push("/"); // Redirect to the home page after deleting
    }
  };

  const editEntry = () => {
    history.push("/edit"); // Redirect to the edit page
  };


  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>View Diary</IonTitle>
          <IonButton id="open-action-sheet">
            <IonIcon icon={ellipsisVerticalOutline} />
          </IonButton>
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
        ]}
      ></IonActionSheet>
        </IonToolbar>
      </IonHeader>
      <IonContent
        style={{
          height: 680,
          overflowY: "scroll",
          margin: "0 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedDate && <div>{localStorage.getItem(selectedDate)}</div>}
      </IonContent>
    </>
  );
};

export default ViewPage;
