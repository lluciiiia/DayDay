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
        Browser
      </p>
      <IonSearchbar
        showClearButton="focus"
        //onIonInput={handleInput}
      ></IonSearchbar>
      <IonList>
        <IonItem
          style={{ padding: "7px", fontSize: "18px" }}
          onClick={() => history.push("/sentimentView")}>
          <IonLabel>Sentiment Analysis</IonLabel>
        </IonItem>
        <IonItem style={{ padding: "7px", fontSize: "18px" }}>
          <IonLabel>Item 2</IonLabel>
        </IonItem>
        <IonItem style={{ padding: "7px", fontSize: "18px" }}>
          <IonLabel>Item 3</IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default BrowserPage;
