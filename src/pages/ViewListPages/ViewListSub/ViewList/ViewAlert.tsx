import { IonAlert } from "@ionic/react";
import React from "react";
import { Entry } from "../../../../data/interfaces";
import { EntryServiceImpl } from "../../../../data/DataService";

interface ViewAlertProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  deletingEntry: Entry | null;
  setDeletingEntry: React.Dispatch<React.SetStateAction<Entry | null>>;
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const ViewAlert: React.FC<ViewAlertProps> = ({
  showAlert,
  setShowAlert,
  deletingEntry,
  setDeletingEntry,
  entries,
  setEntries,
}) => {
  const handleDeleteEntry = async (entryToDelete: Entry) => {
    const entriesData = new EntryServiceImpl();
    await entriesData.deleteEntry(entryToDelete.id);
    const updatedData = await entriesData.getAllEntries();
    setEntries(updatedData);
  };
  return (
    <IonAlert
      isOpen={showAlert}
      header="The diary will be permanently removed"
      buttons={[
        {
          text: "Cancel",
          handler: () => {
            setShowAlert(false);
            setDeletingEntry(null);
          },
        },
        {
          text: "Confirm",
          handler: () => {
            if (deletingEntry) {
              handleDeleteEntry(deletingEntry);
            }
            setShowAlert(false);
            setDeletingEntry(null);
          },
        },
      ]}
    />
  );
};

export default ViewAlert;
