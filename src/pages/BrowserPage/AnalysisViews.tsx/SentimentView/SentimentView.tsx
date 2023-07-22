import { IonContent } from "@ionic/react";
import NoData from "./SubSentiment/NoData";
import YesData from "./SubSentiment/YesData";
import fetchSentimentResult from "./SubSentiment/fetchSentimentResult";

const SentimentView = () => {
  const { hasResult, data } = fetchSentimentResult();

  return (
    <>
      <p
        style={{
          fontSize: "28px",
          marginLeft: "15px",
          fontWeight: "bold",
          marginTop: "35px",
          marginBottom: "10px",
        }}>
        Sentiment Analysis
      </p>
      <IonContent scrollY={false}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {hasResult && data ? <YesData data={data} /> : <NoData />}
          <div
            id="instruction"
            style={{ marginTop: "50px", padding: "10px" }}></div>
        </div>
      </IonContent>
    </>
  );
};

export default SentimentView;
