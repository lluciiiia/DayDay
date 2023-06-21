import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const SentimentPage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Sentiment</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        Sentiment content
      </div>
    </IonContent>
  </>
);

export default SentimentPage;