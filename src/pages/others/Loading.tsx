import { IonContent, IonPage, IonProgressBar } from "@ionic/react";
import React from "react";

const Loading: React.FC = () => {
  // Display the list of jobs once data is fetched
  return <IonProgressBar type="indeterminate" color="medium"></IonProgressBar>;
};

export default Loading;
