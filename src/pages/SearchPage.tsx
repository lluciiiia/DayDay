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
    { key: "2023-07-01", value: "Amsterdam" },
    { key: "2023-07-02", value: "Buenos Aires" },
    { key: "2023-07-03", value: "Cairo" },
    { key: "2023-07-04", value: "Geneva" },
    { key: "2023-07-05", value: "Hong Kong" },
    { key: "2023-07-06", value: "Istanbul" },
    { key: "2023-07-07", value: "London" },
    { key: "2023-07-08", value: "Madrid" },
    { key: "2023-07-09", value: "New York" },
    { key: "2023-07-10", value: "Panama City" },
    { key: "2023-07-11", value: "Delhi" },
    { key: "2023-07-12", value: "Edinburgh" },
    { key: "2023-07-13", value: "Florence" },
    { key: "2023-07-14", value: "Geneva" },
    { key: "2023-07-15", value: "Hanoi" },
    { key: "2023-07-16", value: "Istanbul" },
    { key: "2023-07-17", value: "Jakarta" },
    { key: "2023-07-18", value: "Kuala Lumpur" },
    { key: "2023-07-19", value: "Lisbon" },
    { key: "2023-07-20", value: "Madrid" },
    { key: "2023-07-21", value: "Nairobi" },
    { key: "2023-07-22", value: "Oslo" },
    { key: "2023-07-23", value: "Paris" },
    { key: "2023-07-24", value: "Quebec City" },
    { key: "2023-07-25", value: "Rome" },
    { key: "2023-07-26", value: "Sydney" },
    { key: "2023-07-27", value: "Tokyo" },
    { key: "2023-07-28", value: "Ulaanbaatar" },
    { key: "2023-07-29", value: "Venice" },
    { key: "2023-07-30", value: "Warsaw" },
    { key: "2023-07-31", value: "Xiamen" },
    { key: "2023-08-01", value: "Yerevan" },
    { key: "2023-08-02", value: "Zurich" },
    { key: "2023-08-03", value: "Atlanta" },
    { key: "2023-08-04", value: "Berlin" },
    { key: "2023-08-05", value: "Chicago" },
    { key: "2023-08-06", value: "Dubai" },
    { key: "2023-08-07", value: "Frankfurt" },
    { key: "2023-08-08", value: "Guangzhou" },
    { key: "2023-08-09", value: "Helsinki" },
    { key: "2023-08-10", value: "Ibiza" },
    { key: "2023-08-11", value: "Jerusalem" },
    { key: "2023-08-12", value: "Kolkata" },
    { key: "2023-08-13", value: "Los Angeles" },
  ];
  const [results, setResults] = useState([...data]);

  const handleInput = (ev: CustomEvent) => {
    const query = (ev.target as HTMLInputElement).value.toLowerCase();
    setResults(data.filter((d) => d.value.toLowerCase().indexOf(query) > -1));
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
                <IonItem key={result.key}>
                  <IonLabel style={{ fontWeight: "bold" }}>
                    {result.key}
                  </IonLabel>
                  {result.value}
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
