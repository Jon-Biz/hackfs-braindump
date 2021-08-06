import encryptUtil from './encryptUtil'
import Web3 from 'web3'; 

class Transcryptor {

  constructor() {
    this.ready = this._init()
  }
  
  async _init() {

    // Modern dapp browsers...
    if (window.ethereum) {
      this.web3Provider = window.ethereum

      try {
        // Request account access
        await window.ethereum.enable()

      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      this.web3Provider = 
        window.web3.currentProvider
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      this.web3Provider = 
        new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)
  }

  hasWeb3() {
    return window.ethereum || window.web3
  }

  async getAccountId() {
    await this.ready

    const web3 = this.web3

    const retreiveAccountId = 
            ( resolve
            , reject
              ) =>  web3.eth
                        .getAccounts(
                          ( error
                          , accounts 
                            ) => { if (!error) { resolve(accounts[0]) } 
                                   else { reject(error) }
                                  }
                        )
            
    return new Promise(retreiveAccountId)
  }   

  async getPublicKey() {
    await this.ready

    const account = await this.getAccountId()
    const web3 = this.web3

    const retreivePublicKeyP = 
            ( resolve
            , reject
              ) => {
                      const onResult =
                              ( error
                              , encryptionPublicKey
                                ) => { if (error) reject(error)
                                       else resolve(encryptionPublicKey)    
                                       }

                      const payload = {
                        jsonrpc: '2.0'
                      , method: 'eth_getEncryptionPublicKey'
                      , params: [account]
                      , from: account
                      }
                                  
                      web3.currentProvider.sendAsync(
                        payload                                
                      , onResult
                      )
                    }

    const getKeyP = 
            new Promise(retreivePublicKeyP)

    getKeyP.then(key => { this.encryptionPublicKey = key })

    return getKeyP
  }

  async encryptPublicKey(dataObj) {
    await this.ready

    if (!this.encryptionPublicKey) await this.getPublicKey()

    const data = JSON.stringify(dataObj)

    const encryptedData = 
            encryptUtil
              .encrypt(
                this.encryptionPublicKey
              , data
              )

    const encryptedMessage =
            this.web3.utils
              .asciiToHex(
                JSON.stringify(
                  encryptedData
                )
              )

    return encryptedMessage
  }

  async decryptPrivateKey(encryptedData) {
    await this.ready

    const web3 = this.web3

    const decryptDataP = 
            ( resolve
            , reject
              ) => {
                      web3.eth
                        .getAccounts(
                            ( error
                            , accounts
                              ) => {
                                    if (error) { console.log(error) }

                                    const [ account ] = accounts

                                    const payload = {
                                      jsonrpc: '2.0'
                                    , method: 'eth_decrypt'
                                    , params: [encryptedData, account]
                                    , from: account
                                    }

                                    const onResponse =
                                            ( error
                                            , dataObj
                                              ) => {
                                                      if (error) { reject(error)           }
                                                      else       { resolve(dataObj.result) }
                                                    }

                                    web3.currentProvider
                                      .sendAsync(
                                        payload
                                      , onResponse
                                      )
                                  }
                            )
                    }
    const dataP = 
            new Promise( decryptDataP )

    return dataP
  }
}

const transcryptor = new Transcryptor()
export default transcryptor
