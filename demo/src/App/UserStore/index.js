import IPFS from "ipfs"
import OrbitDB from "orbit-db"
import transcryptor from "./transcrypt"

// import getUserIdentity from "./getUserIdentity"

class UserStore {
    constructor() {
        this.ready = this.init()
    }

    async init() {
        // Create IPFS instance
        const ipfs = await IPFS.create({ repo: "./path-for-js-ipfs-repo" })
        this.orbitdb = await OrbitDB.createInstance(ipfs)
    }

    async openDB(id) {
        await this.ready
        // Create / Open a database
        const db = await this.orbitdb.log(id)
        await db.load()

        // Listen for updates from peers
        db.events
            .on( "replicated"
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

    async createUserData() {
        await this.ready

        const id = await transcryptor.getAccountId()

        this.db = await this.orbitdb.log(id)
        const address = this.db.address

        console.log({address})

        debugger
    }
}

const store = new UserStore()

store.createUserData()
export default store