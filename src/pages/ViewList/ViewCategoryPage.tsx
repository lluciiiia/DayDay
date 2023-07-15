import { useLocation } from "react-router-dom";
import { IonContent, IonSearchbar } from "@ionic/react";
import ViewList from "./ViewListSub/ViewList";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";

const ViewCategoryPage = () => {
  const location = useLocation<{ selectedCategory?: string }>();
  const selectedCategory = location?.state?.selectedCategory || "";

  const entriesData = useFetchEntriesData();

  const filteredEntries = entriesData.filter(
    (entry) => entry.category === selectedCategory
  );

  return (
    <>
      <IonContent>
        <p
          style={{
            fontSize: "28px",
            marginLeft: "15px",
            fontWeight: "bold",
            marginTop: "35px",
            marginBottom: "10px",
          }}>
          {selectedCategory}
        </p>
        <IonSearchbar showClearButton="focus"></IonSearchbar>
        <ViewList entries={filteredEntries} />
      </IonContent>
    </>
  );
};

export default ViewCategoryPage;
