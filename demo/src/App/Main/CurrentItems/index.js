import React, { useState, Suspense } from 'react'

import Item from './Item'

const Waiting = () => (<div>Loading...</div>)

function CurrentItems() {
  return (
    <Suspense fallback={Waiting()}
    >
      <ul>
        <li>
          <Item />
        </li>
      </ul>

    </Suspense>
  )
}

export default CurrentItems
