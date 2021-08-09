Feature: Initialization

    Setup of identity and database.

Given a wallet
When I start the database
Then I should use the wallet's key to create the address.
And the address should be the same every time.
