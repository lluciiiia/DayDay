import { IonAlert } from "@ionic/react";
import React from "react";
import { Entry, Category } from "../../../../data/interfaces";
import { EntryServiceImpl } from "../../../../data/DataService";

interface ViewAlertProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  deletingEntry: Entry | null;
  setDeletingEntry: React.Dispatch<React.SetStateAction<Entry | null>>;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  selectedCategory: Category | undefined;
  selectedDate: string | undefined;
  selectionType: string;
}

export const ViewAlert: React.FC<ViewAlertProps> = ({
  showAlert,
  setShowAlert,
  deletingEntry,
  setDeletingEntry,
  setEntries,
  selectedCategory,
  selectedDate,
  selectionType,
}) => {
  const handleDeleteEntry = async (entryToDelete: Entry) => {
    const entriesData = new EntryServiceImpl();
    await entriesData.deleteEntry(entryToDelete.id);
    const updatedData = await entriesData.getAllEntries();
    let filteredEntries: Entry[] = [];

    if (selectionType === "date") {
      filteredEntries = updatedData.filter(
        (entry) => entry.date === selectedDate
      );
    } else if (selectionType === "category" && selectedCategory) {
      filteredEntries = updatedData.filter(
        (entry) =>
          JSON.stringify(entry.category.name) ===
          JSON.stringify(selectedCategory.name)
      );
    }

    setEntries(filteredEntries);
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
