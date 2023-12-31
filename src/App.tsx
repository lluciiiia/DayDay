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
import { search, calendarClear, list } from "ionicons/icons";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import BrowserPage from "./pages/BrowserPage/BrowserPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import AddPage from "./pages/AddEditPage/AddPage";
import ViewCategoryPage from "./pages/ViewListPages/ViewCategoryPage";
import ViewDatePage from "./pages/ViewListPages/ViewDatePage";
import ViewPage from "./pages/ViewPage/ViewPage";
import EditPage from "./pages/AddEditPage/EditPage";
import SentimentView from "./pages/BrowserPage/AnalysisViews.tsx/SentimentView/SentimentView";
import WordCloudsView from "./pages/BrowserPage/AnalysisViews.tsx/WordCloudsView/WordCloudsView";
import EmotionalMapView from "./pages/BrowserPage/AnalysisViews.tsx/EmotionalMapView/EmotionalMapView";

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
          <Route path="/add" exact={true} render={() => <AddPage />} />
          <Route path="/viewCategory" exact={true} render={() => <ViewCategoryPage/>} />
          <Route path="/viewDate" exact={true} render={() => <ViewDatePage/>} />
          <Route path="/view" exact={true} render={() => <ViewPage/>} />
          <Route path="/edit" exact={true} render={() => <EditPage/>} />
          <Route path="/sentimentView" exact={true} render={() => <SentimentView/>} />
          <Route path="/wordCloudsView" exact={true} render={() => <WordCloudsView/>} />
          <Route path="/emotionalMapView" exact={true} render={() => <EmotionalMapView/>} />



        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="category" href="/category">
            <IonIcon icon={list} />
            <IonLabel>Category</IonLabel>
          </IonTabButton>

          <IonTabButton tab="calendar" href="/calendar">
            <IonIcon icon={calendarClear} />
            <IonLabel>Calendar</IonLabel>
          </IonTabButton>

          <IonTabButton tab="browser" href="/browser">
            <IonIcon icon={search} />
            <IonLabel>Browse</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
     
    </IonReactRouter>
  </IonApp>
);

export default App;
