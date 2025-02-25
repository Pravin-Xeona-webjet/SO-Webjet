import React from 'react'
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom'
import Main from 'components/Main'
import Posts from 'components/Posts'
import Map from 'components/Map'
import BucketList from 'components/BucketList'
import Home from 'components/Home'

export default function App () {
  const router = createHashRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          path: '/posts',
          element: <Posts />
        },
        {
          path: '/map',
          element: <Map />
        },
        {
          path: '/bucketlist',
          element: <BucketList />
        },
        {
          path: '/explore',
          element: <Home />
        },
        {
          element: <Home />,
          index: true
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}
