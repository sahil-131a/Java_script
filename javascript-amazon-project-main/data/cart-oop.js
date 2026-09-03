/*
 CONCEPT: OOP WITH FACTORY FUNCTIONS (Object-Oriented Programming — Approach 1)
 - A FACTORY FUNCTION is a regular function that CREATES and RETURNS an object.
 - It's called "factory" because it "manufactures" objects — like a factory!
 - Each call creates a NEW, independent object with its own data.
 - This is one way to do OOP in JavaScript (before ES6 classes).

 KEY CONCEPTS IN THIS FILE:
 1. Factory Function pattern for creating objects
 2. 'this' keyword — refers to the object calling the method
 3. Closures for private data (localStorageKey is accessible inside but not outside)
 4. Method shorthand syntax in objects
 5. Creating multiple instances (cart, businessCart)
*/

function Cart(localStorageKey){
    /*
     This function creates a cart object with methods and returns it.
     'localStorageKey' is a PARAMETER — each cart instance can have its own storage key.
     This is a CLOSURE: the returned object's methods can still access 'localStorageKey'
     even after Cart() has finished executing. The variable is "closed over" / captured.
    */
    const cart = {
        cartItem : undefined,

        /*
         CONCEPT: 'this' KEYWORD
         - 'this' refers to the object that is CALLING the method.
         - When you call cart.loadFromStorage(), 'this' = cart.
         - So this.cartItem = cart.cartItem.
         - 'this' lets methods access other properties of the SAME object.
         - WITHOUT 'this', JS would look for a variable called 'cartItem' in the outer scope
           (which doesn't exist), instead of the object's property.
        */
        loadFromStorage(){
            this.cartItem = JSON.parse(localStorage.getItem(localStorageKey));
        
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
        },

        saveToStorage(){
            // Uses 'localStorageKey' from the closure — each cart saves to its OWN key
            localStorage.setItem(localStorageKey , JSON.stringify(this.cartItem));
        },

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
        this.saveToStorage();  // 'this' calls the method on the same object
        },

        removeFromCart(productId){
            const newCart = [];
            this.cartItem.forEach((cartItem) => {
                if(cartItem.productId !== productId){
                newCart.push(cartItem);
                }
            });
            this.cartItem = newCart;
            
            this.saveToStorage();
        },

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

    return cart;    // Return the created object
}

/*
 CONCEPT: CREATING MULTIPLE INSTANCES
 - By calling Cart() with different keys, we create INDEPENDENT cart objects.
 - Each has its own localStorage key, so they don't interfere with each other.
 - This is why OOP is powerful: create a "blueprint" once, reuse it many times.
 - Example use: a regular cart and a business cart for B2B customers.
*/
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business'); 

cart.loadFromStorage();

businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);