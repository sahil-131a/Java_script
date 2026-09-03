/*
 CONCEPT: PAYMENT SUMMARY — Computing totals and rendering dynamic HTML
 - This module calculates all the financial totals for the checkout page:
   product prices, shipping costs, tax, and the final order total.
 - Demonstrates the ACCUMULATOR PATTERN: start at 0, loop through data, add up values.
*/

import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    /*
     CONCEPT: ACCUMULATOR PATTERN — Computing totals with forEach
     - Start with variables at 0.
     - Loop through each cart item.
     - For each item, look up the product price and delivery cost.
     - Add to the running totals.
     - This pattern works for: summing prices, counting items, totaling quantities, etc.
    */
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let productsQuantity = 0;

    cart.forEach((cartItem) => {
        // Look up the full product to get its price
        const product = getProduct(cartItem.productId);

        // Total price = price per unit × quantity
        productPriceCents += product.priceCents * cartItem.quantity;
        productsQuantity += cartItem.quantity;

        // Look up the delivery option to get the shipping cost
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents
    });

    // Calculate derived values
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;   // 10% tax rate
    const totalCents = totalBeforeTaxCents + taxCents;

    /*
     Generate the payment summary HTML.
     formatCurrency() converts cents to dollars (e.g., 2095 → "20.95").
     All calculations are done in CENTS to avoid floating-point issues,
     and only converted to dollars at the DISPLAY level.
    */
    const paymentSummary = 
    `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${productsQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>   
    `

    // Render the payment summary HTML into its container
    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummary;
}