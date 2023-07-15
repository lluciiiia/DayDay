import { useHistory, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from "@ionic/react";
import { EntriesData } from "../../GetPutData";


const ViewCategoryPage = () => {
  const location = useLocation<{ selectedCategory?: string }>();
  const selectedCategory = location?.state?.selectedCategory || "";

  const history = useHistory();

  const [entriesData, setEntriesData] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntriesData = async () => {
      const entriesData = new EntriesData();
      const entries = await entriesData.getEntriesData();
      setEntriesData(entries);
    };

    fetchEntriesData();
  }, []);

  const filteredEntries = entriesData.filter(
    (entry) => entry.category === selectedCategory
  );

  return (
    <>
      <IonHeader></IonHeader>
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
      <IonSearchbar
        showClearButton="focus"
        //onIonInput={handleInput}
      ></IonSearchbar>
      <IonList>
{/* TODO: same list component */}

      </IonList>
    </>
  );
};

export default ViewCategoryPage;
