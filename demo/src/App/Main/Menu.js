import React, { useState } from 'react'

const onNewItem = () => {
  console.log('New Item')
}

function Menu() {
  return (
    <div className="menu">
      <div className="menu-item">
        <button  onClick={onNewItem} >
          New Item
        </button>
      </div>
    </div>
  )
}

export default Menu
