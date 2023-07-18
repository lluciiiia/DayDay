import { IonAlert } from "@ionic/react";
import React from "react";
import { EntriesData } from "../../../../GetPutData";

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
    const entriesData = new EntriesData();
    await entriesData.deleteEntriesData(entryToDelete);
    const updatedData = await entriesData.getEntriesData();
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
