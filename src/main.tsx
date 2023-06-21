import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// tabs
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';

import { playCircle, radio, library, search } from 'ionicons/icons';

import HomePage from './pages/HomePage'; // calendar + add + view
import SentimentPage from './pages/SentimentPage'; 
import WordlistPage from './pages/WordlistPage'; 
import SearchPage from './pages/SearchPage';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function Example() {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/home" render={() => <HomePage />} exact={true} />
          <Route path="/sentiment" render={() => <SentimentPage />} exact={true} />
          <Route path="/wordlist" render={() => <WordlistPage />} exact={true} />
          <Route path="/search" render={() => <SearchPage />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
            <IonIcon icon={playCircle} />
            <IonLabel>Listen now</IonLabel>
          </IonTabButton>

          <IonTabButton tab="sentiment" href="/sentiment">
            <IonIcon icon={radio} />
            <IonLabel>Sentiment</IonLabel>
          </IonTabButton>

          <IonTabButton tab="wordlist" href="/wordlist">
            <IonIcon icon={library} />
            <IonLabel>Wordlist</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default Example;