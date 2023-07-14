import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  IonContent,
  IonIcon,
  IonActionSheet,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { ellipsisHorizontalCircleOutline } from "ionicons/icons";
import SettingSection from "./SettingSection";

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
          <SettingSection
            entryData={entryData ? [entryData] : []}></SettingSection>
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
          Category: {entryData?.category || ""}
        </div>
        <div style={{ padding: "25px 15px" }}>
          {entryData?.content[0].text || ""}
        </div>
      </div>
    </IonContent>
  );
};

export default ViewPage;
