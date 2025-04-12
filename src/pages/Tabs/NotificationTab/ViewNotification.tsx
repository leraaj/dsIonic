import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const ViewNotification: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/notification" />
          </IonButtons>
          <IonTitle>View Notification</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default ViewNotification;
