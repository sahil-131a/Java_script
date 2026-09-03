/*
 CONCEPT: TESTING WITH MOCKS & SPIES (Jasmine)
 - This file tests the addToCart function using Jasmine's advanced features.
 - CHALLENGE: addToCart() uses localStorage internally — but we don't want tests
   to depend on actual browser storage (it would make tests unpredictable).
 - SOLUTION: Use spyOn() to REPLACE localStorage methods with fake versions.

 KEY JASMINE FEATURES:
 - spyOn(object, 'method') → REPLACES a method with a SPY (fake version).
   The spy tracks: was it called? how many times? with what arguments?
 - .and.callFake(fakeFunction) → makes the spy call a custom function instead.
   Used here to return fake cart data instead of reading from actual localStorage.
 - .toHaveBeenCalledTimes(n) → checks that the spy was called exactly n times.
 - loadFromStorage() is called inside each test to reset the cart state
   using the fake localStorage data (provided by the spy).
*/

import { addToCart , cart  , loadFromStorage} from "../../data/cart.js";


// Test Suite for the addToCart function
describe("test suite : addToCart" , () => {

    // Test 1: Adding a product that ALREADY EXISTS in the cart
    it("adds an existing product to the cart" , () => {
        /*
         spyOn(localStorage, "setItem") → replaces localStorage.setItem with a spy.
         This PREVENTS actual writes to localStorage during tests.
         The spy does nothing (just records that it was called).
        */
        spyOn(localStorage , "setItem");

        /*
         spyOn(localStorage, "getItem").and.callFake(() => {...})
         - Replaces localStorage.getItem with a FAKE function.
         - Instead of reading from actual storage, it returns our TEST DATA.
         - This gives us FULL CONTROL over the initial cart state.
         - We set up a cart with 1 item (quantity: 1).
        */
        spyOn(localStorage , "getItem").and.callFake(() => {
            return JSON.stringify([{
                productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        // Reset cart state using the fake data
        loadFromStorage();

        // Add the SAME product again — should increment quantity, not add a duplicate
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")

        // ASSERTIONS: verify the expected outcome
        expect(cart.length).toEqual(1);      // Still 1 item (not duplicated)
        expect(cart[0].quantity).toEqual(2);  // Quantity increased from 1 → 2

    });

    // Test 2: Adding a product that is NOT in the cart yet
    it("adds a new product to the cart" , () => {
        spyOn(localStorage , "setItem");

        // Start with an EMPTY cart
        spyOn(localStorage , "getItem").and.callFake(() => {
            return JSON.stringify([]);   // Empty array = empty cart
        });

        loadFromStorage();

        // Add a new product to the empty cart
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        expect(cart.length).toEqual(1);   // Now has 1 item

        /*
         .toHaveBeenCalledTimes(1) checks that localStorage.setItem was called exactly once.
         This verifies that addToCart() saves to storage after adding.
         We can check this because spyOn tracks all calls to the spy.
        */
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })
})