import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import SiteHeader from '../components/SiteHeader';
import { useState } from 'react';
import MapHighlight from '../components/MapHighlight';
import './MapDetails.css'
import { useParams } from 'react-router';
import * as Config from '../constants';

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 10);

  return null;
};

/*
const MoveTo = ({ coords }) => {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}
*/

const MapDetails: React.FC = () => {
  const params = useParams(); 

  const [images, setImages] = useState<any[]>([])
  const [latitude, setLatitude] = useState(-33.908079)
  const [longitude, setLongitude] = useState(151.211322)
  let jwt = localStorage.getItem('jwt');
  if (!jwt) {
    jwt = '';
    window.location.href = '/welcome';
  }

  const backendUrl = `${Config.BACKEND_URL}/Gallery/details?id=ec445664-f5ce-4b6c-be04-17ce65432382'

  const loadImages = () => {
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
      
      const connection = {
        'id': 'missing-data-to-add',
        'src': '/assets/airport.jpg',
        'name': data.connectionPort.type,
        'description': data.connectionPort.name,
        'position': [data.connectionPort.latitude, data.connectionPort.longitude]
      };
      const attraction = {
        'id': data.id,
        'src': data.imageURL,
        'name': data.name,
        'description': data.description,
        'position': [data.latitude, data.longitude]
      };

      setImages([connection, attraction]);
    };

    getData().then(() => {
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  useIonViewDidEnter(() => {
    loadImages();
  });

  useIonViewWillLeave(() => {
    console.log('Leaving MapDetails');
  });


  return (
    <IonPage>
      <SiteHeader />
      <IonContent fullscreen>
        <MapContainer center={[latitude, longitude]} zoom={6} minZoom={4} maxZoom={8} scrollWheelZoom={true}>
          <ComponentResize />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {images.map((image) => (
            <Marker key={`marker-${image.id}`} position={image.position}>
              <Popup>
                <MapHighlight image={image} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default MapDetails;
