import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./notification.css";

const Notification: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notification</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="none" color="primary" className="notification-list">
          <IonItem>
            <IonAvatar aria-hidden="true" slot="start">
              <img
                alt=""
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonText>Dewey</IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notification;
