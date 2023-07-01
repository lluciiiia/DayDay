import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";

import wordCount from "./Functionality/InitializeCount";

const WordlistPage = () => {
  const [updatedWordCount, setUpdatedWordCount] = useState(wordCount);

  useEffect(() => {
    const storedWordCount = JSON.parse(localStorage.getItem('wordCount') || '[]');
    setUpdatedWordCount(storedWordCount);
  }, []);

  const sortedWordCount = [...updatedWordCount].sort((a, b) => b.count - a.count);

  const topWords = sortedWordCount.slice(0, 50);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Word list</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            position: "fixed",
            top: "56px", // Height of the IonHeader
            left: 0,
            right: 0,
            bottom: "49px", // Height of the tabs
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "56px 0 0 0", // Space for the title and padding from the top
            overflowY: "auto", // Enable vertical scrolling within the limited range
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "56px", // Height of the IonHeader
              left: 0,
              right: 0,
              //backgroundColor: "white",
              zIndex: 100, // Increase the z-index to bring the title to the front
              textAlign: "center",
              fontSize: "25px",
              color: "white",
              padding: "10px 0",
            }}
          >
            Top 50 Frequently Used Words
          </div>
          <IonList>
            {topWords.map((item) => (
              <IonItem key={item.word}>
                <IonLabel>{`${item.word}: ${item.count}`}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </>
  );
};

export default WordlistPage;
