import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const WordlistPage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Word list</IonTitle>
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
        wordlist content
      </div>
    </IonContent>
  </>
);

export default WordlistPage;