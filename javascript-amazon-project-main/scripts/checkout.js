/*
 CONCEPT: PROMISES & Promise.all() — Managing multiple async operations
 - This file loads data from 2 sources (products + cart) before rendering the page.
 - We need BOTH to complete before we can render — Promise.all() handles this.
*/
import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js'
//import "../data/backend-practice.js"
import { loadCart } from "../data/cart.js";


/*
 CONCEPT: Promise.all() — Running multiple Promises in PARALLEL
 - Promise.all([promise1, promise2]) takes an ARRAY of promises.
 - It waits for ALL of them to complete, then runs .then().
 - If ANY promise fails, the entire Promise.all fails.
 - This is FASTER than loading one after another (sequential/chained),
   because both requests happen at the SAME TIME.

 HOW IT WORKS HERE:
 1. new Promise((resolve) => { ... }) wraps callback-based functions into promises.
 2. loadProducts() and loadCart() both use callbacks — we convert them to promises.
 3. Inside each promise, we call resolve() when the callback fires (data is loaded).
 4. Promise.all waits for BOTH to resolve, then calls .then() to render.
*/
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve();  // Signal: "products are loaded!"
        });
    }),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();  // Signal: "cart is loaded!"
        });
    })
]).then(() => {
    // This runs ONLY after BOTH products AND cart are fully loaded
    renderOrderSummary();
    renderPaymentSummary();
});


/*
 CONCEPT: SEQUENTIAL PROMISE CHAINING (Alternative approach — commented out)
 - This loads products FIRST, then cart SECOND (one after another).
 - .then() returns a new promise, allowing us to CHAIN more .then() calls.
 - 'return new Promise(...)' inside .then() passes the new promise to the next .then().
 - This is SLOWER than Promise.all because it doesn't run in parallel.
 - But it's useful when the second request DEPENDS on the first one's data.
*/
/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    })

}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/



/*
 CONCEPT: SIMPLE CALLBACK APPROACH (Oldest version — commented out)
 - Before learning Promises, we used nested callbacks.
 - loadProducts(callback) → callback runs after products load → render everything.
 - Problem: only loads products, doesn't load cart from backend.
 - Also, deeply nested callbacks create "callback hell" (hard to read).
 - Promises solve this by making async code look more linear and readable.
*/
/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/

