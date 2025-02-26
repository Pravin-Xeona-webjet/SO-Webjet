import React, { useEffect, useState } from 'react'
import { Gallery } from 'react-grid-gallery'
import IconHeart from '@webjet/react-icons/heart'
import { CiBookmark } from 'react-icons/ci'
import { Modal } from '@webjet/react/components/modal'
const originalFetch = require('isomorphic-fetch')
const fetch = require('fetch-retry')(originalFetch)

const Posts = () => {
  const [images, setImages] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleLike = async (imageId) => {
    try {
      const response = await fetch(`https://sowebjet-a6crdfc4dzh2hver.australiasoutheast-01.azurewebsites.net/api/Gallery/rate?id=${imageId}&likeIt=true`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Failed to like the image')
      } else {
        fetchImages()
      }
      // Optionally update the state or provide feedback to the user
    } catch (error) {
      console.error('Error liking the image:', error)
    }
  }

  const handleSelect = (index) => {
    setSelectedImage(images[index])
    setShowModal(true)
  }

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

  return (
    <>
      <Gallery images={images} onSelect={handleSelect} />
      <Modal className='image-modal' show={showModal} title={selectedImage?.name} onToggle={() => setShowModal(false)} hasFooter={false}>
        {selectedImage &&
          <>
            <img src={selectedImage.imageURL} />
            <div>
              <IconHeart fill={`${selectedImage.score > 0 ? 'red' : 'white'}`} size='24' onClick={() => handleLike(selectedImage.id)} />
              <CiBookmark />
            </div>
            <span>{`Name: ${selectedImage.name}`}</span>
            <span>{`Description: ${selectedImage.description}`}</span>
          </>}
      </Modal>
    </>
  )
}

export default Posts
