import React, { useState } from 'react'
import Menu from './Menu'
import CurrentItems from './CurrentItems'
import Settings from './Settings'

const Main =
        () => (
          <div className="App">
            <h1>
              Braindump
            </h1>
            <Menu />
            <CurrentItems />
            <Settings />
          </div>
        )

export default Main
