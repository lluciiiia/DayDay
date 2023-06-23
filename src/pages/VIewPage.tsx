import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonActionSheet } from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";



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
          <IonButton id="open-action-sheet" slot="end">bt</IonButton>
          <IonActionSheet
            id="action-sheet"
            header="Actions"
            buttons={[
              {
                text: 'Edit',
                handler: editEntry
              },
              {
                text: 'Delete',
                role: 'destructive',
                handler: deleteEntry
              },
              {
                text: 'Cancel',
                role: 'cancel'
              }
            ]}
          ></IonActionSheet>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ height: 680, overflowY: "scroll", maxWidth: 370, margin: "0 auto", padding: "20px 3px" }}>
        {selectedDate && <div>{localStorage.getItem(selectedDate)}</div>}
      </IonContent>
    </>
  );
};

export default ViewPage;
