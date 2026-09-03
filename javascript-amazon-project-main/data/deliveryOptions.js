/*
 CONCEPT: EXPORTING DATA & HELPER FUNCTIONS
 - This module exports the delivery options data and a helper function.
 - The data is an array of objects — each represents a delivery speed/price tier.
 - priceCents stores prices in CENTS (not dollars) to avoid floating-point precision issues.
   Example: $4.99 is stored as 499 cents. This is a common pattern in e-commerce.
*/

// Array of delivery option objects — exported so other modules can access them
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,     // Free shipping — takes 7 days
    priceCents: 0
},
{
    id: '2',
    deliveryDays: 3,     // $4.99 shipping — takes 3 days
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,     // $9.99 shipping — takes 1 day
    priceCents: 999
}]

/*
 getDeliveryOption(deliveryOptionId) — finds a delivery option by its ID.
 - Loops through the options array to find a match.
 - Returns the matching option, OR the FIRST option as a default (using ||).
 - The || fallback pattern: if deliveryOption is undefined (no match found),
   || returns deliveryOptions[0] as a safe default.
 - This prevents crashes when an invalid delivery option ID is passed.
*/
export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if(option.id == deliveryOptionId){   // Note: using == (loose equality) here
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];   // Default to first option if not found

}