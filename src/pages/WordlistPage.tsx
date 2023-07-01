import React from "react";
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
  // Sort the wordCount array in descending order based on count
  const sortedWordCount = [...wordCount].sort((a, b) => b.count - a.count);

  // Get the top 50 words
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 5,
            }}
          >
            <p style={{ fontSize: "25px" }}>Top 50 Frequently Used Words</p>
          </div>

          <IonList inset={true}>
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