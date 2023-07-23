import { useHistory } from "react-router";
import {
  IonHeader,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
} from "@ionic/react";

const BrowserPage = () => {
  const history = useHistory();
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
        //onIonInput={handleInput}
      ></IonSearchbar>
      <IonList>
        <IonItem
          style={{ fontSize: "19px" }}
          onClick={() => history.push("/sentimentView")}>
          <IonLabel style={{ padding: "13px" }}>Sentiment Analysis</IonLabel>
        </IonItem>
        <IonItem style={{ fontSize: "19px" }} onClick={() => history.push("/wordCloudsView")}>
          <IonLabel style={{ padding: "13px" }}>Word Clouds</IonLabel>
        </IonItem>
        {/* <IonItem style={{ fontSize: "19px" }}>
          <IonLabel style={{ padding: "13px" }}>Item 3</IonLabel>
        </IonItem> */}
      </IonList>
    </>
  );
};

export default BrowserPage;
