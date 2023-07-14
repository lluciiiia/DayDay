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
import { search, heart, calendarClear, list } from "ionicons/icons";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import BrowserPage from "./pages/BrowserPage";
import CategoryPage from "./pages/CategoryPage/CategoryMain";
import AddPage from "./pages/AddPage";
import ViewCategoryPage from "./pages/CategoryPage/ViewCategoryPage";
import ViewDatePage from "./pages/CalendarPage/ViewDatePage";
import ViewPage from "./pages/ViewPage";

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
          {/* <Route path="/category/:id" exact={true} render={() => <ViewCategoryPage />} /> */}
          <Route path="/viewCategory" exact={true} render={() => <ViewCategoryPage/>} />
          <Route path="/viewDate" exact={true} render={() => <ViewDatePage/>} />
          <Route path="/view" exact={true} render={() => <ViewPage/>} />

        
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
            <IonLabel>Browser</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
     
    </IonReactRouter>
  </IonApp>
);

export default App;
