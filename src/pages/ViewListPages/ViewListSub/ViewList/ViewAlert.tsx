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
  const handleDeleteEntry = (entryToDelete: Entry) => {
    const entryIndex = entries.indexOf(entryToDelete);
    if (entryIndex !== -1) {
      const updatedData = [...entries];
      updatedData.splice(entryIndex, 1);
      setEntries(updatedData);

      const entriesDataInstance = new EntriesData();
      entriesDataInstance.deleteEntriesData(entryToDelete);
    }
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
