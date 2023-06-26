import { Redirect, Route } from "react-router-dom";
import React from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { search, heart, pencil, list } from "ionicons/icons";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SentimentPage from "./pages/SentimentPage";
import WordlistPage from "./pages/WordlistPage";
import AddPage from "./pages/AddPage";
import ViewPage from "./pages/ViewPage";
import EditPage from "./pages/EditPage";

setupIonicReact();

const App: React.FC = () => (
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" exact={true} render={() => <HomePage />} />
          <Route path="/sentiment" exact={true} render={() => <SentimentPage />} />
          <Route path="/wordlist" exact={true} render={() => <WordlistPage />} />
          <Route path="/search" exact={true} render={() => <SearchPage />} />
          <Route path="/add" exact={true} render={() => <AddPage />} />
          <Route path="/view" exact={true} render={() => <ViewPage />} />
          <Route path="/edit" exact={true} render={() => <EditPage />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={pencil} />
            <IonLabel>View</IonLabel>
          </IonTabButton>

          <IonTabButton tab="sentiment" href="/sentiment">
            <IonIcon icon={heart} />
            <IonLabel>Sentiment</IonLabel>
          </IonTabButton>

          <IonTabButton tab="wordlist" href="/wordlist">
            <IonIcon icon={list} />
            <IonLabel>Word list</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
