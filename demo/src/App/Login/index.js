import React, { useState } from 'react'

import Dialog from './Dialog'

const Login =
        ({setLogin
         }) => {
                  const [ showLogin, setShowLogin ] = useState(false)

                  const ShowLogin =
                          () => (
                                  <button 
                                    onClick={() => setShowLogin(!showLogin)} 
                                  >
                                    Login
                                  </button>
                                )

                  if (showLogin) {
                    return (
                      <div>
                        <ShowLogin
                          showLogin={showLogin}
                          setShowLogin={setShowLogin}
                        />
                        <Dialog setLogin={setLogin} />
                      </div>
                    )
                  }
                  else {
                  return (
                    <ShowLogin
                      showLogin={showLogin}
                      setShowLogin={setShowLogin}
                    />
                  )
                }
              }

export default Login
