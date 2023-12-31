import { useEffect, useState } from "react";
import { IonList } from "@ionic/react";
import ViewAlert from "./ViewAlert";
import EachEntry from "./EachEntry";
import { Category, Entry } from "../../../../data/interfaces";

interface ViewListProps {
  selectionType: "category" | "date";
  selectedCategory?: Category;
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
        } else if (selectionType === "category" && selectedCategory) {
          filteredEntries = data.filter(
            (entry) =>
              JSON.stringify(entry.category.name) ===
              JSON.stringify(selectedCategory.name)
          );
        }

        setEntries(filteredEntries);
        console.log("entries setted in ViewList", entries);
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
          <EachEntry
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
        setEntries={setEntries}
        selectedCategory={selectedCategory}
        selectedDate={selectedDate}
        selectionType={selectionType}
      />
    </>
  );
};

export default ViewList;
