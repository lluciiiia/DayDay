import { useEffect, useState } from "react";
import { IonList } from "@ionic/react";
import { EntriesData } from "../../../../GetPutData";
import { useHistory } from "react-router-dom";
import ViewAlert from "./ViewAlert";
import EntryItem from "./EntryItem";

interface ViewListProps {
  selectionType: "category" | "date";
  selectedCategory?: string;
  selectedDate?: string;
  editMode: boolean;
  entriesData: Entry[];
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setSelectedEntry: (entry: Entry) => void;
}

const ViewList: React.FC<ViewListProps> = ({
  selectionType,
  selectedCategory,
  selectedDate,
  editMode,
  entriesData,
  entries,
  setEntries,
  setSelectedEntry,
}) => {
  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const [deletingEntry, setDeletingEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await entriesData;
        let filteredEntries: Entry[] = [];

        if (selectionType === "date") {
          filteredEntries = data.filter((entry) => entry.date === selectedDate);
        } else if (selectionType === "category") {
          filteredEntries = data.filter(
            (entry) => entry.category === selectedCategory
          );
        }

        setEntries(filteredEntries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchData();
  }, [entriesData, selectedDate, selectedCategory, selectionType]);

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

  const handleEntryClick = (selectedEntry: Entry) => {
    setSelectedEntry(selectedEntry);
    history.push("/view", { entryData: selectedEntry });
  };

  return (
    <>
      <IonList>
        {entries.map((entry) => (
          <EntryItem
            key={entry.id}
            entry={entry}
            selectionType={selectionType}
            editMode={editMode}
            onSelect={handleEntryClick}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            setDeletingEntry={setDeletingEntry}
          />
        ))}
      </IonList>
      <ViewAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        deletingEntry={deletingEntry}
        setDeletingEntry={setDeletingEntry}
        handleDeleteEntry={handleDeleteEntry}
      />
    </>
  );
};

export default ViewList;
