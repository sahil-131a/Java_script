/*
 CONCEPT: CLASS INHERITANCE, POLYMORPHISM, FETCH API, XMLHttpRequest
 - This file demonstrates advanced OOP concepts:
   1. Class declarations with methods
   2. Inheritance with 'extends' and 'super'
   3. Polymorphism (method overriding)
   4. Loading data from a backend (XHR and Fetch API)
   5. Using .map() to transform data into class instances
*/

import { formatCurrency } from "../scripts/utils/money.js";

/*
 getProduct(productId) — searches the products array to find a product by its ID.
 Uses the same search pattern as cart.js: loop through, compare, return the match.
*/
export function getProduct(productId){
  let matchingProduct;

  products.forEach((product) => {
      if(product.id === productId){
          matchingProduct = product;
      }
  });

  return matchingProduct;
}

/*
 CONCEPT: ES6 CLASS — Product
 - A class is a BLUEPRINT for creating product objects.
 - The constructor takes 'productDetails' (raw data) and assigns each property.
 - Methods like getStarsUrl() and getPrice() add BEHAVIOR to the data.
 - This is better than plain objects because:
   1. Methods are defined ONCE in the class, shared by all instances (memory efficient)
   2. You can use inheritance to create specialized versions (like Clothing)
   3. The constructor ensures every product has the right structure
*/
class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  // Method to generate the star rating image URL
  // Uses the rating value to construct the filename: rating-45.png for 4.5 stars
  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  // Method to format the price: converts cents to dollars with $ symbol
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`
  }

  // Base method that returns empty string — meant to be OVERRIDDEN by subclasses
  extraInfoHTML(){
    return "";
    
  }
}

/*
 CONCEPT: INHERITANCE (extends) & POLYMORPHISM
 - 'extends' creates a CHILD CLASS that inherits ALL properties and methods from a PARENT class.
 - Clothing "extends" Product → Clothing HAS everything Product has, PLUS extra stuff.
 - This is the "is-a" relationship: a Clothing IS-A Product (with extra features).

 CONCEPT: super()
 - super(productDetails) calls the PARENT class's constructor.
 - This sets up all the base properties (id, image, name, rating, priceCents).
 - MUST be called BEFORE using 'this' in the child constructor.
 - Then we add the extra property unique to Clothing (sizeChartLink).

 CONCEPT: POLYMORPHISM (Method Overriding)
 - Clothing OVERRIDES the extraInfoHTML() method from Product.
 - The parent returns "" (empty), but Clothing returns a Size Chart link.
 - When we call product.extraInfoHTML(), JS checks if the object's class has its own version:
   - If the product is a Clothing → uses Clothing's version (with size chart)
   - If the product is a plain Product → uses Product's version (empty string)
 - This means the SAME method call produces DIFFERENT results based on the object's type.
 - That's polymorphism: "many forms" — one interface, different behaviors.
*/
class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);   // Call parent constructor to set base properties
    this.sizeChartLink = productDetails.sizeChartLink;   // Add clothing-specific property
  }

  extraInfoHTML(){
    //super.extraInfoHTML(); this is how we can call the parent class method pr a function  
    return `
    <a href = "${this.sizeChartLink}" target = "_blank">Size Chart</a>
    `;
  }
}

// Products array starts empty — will be filled by loadProducts() from the backend
export let products = [];

/*
 CONCEPT: FETCH API — The MODERN way to make HTTP requests
 - fetch(url) returns a PROMISE (not the data directly — it's asynchronous).
 - .then(response => response.json()) → parses the response body as JSON.
 - .then(data => ...) → now you have the actual JavaScript data to work with.
 - Fetch is cleaner than XMLHttpRequest — no need to create objects or call open/send.
 - Fetch returns a Promise, so it works naturally with .then() chains and async/await.
 
 CONCEPT: .map() FOR DATA TRANSFORMATION
 - productsData.map() transforms EACH raw object into a class instance.
 - If the product type is "clothing", we create a Clothing instance (with size chart).
 - Otherwise, we create a base Product instance.
 - This is where POLYMORPHISM is set up: the right class is chosen based on the data.
*/
export function loadProductsFetch(){
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json();    // Parse JSON response → returns another Promise
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if(productDetails.type === "clothing"){
        return new Clothing(productDetails);   // Create Clothing instance
      }
      return new Product(productDetails);       // Create base Product instance
    });
    console.log("load products");

  })
  return promise;   // Return the promise so callers can chain .then()
}
/*
loadProductsFetch().then(() => {
  console.log('next-step');
});
*/

/*
 CONCEPT: XMLHttpRequest — The OLDER way to make HTTP requests
 - Same result as fetch, but more verbose syntax.
 - Steps: create XHR → add load listener → open → send.
 - xhr.response contains the raw response string.
 - JSON.parse() converts it to a JS object, then .map() transforms the data.
 - The 'fun' callback parameter is called after loading completes,
   so the caller knows when it's safe to use the products data.
*/
export function loadProducts(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load' , () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if(productDetails.type === "clothing"){
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log("load products");

    
    fun();   // Call the callback — "products are ready!"
  })

  xhr.open('GET' , 'https://supersimplebackend.dev/products');
  xhr.send();
  
}


/*
 The commented-out section below is the ORIGINAL hardcoded products array.
 It was replaced by loading products from the backend (above).
 Notice: .map() at the end converts each raw object into a Product or Clothing instance,
 just like the backend version does.
*/
/*
export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  ...
].map((productDetails) => {
  if(productDetails.type === "clothing"){
    return new Clothing(productDetails);
  }
  return new Product(productDetails);
});
*/