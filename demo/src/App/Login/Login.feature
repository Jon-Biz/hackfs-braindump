Feature: Local storage for user's IPFS identity

    We need to identify users when the log in, so we can connect them with their IPFS data from different wallets.

Scenario: A user logs in

Scenario Outline: When a user logs in, we need to check for their capabilities and identity, and retreive their root identity if they have one.

Given a user
When they load the page
    When they have window.ethereum or window.web3
        And they have a wallet
            Then we should ask for their public key
            When they give us their public key
                Then we should check local storage for an id decryptable with their public key
                When we find an id decryptable with their public key
                    Then we should decrypt their root data with their wallet
                When we don't find a decryptable id
                    Then we should let them know so they can sign up
            When they refuse to give us their public key
                Then we should let them know they refused to give us their public key
        When they don't have a wallet
            Then we should let them know that they need a wallet
    When they don't have window.ethereum or window.web3
        Then we should let them know that they need web3 or ethereum

Scenarios: A user signs up
Scenario: When a user signs up, we need to set up their storage and root identity

Given a user
When they click the sign up button
    When they indicate that they want to connect to an existing account
        Then we should ask for their root identity
    When they indicate they want to sign up
        Then we should create their root identity
    When we create or they submit their root identity
        Then we should add it to local storage
        And we should have encrypted their root data with their public key
        And we should have encrypted their walletId with their wallet
        And we should set up their root data in the db

Scenario: A user has signed in

Scenario Outline: When a user has signed in, we show the main page

Given A user
When  they have signed in
    Then we should show the main page
    When they have no previously opened items
        Then we should show an empty list
    When they have previously opened items  
        Then we should show the items
    When they click 'new item'
        Then we should show an empty item

# Scenario: A user wants to add another wallet

# Scenario: A user logs out
# Scenario: A user adds their own storage ID
