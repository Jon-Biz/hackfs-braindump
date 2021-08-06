
//   async generateKey() {
//     await this.ready

//     // pseudocryption
//     const val = Math.floor(100 * Math.random())

//     return {
//       publicKey: val
//     , privateKey: -val
//     }

//     // const keyPair =
//     //         await window.crypto.subtle
//     //                 .generateKey(
//     //                   {
//     //                     name: "AES-GCM",
//     //                     length: 256
//     //                   },
//     //                   true,
//     //                   ["encrypt", "decrypt"]
//     //                 )
//     //                 .then(keys => {
//     //                   debugger
//     //                 })

//       // console.log(keyPair)
//       // debugger
//       // return keyPair
//   }

//   async decrypt(ciphertext, key) {
//     await this.ready

//     const cipherArr = 
//             ciphertext.split(',')

//     const resultArr =
//             cipherArr
//               .map(
//                 charCode => {
//                               const num = Number.parseInt(charCode)
//                               const str = String.fromCharCode(num + key) 

//                               return str
//                             }
//               )

//     const result = resultArr.join('')

//     return JSON.parse(result)

//     // const decrypted = await window.crypto.subtle.decrypt(
//     //   {
//     //     name: "AES-GCM",
//     //     iv: iv
//     //   },
//     //   key,
//     //   ciphertext
//     // )
    
//     // const dec = new TextDecoder()

//     // return dec.decode(decrypted)
//   }


//   async encrypt(data, key) {
//     await this.ready

//     // const dataStr = JSON.stringify(data)
//     // const dataArr = dataStr.split('')

//     // const resultArr =
//     //         dataArr
//     //           .map(
//     //             char => `${char.charCodeAt(0)+key}`
//     //           )

//     // const result = resultArr.join()

//     // return result

//     // const enc     = new TextEncoder()
//     // const encoded = enc.encode(data)
    
//     // // The iv must never be reused with a given key.
//     // const iv = 
//     //         window.crypto
//     //           .getRandomValues(new Uint8Array(12))
    
//     // const ciphertext = 
//     //         await window.crypto.subtle.encrypt(
//     //                 { name: "AES-GCM"
//     //                 , iv: iv
//     //                 }
//     //               , key
//     //               , encoded
//     //               )
    
//     // return ciphertext
//   }

//   async generateKey() {
//     await this.ready

//     // pseudocryption
//     const val = Math.floor(100 * Math.random())

//     return {
//       publicKey: val
//     , privateKey: -val
//     }

//     // const keyPair =
//     //         await window.crypto.subtle
//     //                 .generateKey(
//     //                   {
//     //                     name: "AES-GCM",
//     //                     length: 256
//     //                   },
//     //                   true,
//     //                   ["encrypt", "decrypt"]
//     //                 )
//     //                 .then(keys => {
//     //                   debugger
//     //                 })

//       // console.log(keyPair)
//       // debugger
//       // return keyPair
//   }

//   async decrypt(ciphertext, key) {
//     await this.ready

//     const cipherArr = 
//             ciphertext.split(',')

//     const resultArr =
//             cipherArr
//               .map(
//                 charCode => {
//                               const num = Number.parseInt(charCode)
//                               const str = String.fromCharCode(num + key) 

//                               return str
//                             }
//               )

//     const result = resultArr.join('')

//     return JSON.parse(result)

//     // const decrypted = await window.crypto.subtle.decrypt(
//     //   {
//     //     name: "AES-GCM",
//     //     iv: iv
//     //   },
//     //   key,
//     //   ciphertext
//     // )
    
//     // const dec = new TextDecoder()

//     // return dec.decode(decrypted)
//   }


//   async encrypt(data, key) {
//     await this.ready

//     // const dataStr = JSON.stringify(data)
//     // const dataArr = dataStr.split('')

//     // const resultArr =
//     //         dataArr
//     //           .map(
//     //             char => `${char.charCodeAt(0)+key}`
//     //           )

//     // const result = resultArr.join()

//     // return result

//     // const enc     = new TextEncoder()
//     // const encoded = enc.encode(data)
    
//     // // The iv must never be reused with a given key.
//     // const iv = 
//     //         window.crypto
//     //           .getRandomValues(new Uint8Array(12))
    
//     // const ciphertext = 
//     //         await window.crypto.subtle.encrypt(
//     //                 { name: "AES-GCM"
//     //                 , iv: iv
//     //                 }
//     //               , key
//     //               , encoded
//     //               )
    
//     // return ciphertext
//   }
