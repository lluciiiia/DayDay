import { IonContent } from "@ionic/react";

const WordCloudsView = () => {
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
        Word Clouds
      </p>
      <IonContent scrollY={false}></IonContent>
    </>
  );
};

export default WordCloudsView;
