import React, { useState } from 'react'
import Transcryptor from 'transcryptor'

const transcryptor = new Transcryptor()

const connectWallet =
        sharedKey => {
                        alert(sharedKey)
                      }

const connectStorage =
        webStorageToken => {
                              alert(webStorageToken)
                            }

const Dialog =
        ({setLogin
         }) => {
                    const [ sharedKey, setSharedKey ] = useState(false)
                    const [ webStorageToken, setWebStorageToken ] = useState(false)

                    return (
                        <div>

                        You web3 wallet will request permission to provide your shared key, and encrypt some data with your private key.

                        <p>
                            If have already signed up on another computer, retrieve your secret from the settings page and add it here to connect this wallet with your existing data:
                            <input 
                              type="test" 
                              value={sharedKey} 
                              onChange={e => setSharedKey(e.target.value) }
                            />
                            <button 
                             onClick={() => connectWallet(sharedKey)}
                            >
                              Connect Wallet
                            </button>
                        </p>

                        <i>Optional</i>
                        <p>
                            If you have your own web3.storage token, add it here:
                            <input 
                              type="test" 
                              value={webStorageToken} 
                              onChange={e => setWebStorageToken(e.target.value) }
                            />
                            <button 
                              onClick={() => connectStorage(sharedKey)} 
                            >
                              Connect to Storage
                            </button>

                            Otherwise, we will persist your data on our webStorage, encrypted by your wallet's privste key.
                        </p>

                      <button 
                        onClick={ () => setLogin(true) }
                      >
                        Login
                      </button>
                    </div>
                  )
                }

export default Dialog
