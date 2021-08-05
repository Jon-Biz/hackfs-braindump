import React, { useState } from 'react'

const connectWallet =
        sharedKey => {
                        alert(sharedKey)
                      }

const Dialog =
        ({setLogin
         }) => {
                    const [ sharedKey, setSharedKey ] = useState(false)
                    
                    return (
                        <div>
                          <h2>
                            Do you want create an new account, or connect to an existing one?
                          </h2>
                          <p>
                            To create a new account, click login below:
                            <button 
                              onClick={ () => setLogin(true) }
                            >
                              Crete New Account
                            </button>
                          </p>
                          <p>
                            To connect and existing account from another computer, type the shared key:
                            <input 
                              type="text" 
                              onChange={ e => setSharedKey(e.target.value) }
                              />
                              <button onClick={ () => setLogin(true) }/>
                          </p>
                    </div>
                  )
                }

export default Dialog
