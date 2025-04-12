import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
// Pages
import NotificationTab from "./NotificationTab/Notification";
import HomeTab from "./JobTab/Job";
import ProfileTab from "./ProfileTab/Profile";
import { home, notifications, person } from "ionicons/icons";

const Tabs = () => {
  const tabs = [
    { path: "/tabs/notification", icon: notifications, tab: "notification" },
    { path: "/tabs/job", icon: home, tab: "job" },
    { path: "/tabs/profile", icon: person, tab: "profile" },
  ];
  const routes = [
    { path: "/tabs/notification", component: NotificationTab, isPrivate: true },
    { path: "/tabs/job", component: HomeTab, isPrivate: true },
    { path: "/tabs/profile", component: ProfileTab, isPrivate: true },
  ];
  return (
    <IonTabs>
      <IonRouterOutlet>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              exact
              path={route.path}
              component={route.component}
            />
          );
        })}
        <Route exact path="/tabs">
          <Redirect to={"/tabs/job"} />
        </Route>
      </IonRouterOutlet>
      <IonTabBar color={"dark"} slot="bottom">
        {tabs.map((btn, index) => {
          return (
            <IonTabButton key={index} tab={btn.tab} href={btn.path}>
              <IonIcon size="small" icon={btn.icon}></IonIcon>
            </IonTabButton>
          );
        })}
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
