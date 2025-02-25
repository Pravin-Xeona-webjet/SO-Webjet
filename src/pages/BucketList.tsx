import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SiteHeader from '../components/SiteHeader';
import './BucketList.css';

const BucketList: React.FC = () => {
  return (
    <IonPage>
      <SiteHeader/>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bucket List</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default BucketList;
