import { IonList, IonLabel, IonItem, IonContent } from "@ionic/react";

interface WordCloudsProps {
  topWords: [string, number][];
}

export const WordClouds: React.FC<WordCloudsProps> = ({ topWords }) => {
  return (
    <>
      <IonContent
        scrollY={true}
        style={{ height: "calc(100% - 75px)" }}></IonContent>
    </>
  );
};

export default WordClouds;
