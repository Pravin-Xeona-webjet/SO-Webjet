import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SiteHeader from '../components/SiteHeader';
import './Bookings.css';

const Bookings: React.FC = () => {
  return (
    <IonPage>
      <SiteHeader/>
      <IonContent fullscreen>
        <p>hello</p>
      </IonContent>
    </IonPage>
  );
};

export default Bookings;
