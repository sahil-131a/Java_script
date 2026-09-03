/*
 CONCEPT: ORDER SUMMARY — Complex HTML generation, dayjs, and interactive features
 - This module renders the checkout page's order summary section.
 - It demonstrates advanced patterns:
   1. Multiple imports from different modules
   2. Using a third-party library (dayjs) for date calculations
   3. Generating complex, nested HTML with template literals
   4. Nested functions for organizing code
   5. Event delegation with querySelectorAll + addEventListener
   6. Re-rendering pattern: update data → re-generate HTML → re-render
*/

import { cart , removeFromCart , updateDeliveryOption} from "../../data/cart.js";
import { products , getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

/*
 CONCEPT: IMPORTING THIRD-PARTY LIBRARIES AS ES MODULES
 - dayjs is a lightweight date manipulation library (alternative to Moment.js).
 - Imported directly from a CDN (Content Delivery Network) URL.
 - dayjs() creates a "today" date object with many useful methods.
*/
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
    let cartSummaryHTML = "";

    /*
     Loop through each item in the cart to generate its HTML.
     For each cart item, we need to:
     1. Find the matching PRODUCT (for name, image, price)
     2. Find the matching DELIVERY OPTION (for delivery date)
     3. Calculate the delivery date using dayjs
     4. Build the HTML string with all this data
    */
    cart.forEach((cartItem) => {

        let productId = cartItem.productId;

        // Look up the full product details using the product ID
        const matchingProduct = getProduct(productId);
         
        const deliveryOptionId = cartItem.deliveryOptionId;

        // Look up the delivery option details (days, price)
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        /*
         CONCEPT: dayjs — Date manipulation library
         - dayjs() → creates a date object for TODAY
         - .add(number, 'days') → adds days to the date (returns a new date)
         - .format('dddd, MMMM D') → formats the date as a readable string
           dddd = full day name (Monday), MMMM = full month (September), D = day number (3)
         - dayjs is IMMUTABLE: .add() returns a NEW date, doesn't modify the original.
        */
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 
            'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');

        /*
         Building complex HTML with template literals.
         CONCEPT: CSS class naming with js- prefix
         - Classes with 'js-' prefix are used for JavaScript targeting only.
         - Classes without 'js-' are for CSS styling only.
         - This convention prevents accidentally breaking styling when changing JS selectors.
         
         CONCEPT: data-* attributes for storing data on HTML elements
         - data-product-id="${matchingProduct.id}" stores the product ID on the delete button.
         - Accessed in JS via: element.dataset.productId
        */
        cartSummaryHTML += `
            <div class="cart-item-container 
            js-cart-item-container
            js-cart-item-container-${matchingProduct.id}"
            >
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity 
                    js-product-quantity-${matchingProduct.id}">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary 
                    js-delete-link js-delete-link-${matchingProduct.id}"
                    data-product-id = "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct , cartItem)}
                </div>
            </div>
            </div>
        `   
    });

    // Render all the cart items into the order summary container
    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    /*
     CONCEPT: NESTED HELPER FUNCTION
     - deliveryOptionsHTML() is defined INSIDE renderOrderSummary().
     - It can access the outer function's variables (closure).
     - This keeps related code together and prevents polluting the global scope.
     - It generates the radio buttons for choosing delivery speed.
    */
    function deliveryOptionsHTML(matchingProduct , cartItem ){
        let html = ''
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays , 
                'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');

            // Show "FREE" for $0, otherwise format the price
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

            // Check if this option is the currently selected one
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += 
            `
            <div class="delivery-option js-delivery-option"
            data-product-id = "${matchingProduct.id}"
            data-delivery-option-id = "${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString}
                </div>
                </div>
            </div>
            `   
        });
        return html; 
    }    


    /*
     CONCEPT: DELETE FUNCTIONALITY — DOM element removal
     - querySelectorAll('.js-delete-link') gets ALL delete links.
     - Each link has a data-product-id attribute storing which product to delete.
     - link.dataset.productId reads this attribute.
     - removeFromCart() removes it from the cart data array.
     - container.remove() removes the HTML element from the page (no full re-render needed!).
     - renderPaymentSummary() recalculates the payment totals.
    */
    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click' , () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();   // Remove the DOM element directly

                renderPaymentSummary();  // Recalculate totals
            })
        })

    /*
     CONCEPT: DELIVERY OPTION SELECTION — Destructuring dataset
     - element.dataset contains ALL data-* attributes as an object.
     - const {productId, deliveryOptionId} = element.dataset;
       This DESTRUCTURES the dataset to extract both values at once.
     - updateDeliveryOption() updates the cart data.
     - renderOrderSummary() re-renders the entire order summary (full re-render).
     - renderPaymentSummary() recalculates shipping costs.
    */
    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click' , () => {
                const {productId , deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId , deliveryOptionId);
                renderOrderSummary();       // Full re-render to update radio buttons
                renderPaymentSummary();     // Recalculate totals with new shipping
            });
        });
}


    