import {
    atom,
    selector,
    DefaultValue
  } from 'recoil';
  
import {
    ContentState,
  EditorState
} from 'draft-js'

let item = { itemText: 'h' }

async function getItem() { return item.itemText }
async function setItem(value) { item.itemText = value }
async function onChange(uid, cb) { setInterval( async () => {
    setItem(item.itemText + item.itemText)
    const val = await getItem()
    console.log({val})
    cb(val)
}, 5000)} 

const syncStorageEffect = userID => ({setSelf, trigger, onSet}) => {



    // Initialize atom value to the remote storage state
    if (trigger === 'get') { // Avoid expensive initialization
      setSelf(getItem(userID)); // Call synchronously to initialize
    }

    onSet(newValue => {
        setItem(newValue);
    });

  
    // Subscribe to remote storage changes and update the atom value
    onChange(userID, userInfo => {
      setSelf(userInfo); // Call asynchronously to change value
    });
  
    // // Cleanup remote storage subscription
    // return () => {
    //   onChange(userID, null);
    // };
  };
  
// const storageEffect = key => ({setSelf, onSet}) => {

//     let item = { itemText: 'hello world' }

//     async function getItem() { return item }
//     async function setItem(value) { item = value }

//     setSelf(
//         getItem(key).then(savedValue =>
            
//       (savedValue != null)
//         ? savedValue.itemText
//         : new DefaultValue() // Abort initialization if no value was stored
//     ));
  
//     onSet(newValue => {
//       setItem(key, newValue);
//     });
//   };
  
  const itemText = atom({
    key: 'itemText',
    default: EditorState.createEmpty(),
    effects_UNSTABLE: [
      syncStorageEffect('current_user'),
    ]
  });

  
const itemEditor = selector({
    key: 'itemEditor', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
        const text = get(itemText)

        const contentState = ContentState.createFromText(text)
        const editorState = EditorState.createWithContent(contentState)

        return editorState
    }
  })

export default itemText