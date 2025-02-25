import React from 'react'
import IconProfile from '@webjet/react-icons/profile'

const Header = () => {
  return (
    <header>
      <h1>SO Webjet</h1>
      <div>
        <span className='user-name'>Hi, User</span>
        <IconProfile fill='#646464' size='16' />
      </div>
    </header>
  )
}

export default Header
