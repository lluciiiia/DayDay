import { useHistory } from "react-router";
import { useState } from "react";
import {
  IonHeader,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { searchAnalysisNames } from "../../else/search";
import { heartHalf, cloud } from "ionicons/icons";

const BrowserPage = () => {
  const history = useHistory();

  // search functionality
  const [results, setResults] = useState<(string | {
    label: string;
    icon: string;
    color: string;
    path: string;
  })[]>([]);
  const [inputValue, setInputValue] = useState(""); // New state variable

  const handleInput = (event: CustomEvent) => {
    const input = event.detail.value || "";
    setInputValue(input); // Store the input value

    if (input) {
      const searchResults = searchAnalysisNames(
        {
          data: ["Sentiment Analysis", "Word Clouds"],
          keys: ["Sentiment Analysis", "Word Clouds"],
        },
        input
      );
      setResults(searchResults);
    } else {
      setResults([]); // Clear the search results when input is empty
    }
  };

  const originalList = [
    {
      label: "Sentiment Analysis",
      icon: heartHalf,
      color: "rgb(255,47,95)",
      path: "/sentimentView",
    },
    {
      label: "Word Clouds",
      icon: cloud,
      color: "rgb(225, 244, 255)",
      path: "/wordCloudsView",
    },
    // Add more items here
  ];

  const displayList = inputValue === ""
  ? originalList
  : originalList.filter(item => results.includes(item.label));
  
  return (
    <>
      <IonHeader></IonHeader>
      <p
        style={{
          fontSize: "28px",
          marginLeft: "15px",
          fontWeight: "bold",
          marginTop: "35px",
          marginBottom: "10px",
        }}
      >
        Browse
      </p>
      <IonSearchbar
        showClearButton="focus"
        onIonInput={handleInput}
      ></IonSearchbar>
           <IonList>
        {displayList.map((item, index) => (
          <IonItem
            key={index}
            style={{ fontSize: "19px" }}
            onClick={() => {
              if (item.path) {
                history.push(item.path);
              }
            }}
          >
            {item.icon && <IonIcon icon={item.icon} style={{ color: item.color }} />}
            <IonLabel style={{ padding: "13px" }}>{item.label}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default BrowserPage;
