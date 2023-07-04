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
  const [inputValue, setInputValue] = useState(""); // New state variable

  const handleInput = (event: CustomEvent) => {
    const input = event.detail.value || "";
    setInputValue(input); // Store the input value
    const searchResults = SearchWords(input);
    setResults(searchResults);
  };

  const highlightInput = (content: string, input: string) => {
    const regex = new RegExp(`(${input})`, "gi");
    const highlightedContent = content.replace(
      regex,
      "<span style='color: red'>$1</span>"
    );
    const words = highlightedContent.split(" ");
    const truncatedWords = words.slice(0, 20);
    return truncatedWords.join(" ");
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
          }}
        >
          <IonSearchbar
            showClearButton="focus"
            onIonInput={handleInput}
          ></IonSearchbar>

          <div
            style={{
              flex: 1,
              overflowY: "scroll",
              width: "100%",
            }}
          >
            <IonList>
              {results.map((result) => (
                <IonItem key={result.date} style={{ paddingTop: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <IonLabel
                      style={{
                        fontWeight: "bold",
                        fontSize: "17px",
                        paddingBottom: "7px",
                      }}
                    >
                      {result.date}
                    </IonLabel>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: highlightInput(result.content, inputValue),
                      }}
                    />
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
