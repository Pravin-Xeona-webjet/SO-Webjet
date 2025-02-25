import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import SiteHeader from '../components/SiteHeader';
import { useState } from 'react';
import MapHighlight from '../components/MapHighlight';
import * as Config from '../constants';

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 10);

  return null;
};

/*
function MoveTo({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}
*/

const Map: React.FC = () => {
  const [images, setImages] = useState<any[]>([])
  const [latitude, setLatitude] = useState(-33.908079)
  const [longitude, setLongitude] = useState(151.211322)
  let jwt = localStorage.getItem('jwt');
  if (!jwt) {
    jwt = '';
    window.location.href = '/welcome';
  }

  const backendUrl = `${Config.BACKEND_URL}/Gallery/list`


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
      const images = data.images.map((image: any) => ({
        id: image.id,
        name: image.name,
        description: image.description,
        src: image.imageURL,
        position: [image.latitude, image.longitude],
        width: 320,
        height: 212,
        tags: image.tags,
        score: image.score
      }));

      setImages(images);
    };

    getData().then(() => {
      
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  useIonViewDidEnter(() => {
    loadImages();
    console.log('useIonViewDidEnter');
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

export default Map;
