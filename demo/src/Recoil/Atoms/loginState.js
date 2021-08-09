import {
    atom,
  } from 'recoil';
  
const loginState = atom({
    key: 'loginState', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  })

export default loginState