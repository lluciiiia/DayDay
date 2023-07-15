import { useHistory } from "react-router-dom";
import { IonItem, IonList, IonIcon, IonLabel } from "@ionic/react";
import { EntriesData } from "../../../GetPutData";
import { closeCircleOutline, informationCircleOutline } from "ionicons/icons";


interface ViewListProps {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  entries: Entry[];
  selectedDate: string;
}

const ViewList: React.FC<ViewListProps> = ({
  editMode,
  setEditMode,
  entries,
  selectedDate,
}) => {
  const history = useHistory();

  const handleDeleteEntry = (index: number) => {
    const updatedData = entries.filter((_, i) => i !== index);
    const entriesData = new EntriesData();
    // entriesData.putEntriesData(updatedData);
    // setEntries(updatedData);
  };

  const handleEntryClick = (selectedEntry: Entry) => {
      history.push("/view", { entryData: selectedEntry });
  };

  return (
    <IonList>

      {entries.map((entry, index) => (
        <IonItem key={entry.id} style={{ padding: "7px", fontSize: "18px" }}>
          {editMode && (
            <IonIcon
              icon={closeCircleOutline}
              style={{
                fontSize: "22px",
                marginRight: "10px",
              }}
              onClick={() => handleDeleteEntry(index)}
            />
          )}
          <IonLabel onClick={() => handleEntryClick(entry)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  fontSize: "21px",
                  fontWeight: "bold",
                  marginRight: "auto",
                }}>
                {entry.title}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgb(165, 165, 165)",
                  marginLeft: "auto",
                  marginTop: "10px",
                }}>
                {entry.category}
              </div>
            </div>

            <div
              style={{
                fontSize: "16px",
                marginTop: "5px",
                marginBottom: "15px",
              }}>
              {entry.content && entry.content[0] && entry.content[0].text
                ? entry.content[0].text.length > 30
                  ? `${entry.content[0].text.substring(0, 88)}...`
                  : entry.content[0].text
                : ""}
            </div>
          </div>
          </IonLabel>

        </IonItem>
      ))}
    </IonList>
  );
};

export default ViewList;
