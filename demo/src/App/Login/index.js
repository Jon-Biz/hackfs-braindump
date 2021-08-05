import React, { useState } from 'react'

import Dialog from './Dialog'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


const loginState = atom({
  key: 'loginState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

const Login =
        () => {
                  const [ login, setLogin] = useRecoilState(loginState)
                  const [ showLogin, setShowLogin ] = useState(false)

                  const ShowLogin =
                          () => (
                                  <button 
                                    onClick={
                                      () => setShowLogin(!showLogin)
                                    } 
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
