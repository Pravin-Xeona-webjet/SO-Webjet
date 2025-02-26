import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import './SiteHeader.css';

const SiteHeader: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar color={"primary"}>
            <IonButtons>
                <IonTitle>SO Webjet</IonTitle>
            </IonButtons>
        </IonToolbar>
      </IonHeader >
  );
};

export default SiteHeader;