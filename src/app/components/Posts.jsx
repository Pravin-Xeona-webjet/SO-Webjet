import React, { useEffect, useState } from 'react'
import { Gallery } from 'react-grid-gallery'
import IconHeart from '@webjet/react-icons/heart'
import { FaBookmark } from 'react-icons/fa'
const originalFetch = require('isomorphic-fetch')
const fetch = require('fetch-retry')(originalFetch)

const Posts = () => {
  const [images, setImages] = useState([])

  const handleLike = async (imageId) => {
    try {
      const response = await fetch(`'https://sowebjet-a6crdfc4dzh2hver.australiasoutheast-01.azurewebsites.net/api/Gallery/rate?id=${imageId}&likeIt=true'`, {
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

  const fetchImages = async () => {
    try {
      const response = await fetch('https://sowebjet-a6crdfc4dzh2hver.australiasoutheast-01.azurewebsites.net/api/Gallery/list')
      const data = await response.json()
      const images = data.images.map(image => ({
        ...image,
        src: image.imageURL,
        width: 320,
        height: 212,
        customOverlay: (
          <div>
            <IconHeart fill={`${image.score > 0 ? 'red' : 'white'}`} size='24' onClick={() => handleLike(image.id)} />
            <FaBookmark />
          </div>
        ),
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
    <Gallery images={images} enableImageSelection={false} />
  )
}

export default Posts
