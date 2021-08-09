import './index.css';
import React from 'react'
import {
  useRecoilState,
} from 'recoil';

import UserStore from '../Recoil/UserStore'
import Login from './Login';
import Main from './Main';

import loginState from '../Recoil/Atoms/loginState'

const App = 
        () => {
                const [ login ] = useRecoilState(loginState)

                return (!login)
                        ? <Login />
                        : <Main />
              }

const AppWithLogin = 
        () => {
                return <div>
                        <a>learn react</a>
                        <App />
                </div>
        }
export default AppWithLogin
