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

const SearchPage = () => {
  const data = [
    "Amsterdam",
    "Buenos Aires",
    "Cairo",
    "Geneva",
    "Hong Kong",
    "Istanbul",
    "London",
    "Madrid",
    "New York",
    "Panama City",
    "Delhi",
    "Edinburgh",
    "Florence",
    "Geneva",
    "Hanoi",
    "Istanbul",
    "Jakarta",
    "Kuala Lumpur",
    "Lisbon",
    "Madrid",
    "Nairobi",
    "Oslo",
    "Paris",
    "Quebec City",
    "Rome",
    "Sydney",
    "Tokyo",
    "Ulaanbaatar",
    "Venice",
    "Warsaw",
    "Xiamen",
    "Yerevan",
    "Zurich",
    "Atlanta",
    "Berlin",
    "Chicago",
    "Dubai",
    "Frankfurt",
    "Guangzhou",
    "Helsinki",
    "Ibiza",
    "Jerusalem",
    "Kolkata",
    "Los Angeles",
  ];
  const [results, setResults] = useState([...data]);

  const handleInput = (ev: CustomEvent) => {
    const query = (ev.target as HTMLInputElement).value.toLowerCase();
    setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
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
              {results.map((result, index) => (
                <IonItem key={index}>
                  <IonLabel style={{ fontWeight: "bold" }}>Title</IonLabel>
                  {result}
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
