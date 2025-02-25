import { IonIcon, IonTabBar, IonTabButton } from "@ionic/react";
import { camera, home, list, planet } from 'ionicons/icons';

const SiteFooter: React.FC = () => {
    if (true)
    return (
        <IonTabBar slot="bottom">
        <IonTabButton tab="welcome" href="/welcome">
          <IonIcon aria-hidden="true" icon={home} />
        </IonTabButton>
        <IonTabButton tab="bookings" href="/bookings">
          <IonIcon aria-hidden="true" icon={list} />
        </IonTabButton>
        <IonTabButton tab="map" href="/map">
          <IonIcon aria-hidden="true" icon={planet} />
        </IonTabButton>
        <IonTabButton tab="gallery" href="/gallery">
          <IonIcon aria-hidden="true" icon={camera} />
        </IonTabButton>
      </IonTabBar>
  );
};
export default SiteFooter;