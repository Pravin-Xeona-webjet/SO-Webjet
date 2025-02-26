import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import SiteHeader from '../components/SiteHeader';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import './TrendingGallery.css';
import { bookmark, heart } from 'ionicons/icons';
import * as Config from '../constants';

const RateImage = (id: any) => {
  let jwt = localStorage.getItem('jwt');
  if (!jwt) {
    jwt = '';
    window.location.href = '/welcome';
  }
  const backendUrl = `${Config.BACKEND_URL}/Gallery/rate`
  const postData = async () => {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify({
        id: id
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  };
  postData().then(() => {
  }).catch(error => {
    console.error('There was a problem with the operation:', error);
  });
}

const BookmarkImage = (id: any) => {
  let jwt = localStorage.getItem('jwt');
  if (!jwt) {
    jwt = '';
    window.location.href = '/welcome';
  }
  const backendUrl = `${Config.BACKEND_URL}/Gallery/bookmark`
  const postData = async () => {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify({
        id: id
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  };

  postData().then(() => {
  }).catch(error => {
    console.error('There was a problem with the operation:', error);
  });
}

const TrendingGallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([])
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
        ...image,
        src: image.imageURL,
        width: 320,
        height: 212,
        customOverlay: (
          <div>Hallo</div>
        ),
        tags: image.tags,
        score: image.score
      })).sort((a: any) => a.score);
      setImages(images);
    };

    getData().then(images => {
      console.log('images loaded');
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
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} >
          <Masonry>
            {images.map((image, i) => (
              <div>
                <img
                  key={i}
                  src={image.src}
                  style={{ width: "100%", display: "block" }}
                  alt=""
                />
                <div className="overlay">
                  <IonIcon aria-hidden="true" size='large' color='light' icon={heart} onClick={() => RateImage(image.id)} />
                  <IonIcon aria-hidden="true" size='large' color='light' icon={bookmark} onClick={() => BookmarkImage(image.id)} />
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </IonContent>
    </IonPage>
  );
};

export default TrendingGallery;
