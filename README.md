# A simple, private, collaborative personal wiki.

We are using decentralization to provide independence and privacy to our financial transactions. Let's use decentralized technology to extend the same benefits to our ideas and information.

* Free and open source
* Realtime collaborative editing and storage via IPFS/web3.storage
* Encrypted against your web3 wallet.

## Privacy first: encrypted against your web3 wallet

We will use the user's crypto wallet (initially, metamask) for signon, and data encryption. The information stays as safe as it is in tokens in your wallet.

## Realtime collaborative editing and storage via IPFS/web3.storage

Via multisig encryption and shared public keys, we all users to edit the same data hosted via OrbitDb on IPFS. Hopefully, we are able to integrate web3.storage, and allow users to set up their own data storage: this is yet to be determined.

## Free and open source

To be truly decentralized, users need maintain ownership over not just their data, but the tools required to access it. 

Building a safe digital 'home' that people genuinely own, that is also able to interact with smart contracts, is going to be full of opportunities, and naturally, I have plans on where to take this after that (communication, collaboration, better management features), including monetization, but to start I want to build out a modest, useful tool to test the market and develop a user base. 

# Technologies

# UI

At point (Day Two :) ) The UI has had very least thought and investigation.

The UI will provide a the features and interactions of a microwiki, such as Tiddlywiki, Roam: 

https://tiddlywiki.com/
https://roamresearch.com/

Specifically: 

* An endless list of current editable text items with titles
* Search function, Current Items, And Navigation
* Markdown style editing
* Wiki style links embedded links

Additional front end features include: 

* Login/logout process via Metamask
* Purchase/connect to web3.storage
* Connect database to other wallets/user's wallets

Technologies:

* Draftjs is currently intended for the text editor
* Reactjs, Typescript, Cucumber-Jest

## Data

* IPFS/Orbitdb database

Each user has their own orbitDb, encrypted with their wallet(s) public keys. Data is stored as a graph, and contains the private keys and ipfs addresses of orbitDb instances shared with other users. Shared databases also store all the sharing user's public keys, so any user can update the shared encrypted data.

The custom graphStore may be spun off into its own repo, along with the encryption/decryption process: since both are potentially useful on their own.