Feature: Local storage for user's IPFS identity

    We need to identify users when the log in, so we can connect them with their IPFS data from different wallets.

Scenarios: A user signs up
Scenario: When a user signs up, we need to set up their storage and root identity

Given a user
When they click the sign up button
    When they have indicated that they want to connect to an existing account
        Then we should ask for their root identity
    When they indicate they want to sign up
        Then we should create their root identity

    When we create or they submit their root identity
        Then we should add it to local storage
        And we should have encrypted their root data with their public key
        And we should have encrypted their walletId with their wallet
        And we should set up their root data in the db
