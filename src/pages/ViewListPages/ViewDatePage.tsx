import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonSearchbar } from "@ionic/react";
import ViewList from "./ViewListSub/ViewList/ViewList";
import ViewHeader from "./ViewListSub/ViewHeader";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";
import { Entry } from "../../data/interfaces";
import { useSearch } from "../../else/searchGeneric";
import { EntrySearchData } from "../../else/search";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";
  const entriesData = useFetchEntriesData();

  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  // search functionality
  const searchData: EntrySearchData = {
    data: Object.values(entries).map(
      (entry) => entry.title || entry.content[0].text || ""
    ),
    keys: Object.values(entries).map(
      (entry) => entry.title || entry.content[0].text || ""
    ),
  };

  const { results, inputValue, handleInput } = useSearch(searchData);

  const searchedResults: Entry[] = Object.values(entries).filter(
    (entry) =>
      entry.title?.includes(inputValue) ||
      (entry.content[0]?.text && entry.content[0].text.includes(inputValue))
  );

  return (
    <>
      <IonContent>
        <ViewHeader
          selectionType="date"
          selectedDate={selectedDate}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <IonSearchbar
          showClearButton="focus"
          onIonInput={handleInput}></IonSearchbar>

        <ViewList
          editMode={editMode}
          selectionType="date"
          selectedDate={selectedDate}
          entriesData={entriesData}
          entries={inputValue === "" ? entries : searchedResults}
          setEntries={setEntries}
          setSelectedEntry={setSelectedEntry}
        />
      </IonContent>
    </>
  );
};

export default ViewDatePage;
