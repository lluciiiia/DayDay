import { useState, useEffect } from "react";
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
import { SentimentResultData } from "../../../data/ResultService/sentimentResult";

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
  //   const [data, setData] = useState({
  //     labels: [],
  //     datasets: [
  //       {
  //         label: "mood change within a month",
  //         data: [] as number[],
  //         fill: false,
  //         borderColor: "rgb(75, 192, 192)",
  //         tension: 0.1,
  //       },
  //     ],
  //   });
  const [hasResult, setHasResult] = useState(false);
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const sentimentResult = new SentimentResultData();
      const result = await sentimentResult.getAllResults();
      console.log("result: ", result);

      if (result) {
        setHasResult(true);

        const dates: string[] = Object.keys(result);
        const scores: number[] = Object.values(result);

        console.log("dates, scores: ", dates, scores);

        const newData = {
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

        setData(newData); // Update data state variable
      }
    };

    fetchData();
  }, []);

  console.log("data after passing if statement", data);

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
              {/* instruction */}
              <div style={{ marginTop: "60px", padding: "10px" }}>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Get To Know Your Sentiment Patterns
                </div>
                <div style={{ fontSize: "18px", marginTop: "18px" }}>
                  Each sentiment score ranges from -5 to +5. <br></br>
                  Positive score: positive sentiment. <br></br>
                  Negative score: negative sentiment. <br></br>
                  <br></br>
                  Each date displays the average of the sentiment of the day.
                </div>
              </div>
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
