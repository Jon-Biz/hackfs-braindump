import transcryptor from "./transcrypt"
import localStorage from 'local-storage'

let localStr = false
let localData = false
let ready = null

function accessLocalStorage (){
    try {
        localStr = localStorage('braindump')
    }
    catch (e) {
        console.error(e)

        return false
    }
} 

async function getUserIdentity() {
    // get local data
    accessLocalStorage()

    if (!localStr) setLoginIssue(`Failed to retrieve data`) 
    // check for ethereum wallet
    else if (!hasWeb3()) setLoginIssue('No web3')

    // check for data in local storage
    else if (!localDataExists()) setLoginIssue('No local data')

    // check for user identity                
    else if (!await transcryptor._getPublicKey()) setLoginIssue('No key')

    else if (!getIdentity()) setLoginIssue('No local user identity')

    // decrypt user identity
    else if (!decryptUserIdentity(getIdentity())) setLoginIssue('couldn\'t decrypt user Identity')

    return
} 

function setLoginIssue (error) {
    console.error(error)
}

const hasWeb3 = transcryptor.hasWeb3 

function localDataExists () { Boolean(localData) } 

function getIdentity () {
    const identity = 
            Object.entries(localData)
                    .reduce(findtUserIdentity, false)

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

transcryptor.getAccountId().then(id => { console.log(id) })

export default transcryptor.getAccountId