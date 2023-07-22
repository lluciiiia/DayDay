import { useEffect, useState } from "react";
import { SentimentResultData } from "../../../../../data/ResultService/sentimentResult";

const fetchSentimentResult = () => {
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

      if (result) {
        setHasResult(true);
        const dates: string[] = Object.keys(result);
        const scores: number[] = Object.values(result);

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
        setData(newData);
      }
    };

    fetchData();
  }, []);

  return { hasResult, data };
};

export default fetchSentimentResult;
