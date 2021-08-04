import './index.css';
import React, { useState } from 'react'
import Login from './Login';

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

const Page =
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

const App = 
        () => {
                const [ login, setLogin ] = useState(false)

                if (!login) {
                  return (
                    <Login
                      setLogin={setLogin} 
                    />
                  )
                }
                else {
                 return (
                   <Page /> 
                 )
                }
              }

export default App
