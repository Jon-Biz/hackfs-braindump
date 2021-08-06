import React, { useState } from 'react'

import Item from './Item'

function CurrentItems() {
  return (
    <ul>
      <li>
        <Item />
      </li>
      <li>
        <Item />
      </li>
    </ul>
  )
}

export default CurrentItems
