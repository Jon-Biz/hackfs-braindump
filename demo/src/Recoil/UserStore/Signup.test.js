const { defineFeature, loadFeature } = require('jest-cucumber')

const feature = loadFeature('./src/App/UserStore/Signup.feature')

defineFeature(feature, test => {
    test('When a user signs up, we need to set up their storage and root identity', ({ given, when, then, and }) => {
        given('a user', () => {

        });

        when('they click the sign up button', () => {

        });

        when('they indicate that they want to connect to an existing account', () => {

        });

        then('we should ask for their root identity', () => {

        });

        when('they indicate they want to sign up', () => {

        });

        then('we should create their root identity', () => {

        });

        when('we create or they submit their root identity', () => {

        });

        then('we should add it to local storage', () => {

        });

        and('we should have encrypted their root data with their public key', () => {

        });

        and('we should have encrypted their walletId with their wallet', () => {

        });

        and('we should set up their root data in the db', () => {
            expect('unwritten code').toBe('code')
        });
    });
})