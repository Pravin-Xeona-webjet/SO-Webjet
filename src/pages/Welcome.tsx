import { IonButton, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import SiteHeader from '../components/SiteHeader';
import './Welcome.css';
import { person } from 'ionicons/icons';
import { useState } from 'react';
import Login from '../components/Login';

const login = () => {
    //const errors = validateForm(fields);
    //setErrors(errors);
    //if (!errors.length) {
    //  Submit your form here
    //}
}

const Welcome: React.FC = () => {
    return (
        <IonPage>
            <SiteHeader />
            <Login />
        </IonPage >
    );
};

export default Welcome;
