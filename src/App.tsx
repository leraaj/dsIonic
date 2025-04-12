import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "./style/custom.css";

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";
import Tabs from "./pages/Tabs/Tabs";
import ViewNotification from "./pages/Tabs/NotificationTab/ViewNotification";
import ViewJob from "./pages/Tabs/JobTab/ViewJob";
import ViewProfile from "./pages/Tabs/ProfileTab/ViewProfile";
//
import SplashScreen from "./pages/others/Loading";
setupIonicReact();
import { StatusBar } from "@capacitor/status-bar";

const setStatusBar = async () => {
  await StatusBar.setOverlaysWebView({ overlay: false }); // Prevents overlap
};

setStatusBar();
const defaultRoutes = [
  { isExact: true, path: "/", component: Login },
  { isExact: false, path: "/tabs", component: Tabs },
];

const privateRoutes = [
  {
    isExact: true,
    path: "/view-notification/:id",
    component: ViewNotification,
  },
  { isExact: true, path: "/view-job/:id", component: ViewJob },
  { isExact: true, path: "/update-profile", component: ViewProfile },
  { isExact: true, path: "/loading", component: SplashScreen },
];

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet animated={true}>
        {defaultRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              exact={route.isExact}
              path={route.path}
              component={route.component}
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              exact={route.isExact}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
