import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  ScrollDetail,
} from "@ionic/react";
import useFetch from "../../../hooks/useFetch";
import { useHistory, useLocation } from "react-router";
import "../../../style/job.css";
interface JobCategory {
  _id: string;
  title: string;
}

interface Job {
  _id: number;
  title: string;
  category: JobCategory;
}

const Job: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [onTop, setOnTop] = useState(false);
  // Add state to manage the search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Handle search input change
  const handleSearch = (e: CustomEvent) => {
    setSearchQuery(e.detail.value!); // Set the search query from the searchbar
  };
  // Jobs Variables
  const { isLoading, error, data, refresh } = useFetch<Job[]>(
    `http://192.168.1.16:3001/api/jobs`
  );

  const [refreshEvent, setRefreshEvent] = useState<any>(null);
  useEffect(() => {
    refresh(); // Automatically fetch data when page loads
  }, []);
  // Observe `isLoading` and complete refresher when loading is done
  useEffect(() => {
    if (!isLoading && refreshEvent) {
      refreshEvent.detail.complete(); // Complete the IonRefresher
      setRefreshEvent(null); // Clear stored event
    }
  }, [isLoading, refreshEvent]);
  const jobsByCategory = (data ?? [])
    .filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .reduce((acc, job) => {
      const category = job.category?.title || "Uncategorized";
      (acc[category] ||= []).push(job);
      return acc;
    }, {} as Record<string, Job[]>);

  const handleNavigate = (job: Job) => {
    history.push({
      pathname: `/view-job/${job._id}`,
      state: { job },
    });
  };

  return (
    <IonPage>
      <IonContent
        color={"dark"}
        fullscreen
        scrollEvents={true}
        onIonScrollStart={() => setOnTop(true)}>
        <IonRefresher
          color="light"
          slot="fixed"
          onIonRefresh={(event) => {
            setRefreshEvent(event); // Store the event so we can complete it later
            refresh(); // Start refreshing
          }}>
          {isLoading && <IonProgressBar type="indeterminate" />}
          <IonRefresherContent pullingText="Pull down to refresh..."></IonRefresherContent>
        </IonRefresher>
        <h3 className="job-title">
          Let’s find the perfect
          <br />
          job for you {window.location.href}
        </h3>
        <div className="job-container">
          <div className="sticky-container">
            <IonSearchbar
              className="job-searchbar"
              debounce={1000}
              animated={true}
              placeholder="Search something"
              showClearButton="always"
              onIonInput={handleSearch}
            />
          </div>
          <IonList
            lines="none"
            className="job-list"
            style={{
              height: "fit-content",
              minHeight: "100%",
            }}>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}>
                <IonSpinner name="dots" />
              </div>
            ) : error ? (
              <IonItem>
                <IonText>{`${error}`}</IonText>
              </IonItem>
            ) : (
              Object.entries(jobsByCategory).map(([category, jobs]) => (
                <React.Fragment key={category}>
                  <IonItem
                    lines="none"
                    className="ion-text-uppercase ion-text-center">
                    <h4>{category}</h4>
                  </IonItem>
                  {jobs.map((job) => (
                    <IonItem
                      key={job._id}
                      onClick={() => handleNavigate(job)}
                      style={{ cursor: "pointer" }}
                      detail>
                      <IonGrid>
                        <IonRow class="ion-justify-content-between ion-align-items-center">
                          <IonCol class="ion-text-capitalize">
                            {job.title}
                          </IonCol>
                          <IonCol size="auto">learn more</IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                  ))}
                </React.Fragment>
              ))
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Job;
