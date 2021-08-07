import React, { useState } from 'react'

import Dialog from './Dialog'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import loginState from  '../../Recoil/Atoms/loginState'

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
