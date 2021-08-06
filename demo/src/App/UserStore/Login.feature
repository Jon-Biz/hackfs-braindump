Feature: Local storage for user's IPFS identity

    We need to identify users when the log in, so we can connect them with their IPFS data from different wallets.

Scenario: A user logs in

Scenario Outline: When a user logs in, we need to check for their capabilities and identity, and retreive their root identity if they have one.

Given a user
When they load the page
    When they have window.ethereum or window.web3
        Then we should check for a wallet
        When they don't have a wallet
            Then we should let them know that they need a wallet
        When they have a wallet
            Then we should check for data in local storage
            When there is no data in local storage
                Then we should let them know that they need to sign up
            When there is data that might be their in local storage
                Then we should ask for their public key
                When they refuse to give us their public key
                    Then we should let them know they refused to give us their public key
                When they give us their public key
                    Then we should check local storage for an id decryptable with their public key
                    When we find an id decryptable with their public key
                        Then we should decrypt their root data with their wallet
                    When we don't find a decryptable id
                        Then we should let them know so they can sign up
    When they don't have window.ethereum or window.web3
        Then we should let them know that they need web3 or ethereum

# Scenario: A user wants to add another wallet

# Scenario: A user logs out
# Scenario: A user adds their own storage ID
