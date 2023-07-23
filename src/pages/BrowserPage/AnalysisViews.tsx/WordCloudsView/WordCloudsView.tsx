import { IonToggle } from "@ionic/react";
import { useState } from "react";
import WordList from "./SubWordClouds/WordList";
import WordClouds from "./SubWordClouds/WordClouds";
import fetchWordCloudsResult from "./SubWordClouds/fetchWordCloudsResult";

export const WordCloudsView = () => {
  const [toggle, setToggle] = useState(false);
  const { topWords } = fetchWordCloudsResult();

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
      <IonToggle
        labelPlacement="end"
        style={{ padding: "13px", marginLeft: "210px" }}
        onClick={() => setToggle(!toggle)}>
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
