import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
} from "@ionic/react";
import { SearchWords } from "./Functionality/SearchWords";

const SearchPage = () => {
  const [results, setResults] = useState<{ date: string; content: string }[]>(
    []
  ); 

  const handleInput = (event: CustomEvent) => {
    const input = event.detail.value || "";
    const searchResults = SearchWords(input);

    setResults(searchResults); 
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
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
          }}>
          {/* Debouncing can be used to delay the execution of the search function until the user has finished typing */}
          <IonSearchbar
            showClearButton="focus"
            debounce={1000}
            onIonInput={handleInput}></IonSearchbar>

          <div
            style={{
              flex: 1,
              overflowY: "scroll",
              width: "100%",
            }}>
            <IonList>
              {results.map((result) => (
                <IonItem key={result.date} style={{ paddingTop: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    <IonLabel style={{ fontWeight: "bold", fontSize: "17px", paddingBottom: "7px" }}>
                      {result.date}
                    </IonLabel>
                    {result.content}
                  </div>
                </IonItem>
              ))}
            </IonList>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default SearchPage;
