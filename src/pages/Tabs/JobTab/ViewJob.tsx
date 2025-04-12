import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useLocation } from "react-router";

// Define the Job interface
interface Category {
  _id: string;
  title: string;
}

interface Benefits {
  pay: string;
  schedule: string;
}

interface JobDetails {
  benefits: Benefits;
  why: string;
  what: string;
  responsibilities: string[];
  requirements: string[];
}

interface Job {
  _id: string;
  title: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  __v: number;
  details: JobDetails;
}

const ViewJob: React.FC = () => {
  // Get the job data from location state
  const location = useLocation();
  const data = location.state as { job: Job }; // Explicitly type the state to be of type Job

  // Ensure data is valid before rendering the page content
  if (!data?.job) {
    return (
      <IonPage>
        <IonContent>
          <IonText>Job not found</IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color={"dark"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/job" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>Apply Now</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color={"dark"} fullscreen>
        <h4
          style={{
            position: "fixed",
            top: "18%",
            left: "2rem",
            textTransform: "capitalize",
          }}>
          {data.job.title}
        </h4>
        <IonList
          style={{
            position: "absolute",
            top: "35dvh",
            left: 0,
            right: 0,
            borderTopLeftRadius: "2rem",
            borderTopRightRadius: "2rem",
            paddingTop: "0",
            color: "black",
            paddingInline: "1.5rem",
          }}>
          <IonGrid
            style={{
              position: "sticky",
              top: 0,
              borderTopLeftRadius: "2rem",
              borderTopRightRadius: "2rem",
            }}
            color="light"
            className="ion-padding-bottom">
            <IonRow className="ion-padding-top">
              <h5>Why Join?</h5>
              <IonText>{data.job.details.why}</IonText>
            </IonRow>

            <IonRow className="ion-padding-top">
              <IonRow>
                <h5>What You'll Do</h5>
                <IonText>{data.job.details.what}</IonText>
              </IonRow>
            </IonRow>

            <IonRow className="ion-padding-top">
              <IonCol>
                <h5>Responsibilities</h5>
                <IonList lines="none">
                  {data.job.details.responsibilities.map((res, index) => (
                    <IonItem key={index}>- {res}</IonItem>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>

            <IonRow className="ion-padding-top">
              <IonCol>
                <h5>Requirements</h5>
                <IonList lines="none">
                  {data.job.details.requirements.map((req, index) => (
                    <IonItem key={index}>- {req}</IonItem>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>

            <IonRow className="ion-padding-top">
              <h5>Pay</h5>
            </IonRow>
            <IonText className="ion-padding-top">
              {data.job.details.benefits.pay}
            </IonText>

            <IonRow className="ion-padding-top">
              <h5>Schedule</h5>
            </IonRow>
            <IonText className="ion-padding-top">
              {data.job.details.benefits.schedule}
            </IonText>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ViewJob;
