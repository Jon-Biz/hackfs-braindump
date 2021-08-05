import './index.css';
import React from 'react'
import {
  atom,
  useRecoilState,
} from 'recoil';

import UserStore from './UserStore'
import Login from './Login';
import Main from './Main';

const loginState = atom({
  key: 'loginState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

const App = 
        () => {
                const [ login ] = useRecoilState(loginState)

                return (!login)
                        ? <Login />
                        : <Main />
              }

const AppWithLogin = 
        () => {

        }
export default App
