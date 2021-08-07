Feature: Sync to and from IPFS
    Our databases need to synch too and from IPFS without other orbitdb instances

Scenario: A db creates a db, ipfs stays online, other db syncs from ipfs

Given a orbitdb instance
When it creates a database
When it goes offline but ipfs stays online
When another db is created
And provided the manifest address of the previous database
Then it should replicate from ipfs

Scenario: A db retrieves a manifest via IPNS and replicae from ipfs

Given an orbitdb instance
Given a manifest address
When it retrieves the manifest
Then it should replicate from ipfs



