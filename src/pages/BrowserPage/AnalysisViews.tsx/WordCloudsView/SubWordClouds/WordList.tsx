import { IonList, IonLabel, IonItem, IonContent } from "@ionic/react";

interface WordListProps {
  topWords: [string, number][];
}

export const WordList: React.FC<WordListProps> = ({ topWords }) => {
  return (
    <>
      <IonContent scrollY={true} style={{ height: "calc(100% - 80px)" }}>
        <div
          style={{
            padding: "7px 13px",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
          }}>
          <div
            style={{
              flex: 1,
              overflowY: "scroll",
              width: "100%",
            }}>
            <div
              style={{
                flex: 1,
                overflowY: "scroll",
                width: "100%",
              }}>
              <IonList>
                {topWords.map((item, index) => (
                  <IonItem key={item[0]}>
                    <div style={{ marginRight: "30px" }}>
                      <IonLabel
                        style={{
                          fontSize: "21px",
                          fontWeight: "bold",
                        }}>{`Top ${index + 1}`}</IonLabel>
                    </div>
                    <IonLabel
                      style={{
                        fontSize: "19px",
                        padding: "5px",
                      }}>{`${item[0]} (${item[1]})`}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </div>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default WordList;
