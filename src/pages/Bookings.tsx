import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import SiteHeader from '../components/SiteHeader';
import * as Config from '../constants';
import './Bookings.css';
import { useState } from 'react';
import { airplane, camera } from 'ionicons/icons';

const Bookings: React.FC = () => {

  const [booking, setBookings] = useState<any[]>([])
  let jwt = localStorage.getItem('jwt');
  if (!jwt) {
    jwt = '';
    window.location.href = '/welcome';
  }

  const share = () => {
    const postData = async () => {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        return data.token;
    };

    postData().then(token => {
        localStorage.setItem('jwt', `Bearer ${token}`);
        window.location.href = '/map';
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

  const backendUrl = `${Config.BACKEND_URL}/Booking/list`
  const loadBookings = () => {
    const getData = async () => {
      const response = await fetch(backendUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwt,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const data = await response.json();

      const bookings = data.bookings.map((booking: any) => ({
        src: booking.id,
        summary: booking.summary
      }));
      console.log(bookings);
      setBookings(bookings);
    };

    getData().then(() => {
      console.log('images loaded');
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  useIonViewDidEnter(() => {
    loadBookings();
  });

  
  return (
    <IonPage>
      <SiteHeader/>
      <IonContent fullscreen>
      <IonGrid>

      ${booking.map((booking, index) => (
        <IonRow>
          <IonIcon icon={airplane} size='large' color='light'/>
          <IonText color={'light'}>{booking.summary}</IonText>
        </IonRow>
      ))}

                  <IonRow>
                      <IonCol size="10">
                          <IonRow>
                              <IonIcon
                                  color='primary'
                                  style={{ fontSize: '70px' }}
                                  icon={camera}
                              />
                          </IonRow>
                          <IonRow>
                              <IonCol>
                                  <IonItem>
                                      <IonLabel position="fixed"> Description</IonLabel>
                                      <IonTextarea maxlength={2400} rows={4}>
                                      </IonTextarea>
                                  </IonItem>
                              </IonCol>
                          </IonRow>
                          <IonRow>
                              <IonButton expand="block" onClick={share}>Share</IonButton>
                          </IonRow>
                      </IonCol>
                  </IonRow>
              </IonGrid>
              
      </IonContent>
    </IonPage>
  );
};

export default Bookings;
