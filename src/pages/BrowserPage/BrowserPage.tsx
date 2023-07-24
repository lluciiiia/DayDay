import { useHistory } from "react-router";
import {
  IonHeader,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { heartHalf, chatboxEllipses } from "ionicons/icons";

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
          <IonIcon icon={heartHalf} style={{ color: "rgb(255,47,95)" }} />
          <IonLabel style={{ padding: "13px" }}>Sentiment Analysis</IonLabel>
        </IonItem>
        <IonItem
          style={{ fontSize: "19px" }}
          onClick={() => history.push("/wordCloudsView")}>
          <IonIcon
            icon={chatboxEllipses}
            style={{ color: "rgb(225, 244, 255)" }}
          />
          <IonLabel style={{ padding: "13px" }}>Word Clouds</IonLabel>
        </IonItem>
        {/* <IonItem style={{ fontSize: "19px" }} onClick={() => history.push("/stressView")}>
          <IonLabel style={{ padding: "13px" }}>Stress management</IonLabel>
        </IonItem> */}
      </IonList>
    </>
  );
};

export default BrowserPage;
