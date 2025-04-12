import { CapacitorHttp } from "@capacitor/core";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const navigation = useIonRouter();
  const doLogout = () => {
    navigation.push("/", "root", "replace");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/update-profile">Edit</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="none">
          <IonItem>
            <IonAvatar> </IonAvatar>
          </IonItem>
          <IonItem>Fullname</IonItem>
          <IonItem></IonItem>
          <IonItem color={"danger"} onClick={() => doLogout()}>
            Logout
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
