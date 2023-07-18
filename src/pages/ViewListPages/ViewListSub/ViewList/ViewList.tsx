import { useEffect, useState } from "react";
import { IonList } from "@ionic/react";
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
  const [showAlert, setShowAlert] = useState(false);
  const [deletingEntry, setDeletingEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = entriesData;
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

  return (
    <>
      <IonList>
        {entries.map((entry, key) => (
          <EntryItem
            key={key}
            entry={entry}
            selectionType={selectionType}
            editMode={editMode}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            setDeletingEntry={setDeletingEntry}
            setSelectedEntry={setSelectedEntry}
          />
        ))}
      </IonList>
      <ViewAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        deletingEntry={deletingEntry}
        setDeletingEntry={setDeletingEntry}
        entries={entries}
        setEntries={setEntries}
      />
    </>
  );
};

export default ViewList;
