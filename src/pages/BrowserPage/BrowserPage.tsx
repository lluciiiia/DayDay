import { useHistory } from "react-router";
import {
  IonHeader,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { AnalysisSearchData } from "../../else/search";
import { useSearch } from "../../else/searchGeneric";
import { heartHalf, cloud, location } from "ionicons/icons";

const BrowserPage = () => {
  const history = useHistory();

  // search functionality
  const searchData: AnalysisSearchData = {
    data: ["Sentiment Analysis", "Word Clouds", "Emotional Mapping"],
    keys: ["Sentiment Analysis", "Word Clouds", "Emotional Mapping"],
  };

  const { results, inputValue, handleInput } = useSearch(searchData);

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
    {
      label: "Emotional Mapping",
      icon: location,
      color: "rgb(225, 60, 60)",
      path: "/emotionalMapView",
    },
  ];

  const displayList =
    inputValue === ""
      ? originalList
      : originalList.filter((item) => results.includes(item.label));

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
        }}>
        Browse
      </p>
      <IonSearchbar
        showClearButton="focus"
        onIonInput={handleInput}></IonSearchbar>
      <IonList>
        {displayList.map((item, index) => (
          <IonItem
            key={index}
            style={{ fontSize: "19px" }}
            onClick={() => {
              if (item.path) {
                history.push(item.path);
              }
            }}>
            {item.icon && (
              <IonIcon icon={item.icon} style={{ color: item.color }} />
            )}
            <IonLabel style={{ padding: "13px" }}>{item.label}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default BrowserPage;
