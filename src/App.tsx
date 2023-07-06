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
import CalendarPage from "./pages/CalendarPage";
import BrowserPage from "./pages/BrowserPage";
import CategoryPage from "./pages/CategoryPage";

setupIonicReact();

const App: React.FC = () => (
  
  <IonApp>
    <IonReactRouter>
    <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/calendar" />
          <Route path="/calendar" exact={true} render={() => <CalendarPage />} />
          <Route path="/browser" exact={true} render={() => <BrowserPage />} />
          <Route path="/category" exact={true} render={() => <CategoryPage />} />
        
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="category" href="/category">
            <IonIcon icon={pencil} />
            <IonLabel>Category</IonLabel>
          </IonTabButton>

          <IonTabButton tab="calendar" href="/calendar">
            <IonIcon icon={heart} />
            <IonLabel>Calendar</IonLabel>
          </IonTabButton>

          <IonTabButton tab="browser" href="/browser">
            <IonIcon icon={list} />
            <IonLabel>Browser</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
     
    </IonReactRouter>
  </IonApp>
);

export default App;
