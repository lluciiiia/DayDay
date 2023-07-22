import { IonContent } from "@ionic/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Instruction from "./Instruction";
import fetchSentimentResult from "./fetchSentimentResult";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
          {hasResult && data ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  marginTop: "30px",
                  width: "100%",
                }}>
                <Line data={data} />
              </div>
              <Instruction />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                marginTop: "320px",
                width: "100%",
              }}>
              No data available
            </div>
          )}
          <div
            id="instruction"
            style={{ marginTop: "50px", padding: "10px" }}></div>
        </div>
      </IonContent>
    </>
  );
};

export default SentimentView;
