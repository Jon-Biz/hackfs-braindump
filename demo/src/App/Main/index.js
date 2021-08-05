import React, { useState } from 'react'

function Menu() {
  return (
    <div className="menu">
      Menu Bar
    </div>
  )
}

function Settings() {
  return (
    <div className="settings">
      Settings Pane
    </div>
  )
}

function CurrentItems() {
  return (
    <ul>
      <li>
        <div>
          <div>Title</div>
          <div>Text</div>
        </div>
      </li>
      <li>
        <div>
          <div>Title 2</div>
          <div>Text</div>
        </div>
      </li>
    </ul>
  )
}

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
