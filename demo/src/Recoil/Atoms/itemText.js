import {
    atom,
    selector,
    DefaultValue
  } from 'recoil'
  
import UserStore from '../UserStore'

let item = { itemText: 'h' }

const syncStorageEffect = userID => ({setSelf, trigger, onSet}) => {

    // Initialize atom value to the remote storage state
    if (trigger === 'get') { // Avoid expensive initialization
      setSelf(UserStore.getItem(userID)) // Call synchronously to initialize
    }

    onSet(newValue => {
        UserStore.setItem(newValue)
    })
  
    // Subscribe to remote storage changes and update the atom value
    UserStore.onChange(userID, userInfo => {
      setSelf(userInfo) // Call asynchronously to change value
    })
  
    // Cleanup remote storage subscription
    return () => {
      UserStore.cancelListener(userID)
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