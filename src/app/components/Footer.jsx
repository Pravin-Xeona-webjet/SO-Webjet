import React from 'react'
import IconPhotos from '@webjet/react-icons/photos'
import IconMapPin from '@webjet/react-icons/map-pin'
import { FaBookmark, FaHome } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <a href='/#/posts'>
        <IconPhotos fill='#dc140a' size='32' />
        <span>Photos</span>
      </a>
      <a href='/#/map'>
        <IconMapPin fill='#dc140a' size='32' />
        <span>Map</span>
      </a>
      <a href='/#/bucketlist'>
        <FaBookmark fill='#dc140a' size='32' />
        <span>Bucket List</span>
      </a>
      <a href='/#/explore'>
        <FaHome fill='#dc140a' size='32' />
        <span>Explore</span>
      </a>
    </footer>
  )
}

export default Footer
