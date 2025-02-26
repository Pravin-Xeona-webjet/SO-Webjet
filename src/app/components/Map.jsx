import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = () => {
  const [images, setImages] = useState([])
  const fetchImages = async () => {
    try {
      const response = await fetch('https://sowebjet-a6crdfc4dzh2hver.australiasoutheast-01.azurewebsites.net/api/Gallery/list')
      const data = await response.json()
      const images = data.images.map(image => ({
        ...image,
        src: image.imageURL,
        width: 320,
        height: 212,
        tags: []
      }))
      setImages(images)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const markers = images.map(image => (
    <Marker key={image.id} position={[image.latitude, image.longitude]}>
      <Popup>
        <img src={image.imageURL} alt={image.name} />
        <div><span>Name: </span>{image.name}</div>
        <div><span>Description: </span>{image.description}</div>
      </Popup>
    </Marker>
  ))

  return (
    <div>
      <MapContainer center={[37, 144]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers}
      </MapContainer>
    </div>
  )
}

export default Map
