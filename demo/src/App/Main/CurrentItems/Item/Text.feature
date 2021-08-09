Feature: Text editor should retreive and set the text content

    The text editor should be able to set and get the text content of the item. It should retreive the content at the start, and update the content as it is changed.

Given a text editor
When it is loaded
Then it should request the content of the item
When it receives the content of the item
Then it should set the content of the item

Given a text editor
When the text content is changed
Then it should update the database

