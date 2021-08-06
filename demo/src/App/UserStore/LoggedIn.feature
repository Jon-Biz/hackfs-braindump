Feature: Local storage for user's IPFS identity

    We need to identify users when the log in, so we can connect them with their IPFS data from different wallets.

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
