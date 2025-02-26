import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import SiteHeader from '../components/SiteHeader';
import { useEffect, useState } from 'react';
import MapAirport from '../components/MapAirport';
import './MapDetails.css'
import { RouteComponentProps, useParams } from 'react-router';
import * as Config from '../constants';
import MapAttraction from '../components/MapAttraction';

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 10);

  return null;
};

const RecenterAutomatically = ({lat,lng}) => {
  const map = useMap();
   useEffect(() => {
     map.setView([lat, lng]);
   }, [lat, lng]);
   return null;
 }

interface MapDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}
  
const MapDetails: React.FC<MapDetailPageProps> = ({match}) => {
  const [attraction, setAttraction] = useState<any>({})
  const [airport, setAirport] = useState<any>({})
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  let jwt = localStorage.getItem('jwt');
  if (!jwt) {
    jwt = '';
    window.location.href = '/welcome';
  }

  const backendUrl = `${Config.BACKEND_URL}/Gallery/details?id=${match.params.id}`
  const loadImages = () => {
    console.log('Loading data');
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
      
      const airport = {
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

      setAirport(airport);
      setAttraction(attraction);
    };

    getData().then(() => {
      console.log('Data loaded');
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  useIonViewDidEnter(() => {
    loadImages();
  });

  return (
    <IonPage>
      <SiteHeader />
      <IonContent fullscreen>
        <MapContainer center={[latitude, longitude]} zoom={8} minZoom={4} maxZoom={10} scrollWheelZoom={true}>
          <ComponentResize />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {airport.position && (
            <Marker key={`marker-${airport.id}`} position={airport.position}>
              <Popup>
                <MapAirport info={airport} />
              </Popup>
            </Marker>
          )}

          {attraction.position && (
            <Marker key={`marker-${attraction.id}`} position={attraction.position}>
              <Popup>
                <MapAttraction info={attraction} />
              </Popup>  
            </Marker>
          )}

          {attraction.position && <RecenterAutomatically lat={attraction.position[0]} lng={attraction.position[1]} />}
        </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default MapDetails;
