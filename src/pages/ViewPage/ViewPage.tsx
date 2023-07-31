import { useLocation } from "react-router-dom";
import { IonContent, IonIcon, IonButton, IonChip } from "@ionic/react";
import { ellipsisHorizontalCircleOutline } from "ionicons/icons";
import SettingSection from "./SettingSection";
import { Entry } from "../../data/interfaces";

const ViewPage = () => {
  const location = useLocation<{ selectedDate?: string; entryData?: Entry }>();
  const entryData = location?.state?.entryData || null;

  return (
    <IonContent>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              fontSize: "28px",
              marginLeft: "15px",
              fontWeight: "bold",
              marginTop: "35px",
              marginBottom: "20px",
            }}>
            {entryData?.title || ""}
          </div>

          <IonButton
            id="open-action-sheet"
            fill="clear"
            style={{
              marginTop: "28px",
              marginLeft: "auto",
              color: "white",
            }}>
            <IonIcon
              icon={ellipsisHorizontalCircleOutline}
              style={{ fontSize: "30px" }}
            />
          </IonButton>
          {entryData && <SettingSection entryData={entryData}></SettingSection>}
        </div>

        <div
          style={{
            marginLeft: "auto",
            marginRight: "15px",
            marginTop: "17px",
          }}>
          {entryData?.date || ""}
        </div>
        <div
          style={{ marginLeft: "auto", marginRight: "15px", marginTop: "5px" }}>
          Category: {entryData?.category.name || ""}
        </div>
        <div
          style={{ marginLeft: "auto", marginRight: "15px", marginTop: "5px" }}>
          Location:{" "}
          {entryData?.location ? (
            <span>{entryData.location.name}</span>
          ) : (
            <div></div>
          )}
        </div>

        <div style={{ padding: "25px 15px" }}>
          {entryData?.content[0].text || ""}
        </div>
      </div>
    </IonContent>
  );
};

export default ViewPage;
