/*
 CONCEPT: CART MODULE — ES6 Modules, localStorage, Data Management
 - This file manages the shopping cart data as a MODULE.
 - It EXPORTS functions and data for other files to use.
 - It keeps internal helpers (saveToStorage) PRIVATE by not exporting them.
 - This is called ENCAPSULATION: hiding internal details, exposing only what's needed.
*/

// 'export' makes this variable available to other files that import it
export let cart;

// Load cart data when the module first runs
loadFromStorage();

/*
 CONCEPT: loadFromStorage() — Loading persisted data
 - Tries to load cart from localStorage (browser storage that survives page refreshes).
 - JSON.parse() converts the stored JSON string back into a JavaScript array.
 - If nothing is stored (first visit), localStorage returns null → JSON.parse(null) = null.
 - The if(!cart) check provides DEFAULT DATA when localStorage is empty.
 - This function is exported because tests need to call it to reset state.
*/
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart = [{
      productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity : 2,
      deliveryOptionId: '2'
    },
    {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '1'
    }];
  }
}

/*
 saveToStorage() — Saves the cart to localStorage.
 NOT exported → it's a PRIVATE helper function (only used inside this module).
 CONCEPT: Encapsulation — hide implementation details, expose only the public API.
 Other modules call addToCart(), removeFromCart() etc. — they don't need to know
 about localStorage directly.
*/
function saveToStorage(){
  localStorage.setItem('cart' , JSON.stringify(cart));
}

/*
 addToCart(productId) — Adds a product to the cart or increments its quantity.
 CONCEPT: Search-then-update pattern
 1. Loop through cart to find if the product already exists (matching productId).
 2. If found → increment the quantity (don't add a duplicate).
 3. If NOT found → push a new cart item object with quantity 1.
 4. Save to localStorage after any change.
*/
export function addToCart(productId){
  let matchingItem;

  // Search for an existing cart item with the same productId
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;    // Found a match — store the reference
    }
  });

  if(matchingItem){
    matchingItem.quantity += 1;   // Product already in cart → just increase quantity
  }
  else{
    cart.push({                   // New product → add to cart with quantity 1
      productId : productId,
      quantity: 1,
      deliveryOptionId: '1'       // Default delivery option
    });
  }
  saveToStorage();
}

/*
 removeFromCart(productId) — Removes a product from the cart.
 CONCEPT: FILTERING BY CREATING A NEW ARRAY
 - Instead of modifying the original array (which can cause bugs),
   we create a NEW array with only the items we want to keep.
 - This is a "non-destructive" approach — push items that DON'T match the ID.
 - Then replace the old cart with the new filtered array.
*/
export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);     // Keep items that are NOT being removed
    }
  });
  cart = newCart;                  // Replace old cart with filtered cart

  saveToStorage();
}

/*
 updateDeliveryOption(productId, deliveryOptionId) — Changes the delivery speed.
 - Finds the matching cart item and updates its deliveryOptionId.
 - Uses the same search pattern as addToCart().
*/
export function updateDeliveryOption(productId , deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

/*
 CONCEPT: XMLHttpRequest (XHR) — Making HTTP requests to a backend
 - XMLHttpRequest is the OLD way to fetch data from a server.
 - Steps: create XHR object → add event listener → open connection → send request.
 - xhr.addEventListener('load', callback) → runs the callback when the response arrives.
 - xhr.open('GET', url) → prepares a GET request to the URL.
 - xhr.send() → actually sends the request.
 - This is ASYNCHRONOUS — the code after xhr.send() runs immediately,
   the callback runs later when the server responds.
 - The 'fun' parameter is a callback that gets called after the data loads,
   so the caller can do something after loading is complete.
*/
export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load' , () => {
    console.log(xhr.response);   // Log the raw response from the server
    fun();                        // Call the callback to signal "loading is done"
  })

  xhr.open('GET' , 'https://supersimplebackend.dev/cart');
  xhr.send();
  
}