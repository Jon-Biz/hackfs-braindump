Feature: Persistence

    The database should persist on ipfs, across machines.

Given a database and an ipfs daemon
When I start the database and daemon
When I add a pinned file to the database
When I stop the database
And start the database with the same address but another local store
Then the database should replicate from ipfs

