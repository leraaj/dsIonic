import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { CapacitorHttp } from "@capacitor/core";

const Login = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = () => {
    navigation.push("/tabs", "forward", "replace");
  };

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInput
          label="Username"
          labelPlacement="stacked"
          clearInput={true}
          value={username}></IonInput>
        <IonInput
          type="password"
          label="Password"
          labelPlacement="stacked"
          clearInput={true}
          value={password}></IonInput>
        <IonButton onClick={() => doLogin()}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
