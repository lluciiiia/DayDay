import { IonList, IonLabel, IonItem, IonContent } from "@ionic/react";
import wordCloud from "wordcloud";
import { useRef, useEffect } from "react";

interface WordCloudsProps {
  topWords: [string, number][];
}

export const WordClouds: React.FC<WordCloudsProps> = ({ topWords }) => {
  const cloudRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (cloudRef.current) {
      const canvas = cloudRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        wordCloud(canvas, {
          list: topWords,
          fontFamily: "Arial",
          gridSize: 10,
          weightFactor: 25,
          backgroundColor: "rgba(0,0,0)",
        });

        // Optional) add event listeners or further customization to the word cloud canvas here.
      }
    }

    return () => {
      // Clean up the word cloud canvas on unmount by clearing its content.
      if (cloudRef.current) {
        const canvas = cloudRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
  }, [topWords]);

  return (
    <IonContent scrollY={false}>
      <canvas ref={cloudRef} width="380" height="650" />
    </IonContent>
  );
};

export default WordClouds;
