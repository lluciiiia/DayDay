import { useHistory } from "react-router-dom";
import {
  IonItem,
  IonList,
} from "@ionic/react";

interface ViewListProps {
  entries: Entry[];
  selectedDate: string;
}

const ViewList: React.FC<ViewListProps> = ({ entries, selectedDate }) => {
  const history = useHistory();

  return (
    <IonList>
      {entries.map((entry) => (
        <IonItem
          key={entry.id}
          style={{ padding: "7px", fontSize: "18px" }}
          onClick={() => {
            history.push("/view", { entryData: entry });
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  fontSize: "21px",
                  fontWeight: "bold",
                  marginRight: "auto",
                }}
              >
                {entry.title}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgb(165, 165, 165)",
                  marginLeft: "auto",
                  marginTop: "10px",
                }}
              >
                {entry.category}
              </div>
            </div>

            <div
              style={{
                fontSize: "16px",
                marginTop: "5px",
                marginBottom: "15px",
              }}
            >
              {entry.content && entry.content[0] && entry.content[0].text
                ? entry.content[0].text.length > 30
                  ? `${entry.content[0].text.substring(0, 88)}...`
                  : entry.content[0].text
                : ""}
            </div>
          </div>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ViewList;
