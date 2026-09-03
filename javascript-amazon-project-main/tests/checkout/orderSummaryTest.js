/*
 CONCEPT: INTEGRATION TESTING & DOM TESTING WITH JASMINE
 - This file tests the renderOrderSummary() function — a complex function that:
   1. Reads cart data
   2. Generates HTML
   3. Inserts it into the DOM
   4. Attaches event listeners
 - This is an INTEGRATION TEST: it tests multiple parts working together
   (cart data + product data + DOM rendering + event handling).

 KEY CONCEPTS:
 - beforeAll() → runs ONCE before ALL tests in the suite (used for async data loading)
 - beforeEach() → runs before EACH individual test (used for setup/reset)
 - afterEach() → runs after EACH individual test (used for cleanup)
 - These hooks ensure each test starts with a CLEAN, PREDICTABLE state.
*/

import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage , cart} from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";


describe("test suite : renderOrderSummary" , () => {
    // Use constants for product IDs to avoid typos and make tests more readable
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    /*
     CONCEPT: beforeAll() with async loading and done()
     - beforeAll runs ONCE before all tests in this describe block.
     - loadProducts() is ASYNCHRONOUS — it fetches data from a server.
     - The 'done' parameter is a CALLBACK that tells Jasmine "async work is finished".
     - Jasmine waits until done() is called before running any tests.
     - Without done(), tests would run before products are loaded → failures!
    */
    beforeAll((done) => {
        loadProducts(() => {
            done();    // Signal: "products are loaded, you can start running tests now"
        });
    });

    /*
     CONCEPT: afterEach() — Cleanup after each test
     - Clears the test container's HTML so tests don't interfere with each other.
     - Each test gets a FRESH DOM state.
    */
    afterEach( () => {
        document.querySelector('.js-test-container')
            .innerHTML = "";
    })

    /*
     CONCEPT: beforeEach() — Setup before each test
     - Runs before EVERY test, ensuring consistent starting conditions.
     - Steps:
       1. Spy on localStorage to prevent actual storage access
       2. Create the required DOM elements (containers that renderOrderSummary needs)
       3. Set up fake cart data via spyOn + callFake
       4. Load the fake data and render the order summary
    */
    beforeEach( () => {
        // Prevent actual localStorage writes
        spyOn(localStorage , "setItem");

        // Create the DOM structure that renderOrderSummary() expects to find
        document.querySelector('.js-test-container')
            .innerHTML =
            `<div class = "js-order-summary"></div>
             <div class = "js-payment-summary"></div>               
            `

        // Provide fake cart data with 2 products
        spyOn(localStorage , "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                productId : productId1,
                quantity : 2,
                deliveryOptionId: '2'
                },
                {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '1'
                }
            ]);
        });

        // Load the fake cart data
        loadFromStorage();
        
        // Render the order summary with the fake data
        renderOrderSummary();
    })

    /*
     Test 1: Verify that the correct number of cart items are displayed
     CONCEPT: DOM TESTING — using querySelector to verify rendered output
     - querySelectorAll returns ALL matching elements → .length tells us how many.
     - .innerText reads the visible text content of an element.
     - .toContain() checks if the string INCLUDES the expected text (partial match).
    */
    it("display the cart" , () => {
        // Should render 2 cart item containers (one for each product)
        expect(
            document.querySelectorAll(".js-cart-item-container").length
        ).toEqual(2);

        // First product should show "Quantity: 2"
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        // Second product should show "Quantity: 1"
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        
    });

    /*
     Test 2: Verify that clicking "Delete" removes a product
     CONCEPT: SIMULATING USER INTERACTIONS IN TESTS
     - .click() programmatically simulates a mouse click on an element.
     - After clicking delete, we verify:
       1. The DOM element is removed (only 1 container left)
       2. The specific product's container is gone (returns null)
       3. The other product's container still exists
       4. The cart array has 1 item left
       5. The remaining item is the correct product
    */
    it("removes a product" , () => {
        // Simulate clicking the delete button for product 1
        document.querySelector(`.js-delete-link-${productId1}`).click();

        // Verify: only 1 cart item container remains
        expect(
            document.querySelectorAll(".js-cart-item-container").length
        ).toEqual(1);

        // Verify: product 1's container is completely removed from the DOM
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);    // null means the element doesn't exist

        // Verify: product 2's container still exists
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);   // .not flips the assertion — checks it's NOT null
        
        // Verify: the cart data array also reflects the deletion
        expect(cart.length).toEqual(1);
        
        // Verify: the remaining item is product 2
        expect(cart[0].productId).toEqual(productId2);
    })
});