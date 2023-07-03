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
          <IonSearchbar
            showClearButton="focus"
            //debounce={1000} // delay til finishing typing
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
                    <IonLabel
                      style={{
                        fontWeight: "bold",
                        fontSize: "17px",
                        paddingBottom: "7px",
                      }}>
                      {result.date}
                    </IonLabel>
                    {result.content.split(" ").slice(0, 20).join(" ")}
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
