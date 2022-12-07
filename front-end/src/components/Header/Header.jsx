import React from 'react'
import './Header.css'

const Header = ({name}) => {
  return (
    <div className="Header">
        <h2>{name}</h2>
    </div>
    )
}

export default Header