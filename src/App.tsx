import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Map from './pages/Map';
import TrendingGallery from './pages/TrendingGallery';
import BucketList from './pages/BucketList';
import Welcome from './pages/Welcome';
import SiteFooter from './components/SiteFooter';
import Bookings from './pages/Bookings';
import MapDetails from './pages/MapDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

const jwt = localStorage.getItem('jwt');

setupIonicReact();

const App: React.FC = () => {
  //if (!jwt) {
  //  return <></>
  //}

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/bookings">
              <Bookings />
            </Route>
            <Route exact path="/gallery">
              <TrendingGallery />
            </Route>
            <Route exact path="/map">
              <Map />
            </Route>
            <Route path="/details/:id" component={MapDetails} >
            </Route>
            <Route exact path="/bucket-list">
              <BucketList />
            </Route>
            <Route exact path="/welcome">
              <Welcome />
            </Route>
            <Route exact path="/">
              <Redirect to="/welcome" />
            </Route>
          </IonRouterOutlet>
          <SiteFooter />
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
