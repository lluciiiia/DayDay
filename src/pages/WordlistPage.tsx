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
      <IonContent scrollY={false}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
              fontSize: "25px",
              color: "white",
              padding: "20px 10px",
              backgroundColor: "black",
            }}
          >
            Top 50 Frequently Used Words
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "scroll",
              width: "100%",
            }}
          >
            <IonList>
              {topWords.map((item) => (
                <IonItem key={item.word}>
                  <IonLabel>{`${item.word}: ${item.count}`}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default WordlistPage;