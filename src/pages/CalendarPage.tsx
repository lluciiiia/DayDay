import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonDatetime,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router";

const CalendarPage = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Write your diary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 60,
            alignItems: "center",
          }}>
          <div
            style={{
              alignSelf: "center",
              paddingTop: 30,
            }}>
            <IonDatetime
             ></IonDatetime>
          </div>

        </div>
      </IonContent>
    </>
  );
};


export default CalendarPage;