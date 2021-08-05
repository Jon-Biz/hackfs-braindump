import transcryptor from "../transcrypt"
import localStorage from 'local-storage'


let localData = false
let ready = null

function init (){
    try {
        const localStr = localStorage.getItem('braindump')
        localData = JSON.parse(localStr)

        ready = transcryptor._getPublicKey()
    }
    catch (e) {
        console.error(e)
        setLoginIssue(`Failed to retrieve data, ${e}`)
    }
} 

async function getUserIdentity() { 
    // check for ethereum wallet
    if (!UserStore.hasWeb3()) setLoginIssue('No web3')

    // check for data in local storage
    if (!localDataExists()) setLoginIssue('No local data')

    // check for user identity                
    const hasKey = await transcryptor._getPublicKey()
    if (!hasKey) setLoginIssue('No key')

    // get user identity
    const indentity = getIdentity()
    if (!indentity) setLoginIssue('No local user identity')

    // decrypt user identity
    const decrypted = decryptUserIdentity(indentity)
    if (!decrypted) setLoginIssue('couldn\'t decrypt user Identity')

    return decrypted
} 

function setLoginIssue (error) {
        console.error(error)
    }
}


const hasWeb3 = transcryptor.hasWeb3 

function localDataExists () { Boolean(localData) } 

function getIdentity () {
    const identity = 
            Object.entries(localData)
                    .reduce(UserStore.findtUserIdentity, false)

    return identity
} 

function setIdentity (identity) {
} 

function hasWallet () {} 

function findtUserIdentity( result, identity ) {
    if (result) return result

    const [ id, cid  ] = identity.split('')
    const decrypted = transcryptor.decryptPublicKey(id)

    if (!decrypted)  return false
    else return cid
} 

function decryptUserIdentity(identity) {
    try {
        const decryptedIdentity = transcryptor.decryptPrivateKey( identity )
        return decryptedIdentity
    }
    catch (e) {
        console.error(e)
    }                
} 

export default getUserIdentity