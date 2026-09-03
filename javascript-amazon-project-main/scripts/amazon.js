/*
 CONCEPT: ES6 MODULES — import/export
 - Modules let you split your code into separate files and share code between them.
 - 'import { name } from "./file.js"' → imports specific NAMED exports from another file.
 - 'export' keyword in the source file makes variables/functions available to other files.
 - Modules have their OWN scope — variables are NOT global (unlike regular <script> tags).
 - To use modules in HTML, add type="module" to the <script> tag.
 - Benefits: organized code, no naming conflicts, clear dependencies.
*/
import { cart , addToCart} from "../data/cart.js";
import { products , loadProducts} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

/*
 CONCEPT: CALLBACK PATTERN FOR ASYNCHRONOUS DATA LOADING
 - loadProducts() fetches product data from a backend server (async operation).
 - We pass renderProductsGrid as a CALLBACK — it gets called AFTER data is loaded.
 - This ensures we don't try to render products before the data is available.
 - Pattern: loadData(callbackFunction) → data loads → callbackFunction() is called.
 - This is the foundation of async JavaScript: "do this, and WHEN it's done, call this."
*/
loadProducts(renderProductsGrid);

function renderProductsGrid(){

  /*
   CONCEPT: GENERATING HTML FROM DATA (Data-Driven Rendering)
   - Start with an empty string, loop through data, build HTML for each item.
   - Template literals create complex multi-line HTML with embedded expressions.
   - This is the same "Data → HTML → DOM" pattern from the Todo List, but at scale.
  */
  let productsHTML = ""

  products.forEach((product) => {
      productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src= "${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <!--
             CONCEPT: DATA ATTRIBUTES (data-*)
             - data-product-id="${product.id}" stores the product ID on the HTML element.
             - 'data-*' attributes let you attach custom data to HTML elements.
             - Access them in JS with: element.dataset.productId
             - JS automatically converts kebab-case (product-id) to camelCase (productId).
             - This lets each button "know" which product it belongs to.
            -->
            <button class="add-to-cart-button button-primary 
            js-add-to-cart-button" 
            data-product-id = "${product.id}">
              Add to Cart
            </button>
          </div>     
      
      `
  });


  // Render all the product HTML into the products grid container
  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;


  /*
   updateCartQuantity() — calculates the TOTAL quantity across all cart items.
   CONCEPT: ACCUMULATOR PATTERN with forEach
   - Start with 0, loop through cart items, add each item's quantity.
   - This gives us the total number of items in the cart (for the cart badge).
  */
  function updateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  /*
   CONCEPT: querySelectorAll + addEventListener + dataset
   - querySelectorAll gets ALL "Add to Cart" buttons.
   - forEach loops through each one to attach a click listener.
   - button.dataset.productId reads the data-product-id attribute.
   - addToCart(productId) adds the product to the cart array.
   - updateCartQuantity() refreshes the cart count display.
  */
  document.querySelectorAll('.js-add-to-cart-button')
    .forEach((button) => {
      button.addEventListener('click' , () => {
        const productId = button.dataset.productId;  // Read the data attribute
        addToCart(productId);
        updateCartQuantity();
      });
    });   
}    