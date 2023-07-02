import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import graphDot from "./Functionality/InitializeDot";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const dates = graphDot.map((obj) => obj.date);
const scores = graphDot.map((obj) => obj.score);

const data = {
  labels: dates,
  datasets: [
    {
      label: "mood change within a month",
      data: scores,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const SentimentPage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Sentiment</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent scrollY={false}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}>
        <Line data={data} />
      </div>
    </IonContent>
  </>
);

export default SentimentPage;
