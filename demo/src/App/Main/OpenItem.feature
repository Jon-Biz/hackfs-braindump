Feature: Creating and editing items

    The primary interaction mode of the application is to create and edit items.

Scenario: A user creates a new item
Given A logged in user
When the user clicks the "New Item" button
Then a new item is created and appears in the current items list

