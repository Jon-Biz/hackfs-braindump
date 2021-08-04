import ls from 'local-storage'
import transcryptor from './transcryptor'

// We check for the user's key in local storage
// Users's keys are stored as key:value pairs.
// The key is encrypted with user's private key, the value is encrypted with their public key
// We attempt to decrypt each user key with the user's public key.
// If we find a match, then we decrypt the value with the user's private key.
// The value of the key value pair is the cid of the wallet's root IPFS node.
function getBrainDumpKeys() {
    const keys = ls.get('brainDumpApp')

    if (!keys) return false
    else return keys
}

function initUser() {
    // get keys from local storage
    const keys = getBrainDumpKeys()

    // if there are no keys, 
    if (!keys) {

    }
    // if there are keys, then check for the user's key
    else {
        const userId = 
                keys.reduce(
                    ( prev
                    , curr
                     ) => {
                            if (prev) return prev

                            const nextKey = transcryptor.decryptPublicKey(curr)

                            if (nextKey) return nextKey
                            else return false
                           }
                , false
                )

        if (userId) {
            // if userId exists, then login with that userId
            
        }
        else {

        }
    }
}

export default initUser