/*
 CONCEPT: ES6 CLASSES (Object-Oriented Programming — Approach 2)
 - A CLASS is a blueprint/template for creating objects.
 - Classes are the MODERN way to do OOP in JavaScript (ES6+).
 - Syntax: class ClassName { constructor() { } methods() { } }
 - Creates objects using: new ClassName(args)

 KEY CONCEPTS IN THIS FILE:
 1. 'class' keyword — defines a class (blueprint)
 2. 'constructor()' — runs automatically when you create an object with 'new'
 3. '#' prefix — makes properties/methods PRIVATE (can't be accessed outside the class)
 4. 'new' keyword — creates a new instance of the class
 5. Public vs Private members

 CLASS vs FACTORY FUNCTION:
 - Class uses 'new' keyword to create instances
 - Factory function just calls the function (no 'new')
 - Classes have built-in support for private (#) members
 - Both achieve the same goal: creating reusable object blueprints
*/

class Cart {
    /*
     DECLARING CLASS PROPERTIES
     - Properties declared at the top of the class define what data each instance holds.
     - 'cartItem' → public property, accessible from outside (cart.cartItem)
     - '#localStorageKey' → PRIVATE property (the # makes it private)
    */
    cartItem;
    #localStorageKey;   // # prefix = PRIVATE — can NOT be accessed outside the class

    /*
     CONCEPT: constructor()
     - Special method that runs AUTOMATICALLY when you use 'new Cart(...)'.
     - Used to INITIALIZE the object with starting values.
     - 'this' inside the constructor refers to the NEW object being created.
     - Here we save the storage key and immediately load data.
    */
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.#loadFromStorage();   // Call the private method to load initial data
    }

    /*
     CONCEPT: PRIVATE METHODS (# prefix)
     - #loadFromStorage() is PRIVATE — it can only be called from INSIDE the class.
     - Trying to call cart.#loadFromStorage() from outside would throw an ERROR.
     - This is ENCAPSULATION: hiding internal implementation details.
     - Users of this class only need to know the PUBLIC methods (addToCart, removeFromCart, etc.)
     - The constructor calls this automatically — users don't need to know about loading.
    */
    #loadFromStorage(){
        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if(!this.cartItem){
            this.cartItem = [{
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

    // PUBLIC method — accessible from outside the class
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey , JSON.stringify(this.cartItem));
    }

    addToCart(productId){
    let matchingItem;
    
    this.cartItem.forEach((cartItem) => {
        if(productId === cartItem.productId){
        matchingItem = cartItem;
        }
    });
    
    if(matchingItem){
        matchingItem.quantity += 1;
    }
    else{
        this.cartItem.push({
        productId : productId,
        quantity: 1,
        deliveryOptionId: '1'
        });
    }
    this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart = [];
        this.cartItem.forEach((cartItem) => {
            if(cartItem.productId !== productId){
            newCart.push(cartItem);
            }
        });
        this.cartItem = newCart;
        
        this.saveToStorage();
    }

    updateDeliveryOption(productId , deliveryOptionId){
        let matchingItem;
        
        this.cartItem.forEach((cartItem) => {
            if(productId === cartItem.productId){
            matchingItem = cartItem;
            }
        });
        
        matchingItem.deliveryOptionId = deliveryOptionId;
        
        this.saveToStorage();
    } 

}


/*
 CONCEPT: CREATING INSTANCES WITH 'new'
 - 'new Cart(...)' creates a new object from the Cart class.
 - The constructor runs automatically, initializing the object.
 - Each instance is INDEPENDENT — changing one doesn't affect the other.
 - Notice: with classes, the constructor auto-calls #loadFromStorage(),
   so we don't need to manually call loadFromStorage() like with the factory function!
*/

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);