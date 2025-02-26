import { IonButton, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import SiteHeader from '../components/SiteHeader';
import './Welcome.css';
import { person } from 'ionicons/icons';
import { useState } from 'react';
import Login from '../components/Login';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <SiteHeader />
      <IonContent fullscreen style={{ '--background': 'url(/assets/welcome.jpg) no-repeat center center fixed', '--background-size': 'cover' }}>
        <Login />
      </IonContent>
    </IonPage >
  );
};

export default Welcome;
