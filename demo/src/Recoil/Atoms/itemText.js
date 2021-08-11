import {
    atom,
    selector,
    DefaultValue
  } from 'recoil'

import UserStore from '../UserStore'

const syncStorageEffect = dataId => ({setSelf, trigger, onSet}) => {

    // Initialize atom value to the remote storage state
    if (trigger === 'get') { // Avoid expensive initialization
      setSelf(UserStore.getItem(dataId)) // Call synchronously to initialize
    }

    onSet(newValue => {
        UserStore.setItem(newValue)
    })
  
    // Subscribe to remote storage changes and update the atom value
    UserStore.onChange(dataId, userInfo => {
      setSelf(userInfo) // Call asynchronously to change value
    })
  
    // Cleanup remote storage subscription
    return () => {
      UserStore.cancelListener(dataId)
    }
  }
  
  const itemText = atom({
    key: 'itemText',
    default: '',
    effects_UNSTABLE: [
      syncStorageEffect('current_user'),
    ]
  })

export default itemText