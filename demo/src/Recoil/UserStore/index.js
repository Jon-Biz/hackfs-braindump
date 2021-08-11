import IPFS from "ipfs"
import OrbitDB from "orbit-db"
// import transcryptor from "./transcrypt"
import GraphStore from './orbit-db-graphstore/GraphStore'
import Identities from "orbit-db-identity-provider";
import { ethers } from "ethers";

// const orbitdb = await OrbitDB.createInstance(ipfs);

// import getUserIdentity from "./getUserIdentity"
OrbitDB.addDatabaseType(GraphStore.type, GraphStore)

class UserStore {
    constructor() {
        this.ready = this.init()
    }

    async getItem() { 
        await this.ready

        let root = this.db.getVertex('doot')
     
        debugger
        if (!root) {
            root = '{ "id": "root", "text": "hello world" }'
            this.db.createVertex('doot', root)
        }

        return JSON.parse(root).text || ''
    }

    async setItem(val) {
        await this.ready

        const rootStr = this.db.getVertex('doot')
        const root = JSON.parse(rootStr)

        root.text = val

        const updatedRoot = JSON.stringify(root)
        this.db.updateVertex('doot', updatedRoot)

        const item = await this.getItem()
        console.log(item)
        console.log(this.db.allVertices())
    }

    async onChange(uid, cb) { 
        // setInterval( async () => {
        //     this.setItem(this.val + this.val)
        //     const val = await this.getItem()
        //     console.log({val})
        //     cb(val)
        // }, 5000)
    } 
    // s {root: "zdpuAxrk5koF1NE3Rrir2wAPYXgTYHq71wcnhhNsPxgBCrijJ", path: "0x912F479c8E25DE77e77b467712144488f2C314a6"}
    async init() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const wallet = provider.getSigner();
        const identity = await Identities.createIdentity({
          type: "ethereum",
          wallet,
        });
        
        debugger
        // Create IPFS instance
        // const ipfs = IpfsClient(IPFS)
        const ipfs = await IPFS.create({ repo: "./development3" })
        this.orbitdb = await OrbitDB.createInstance(ipfs, { identity })
        // this.address = '/orbitdb/zdpuAxrk5koF1NE3Rrir2wAPYXgTYHq71wcnhhNsPxgBCrijJ/0x912F479c8E25DE77e77b467712144488f2C314a6'

        const add = await this.orbitdb.determineAddress('woot', GraphStore.type, { accessController: {
            write: [
                identity.id
          ]
        }
        }
          )
          
          console.log('0x912F479c8E25DE77e77b467712144488f2C314a6')
          console.log(add.toString())

          debugger
        // const id = await transcryptor.getAccountId()

        this.db = await this.orbitdb.open(add.toString(), { type: GraphStore.type, create: true, accessController: {
            write: [
                identity.address
          ]
        }})

        await this.db.access.grant('write', identity.address)
        

        this.ready = true

        console.log(this.db.address.toString())
        await this.db.load()
        // this.db.createVertex('root', '{ "id": "root" }')
        console.log(this.db.allVertices())
        
        this.addReplicationListener()
    }

    async loadUserDb() {
    }

    cancelListener() {}

    async openDB(id) {
        await this.ready

        // Create / Open a database
        const db = await this.orbitdb.log(id)
        await db.load()

        // Listen for updates from peers
        db.events
            .on("replicated"
                , address => {
                                console.log(
                                    db.iterator({ limit: -1 })
                                        .collect()
                                )
                             }
            )

        // Add an entry
        const hash = await db.add("world")
        console.log(hash)

        // Query
        const result = db.iterator({ limit: -1 }).collect()
        console.log(JSON.stringify(result, null, 2))
    }

    async closeDB(id) {
        await this.ready

        const db = await this.orbitdb.log(id)

        db.close()
    }

    async openUserData() {
        await this.ready

        // const id = getUserIdentity()

        // this.db = await this.orbitdb.log(id)

    }


    async setData(data) {
        await this.ready

        debugger
    }

    addReplicationListener() {
        // Listen for updates from peers
        this.db.events
               .on("replicated"
                  , address => {
                                  console.log('replicated', address)
                                    console.log(
                                        this.db.iterator({ limit: -1 })
                                            .collect()
                                    )
                                }
            )

    }
}

const store = new UserStore()

store.loadUserDb()
export default store

// async init() {
//     // Create IPFS instance
//     // const ipfs = IpfsClient(IPFS)
//     const ipfs = await IPFS.create({ repo: "./development" })
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     // const wallet = provider.getSigner();

//     // const identity = await Identities.createIdentity({
//     //     type: "ethereum",
//     //     wallet,
//     // })
//     this.orbitdb = await OrbitDB.createInstance(ipfs)
//     // this.address = "0x912F479c8E25DE77e77b467712144488f2C314a6"

//     console.log(this.orbitdb.address)
//     this.loadUserDb()
//     // this.address = await this.orbitdb.determineAddress('user.posts', 'eventlog', {
//     //     accessController: {
//     //       write: [
//     //         identity.address
//     //     ]}
//     //   })

//     // console.log(this.address)
//     // debugger

// }
