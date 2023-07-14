import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonIcon } from "@ionic/react";
import { ellipsisHorizontalCircleOutline } from "ionicons/icons";

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
          <IonIcon
            icon={ellipsisHorizontalCircleOutline}
            style={{ marginTop: "38px", fontSize: "28px", marginLeft: "auto", marginRight: "15px" }}
          />
        </div>

        <div style={{ marginLeft: "auto", marginRight: "15px", marginTop: "17px" }}>
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
