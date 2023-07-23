import { IonContent, IonToggle } from "@ionic/react";
import { useState, useEffect } from "react";
import { WordCloudsResultData } from "../../../../data/ResultService/wordCloudsResult";
import WordList from "./SubWordClouds/WordList";
import WordClouds from "./SubWordClouds/WordClouds";

export const WordCloudsView = () => {
  const [toggle, setToggle] = useState(false);
  const [topWords, setTopWords] = useState<[string, number][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const wordCloudsResult = new WordCloudsResultData();
      const result = await wordCloudsResult.getAllResults();
      console.log("result: ", result);

      const typedResult = result as { [key: string]: number };
      const sortedWordCount = Object.entries(typedResult);
      sortedWordCount.sort((a, b) => b[1] - a[1]);

      const topWordsSlice = sortedWordCount.slice(0, 51);
      console.log("Slice: ", topWordsSlice);

      setTopWords(topWordsSlice);
    };

    fetchData();
  }, []);

  return (
    <>
      <p
        style={{
          fontSize: "28px",
          marginLeft: "15px",
          fontWeight: "bold",
          marginTop: "35px",
          marginBottom: "5px",
        }}>
        Word Clouds
      </p>
      <IonToggle labelPlacement="end" style={{ padding: "13px", marginLeft: "210px" }} onClick={() => setToggle(!toggle)}>
        {toggle ? "View Clouds" : "View List"}
      </IonToggle>
      {toggle ? (
        <WordList topWords={topWords} />
      ) : (
        <WordClouds topWords={topWords} />
      )}
    </>
  );
};

export default WordCloudsView;
