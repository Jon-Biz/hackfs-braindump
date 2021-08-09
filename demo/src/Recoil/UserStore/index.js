import IPFS from "ipfs"
import OrbitDB from "orbit-db"
import transcryptor from "./transcrypt"
import GraphStore from './orbit-db-graphstore/GraphStore'
import Identities from "orbit-db-identity-provider";
import { ethers } from "ethers";

import IpfsClient from 'ipfs-http-client'

import {
    useRecoilState,
} from 'recoil';

// Create IPFS instance
// const initIPFSInstance = async () => {
//   return await IPFS.create({ repo: "./path-for-js-ipfs-repo" });
// };

// const orbitdb = await OrbitDB.createInstance(ipfs);

// import getUserIdentity from "./getUserIdentity"
OrbitDB.addDatabaseType(GraphStore.type, GraphStore)

class UserStore {
    constructor() {
        this.ready = this.init()
        this.val = 'hello world'
    }

    async getItem() { return this.val }
    async setItem(val) { this.val = val }
    async onChange(uid, cb) { 
        setInterval( async () => {
            this.setItem(this.val + this.val)
            const val = await this.getItem()
            console.log({val})
            cb(val)
        }, 5000)
    } 

    async init() {
        // Create IPFS instance
        // const ipfs = IpfsClient(IPFS)
        const ipfs = await IPFS.create({ repo: "./development" })
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const wallet = provider.getSigner();

        // const identity = await Identities.createIdentity({
        //     type: "ethereum",
        //     wallet,
        // })
        this.orbitdb = await OrbitDB.createInstance(ipfs)
        this.address = "0x912F479c8E25DE77e77b467712144488f2C314a6"

        console.log(this.orbitdb.address)
        // this.address = await this.orbitdb.determineAddress('user.posts', 'eventlog', {
        //     accessController: {
        //       write: [
        //         identity.address
        //     ]}
        //   })

        // console.log(this.address)
        // debugger

    }

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

    async loadUserDb() {
        await this.ready

        // const id = await transcryptor.getAccountId()

        this.db = await this.orbitdb.open(this.address, { type: GraphStore.type, create: true })
        await this.db.load()
        this.db.createVertex('root', '{ "id": "root" }')
        
        this.addReplicationListener()
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