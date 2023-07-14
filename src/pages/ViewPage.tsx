// From ViewCategory OR ViewDate

import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/react";

const ViewPage = () => {
  const location = useLocation<{ selectedDate?: string; entryData?: Entry }>();
  const selectedDate = location?.state?.selectedDate || "";
  const entryData = location?.state?.entryData || null;
 return (
  <IonContent>
    <div style={{display: "flex", flexDirection: "column"}}>
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
<div style={{marginLeft: "auto", marginRight: "15px"}}>{entryData?.date || ""}</div>
<div style={{marginLeft: "auto", marginRight: "15px", marginTop: "5px"}}>Category: {entryData?.category || ""}</div>
<div style={{ padding: "25px 15px"}}>{entryData?.content[0].text || ""}</div>
</div>
</IonContent>
 );

};

export default ViewPage;
