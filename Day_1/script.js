/*
================================================================================
 CONCEPT: VARIABLES IN JAVASCRIPT
 - A variable is a container that stores a value in memory.
 - We use 'let' keyword to declare a variable (modern way).
 - Variable names follow 'camelCase' convention (e.g., firstName, not first_name).
 - Rules for naming variables:
     1. Cannot start with a number (e.g., 1name is INVALID)
     2. Cannot start with special characters EXCEPT underscore (_) and dollar sign ($)
     3. Cannot use reserved keywords (like 'let', 'function', 'if', etc.)
     4. If written in ALL CAPS (e.g., PI), it's treated as a constant by convention
 - Variables declared with 'let' can be reassigned to a new value later.
================================================================================

let js = 'new';

console.log(80 + 20 + 5);
let firstName = "sahil"; // this is how the variable is declared in the js 
// we use camelcase to give variable name 
// we can not start the variable name with capital letter bcz of oop 
// we can not start the variable name with special char except _ , $ 
// if we write whole variable with the capital words then js will consider it as the constant
console.log(firstName);
let PI = 3.14;

// we must have to write the variable name very discriptive so that it will be easy to read 
*/


/*
===================================================================================================
 CONCEPT: DATA TYPES IN JAVASCRIPT
 - JavaScript has 7 primitive data types:
     1. Number   → integers and decimals (e.g., 23, 3.14)
     2. String   → text wrapped in quotes (e.g., "sahil", 'hello')
     3. Boolean  → true or false
     4. Undefined → variable declared but NOT assigned a value yet
     5. Null     → intentionally empty value (assigned by programmer)
     6. Symbol   → unique identifier (advanced, used rarely)
     7. BigInt   → for very large numbers beyond Number limit
 - JavaScript is DYNAMICALLY TYPED: variables can change their type at runtime.
   (e.g., a variable holding a number can later hold a string)
 - The 'typeof' operator tells you the TYPE of a VALUE, not the variable itself.
 - QUIRK: typeof null returns "object" — this is a known JS bug from the beginning.
===================================================================================================
let js = true;

console.log(js);
console.log(typeof true); // this will show that value is having the type  not variable 
console.log(typeof 23);
console.log(typeof "sahil");

let age;
console.log(age);
console.log(typeof age);

age = 12;
console.log(typeof age);
console.log(age);
*/


/*
============================================================================================
 CONCEPT: let vs const vs var
 - 'let' → Used when the value WILL CHANGE later. It is BLOCK-SCOPED.
     Block-scoped means the variable only exists inside the { } block where it's declared.
 - 'const' → Used when the value should NEVER CHANGE (constant). Also block-scoped.
     You MUST assign a value when declaring with const. (const a; is INVALID!)
 - 'var' → The OLD way to declare variables. It is FUNCTION-SCOPED (not block-scoped).
     Function-scoped means the variable is accessible throughout the entire function,
     even outside of if-blocks or loops. This can cause bugs, which is why we use 'let' now.
 - Best Practice: Use 'const' by default, use 'let' only when you know the value will change.
   Avoid 'var' in modern code.
============================================================================================
let age = 5;
age = 6;
// you can use let where u know that value must mutate 

const birthYear = 2005;
// U can use the const where u are sure that value must not be change in future 
// const a;  this declaration is not valid if u are declaring a contant must assign value with it 

// var keyword is not use now a days to declare the variable bcz it is function scoped
//--- if u declare the variable using the var keyword then u can use it through out the function 
// let keyword use to declare the keyword now a days because variable can acess thorout a block not in whole function  

*/


/*
===========================================================================
 CONCEPT: OPERATORS IN JAVASCRIPT
 1. ARITHMETIC OPERATORS — perform math calculations:
     +  (addition), -  (subtraction), *  (multiplication),
     /  (division),  ** (exponentiation/power), %  (modulus/remainder)
 2. ASSIGNMENT OPERATORS — assign and update values:
     =   (assign), +=  (add and assign), -=  (subtract and assign),
     *=  (multiply and assign), /=  (divide and assign)
     ++  (increment by 1), --  (decrement by 1)
 3. COMPARISON OPERATORS — compare values and return a boolean:
     >  (greater than), <  (less than),
     >= (greater or equal), <= (less or equal)
 4. The + operator is OVERLOADED: it does addition with numbers but
    CONCATENATION (joining) with strings.
    Example: "Sahil" + " " + "Kharbanda" → "Sahil Kharbanda"
===========================================================================


// arithmetic operators and operations 
const now = 2037;
const ageSahil = now - 2005;
const ageSirat = now - 2035;
console.log(ageSahil , ageSirat);

console.log(ageSahil*2 , ageSahil/10 , ageSirat**3);

const firstName = "Sahil";
const lastName = "Kharbanda";

console.log(firstName + " " + lastName);

// assignment operators 
let x = 10 + 5; //15
x += 10; //25 x = x+10;
x *= 4; // x = x*4;
x++; // x= x+1;
x--;
x--;
console.log(x);

// comparision operator 
console.log(ageSahil>ageSirat); // > , < , >= , <= 
*/



/*
===============================================================================
 CONCEPT: STRINGS & TEMPLATE LITERALS
 - Strings can be created with single quotes (''), double quotes (""), or backticks (``).
 - The OLD WAY to combine strings with variables is CONCATENATION using + operator.
   This is messy and hard to read, especially with complex strings.
 - TEMPLATE LITERALS (backtick strings ``) are the MODERN WAY:
     1. Use backticks `` instead of quotes
     2. Insert variables/expressions with ${variableName} or ${expression}
     3. Can span multiple lines without special characters
     4. Much cleaner and easier to read than concatenation
 - Template literals can contain ANY JavaScript expression inside ${}, not just variables.
   Example: ${year - birthYear} evaluates the subtraction inside the string.
================================================================================
 

// This is normal string usage  
const firstName = 'sahil';
const job = 'student';
const birthYear = 2005;
const year = 2025;

const Sahil = "I'm " + firstName +  ", a "+(year-birthYear) + " year old " + job;
console.log(Sahil);

// This is Template literals
const SahilNew = `I'm ${firstName} , a ${year-birthYear} year old ${job}`
console.log(SahilNew);
*/



/* 
===============================================================================================
 CONCEPT: IF-ELSE STATEMENTS (Control Flow)
 - if-else lets you execute DIFFERENT code based on a CONDITION.
 - The condition inside if() is evaluated as a boolean (true or false).
 - Structure:
     if (condition) {
         // runs if condition is TRUE
     } else {
         // runs if condition is FALSE
     }
 - You can also chain conditions with 'else if':
     if (condition1) { ... }
     else if (condition2) { ... }
     else { ... }
 - Variables declared with 'let' OUTSIDE if-else blocks can be modified INSIDE them.
   (But variables declared with 'let' INSIDE a block won't be accessible outside.)
===============================================================================================


// if-else control statements 
const birthYear = 2005;
let century ;
if (birthYear>2000){
    century = 21;
}
else{
    century = 20;
}
console.log(century);


*/

/*
============================================================================================
 CONCEPT: TYPE CONVERSION vs TYPE COERCION
 - TYPE CONVERSION (Explicit) → YOU manually convert the type using built-in functions:
     Number("1991") → converts string "1991" to number 1991
     String(1991)   → converts number 1991 to string "1991"
     Boolean(1)     → converts number 1 to boolean true
     Number("sahil") → returns NaN (Not a Number) because "sahil" can't become a number
     NaN is still of type 'number' — it just means an invalid number operation occurred.

 - TYPE COERCION (Implicit) → JavaScript AUTOMATICALLY converts types behind the scenes:
     "hi i am " + 20 → JS converts 20 to "20" and concatenates (+ triggers string coercion)
     "30" - "10"      → JS converts both to numbers and subtracts = 20
                         (- , * , / trigger number coercion, NOT + )
     "2" * "3"        → JS converts both to numbers and multiplies = 6
 - KEY RULE: The + operator with a string does CONCATENATION, but -, *, / do MATH.
============================================================================================

// type coversion
const input = "1991";
console.log(input + 18); // this will give u the result of 199118
console.log(Number(input) + 18); //this will give u the result of 2009 Number() this function covert string to number 
console.log(Number("sahil"));// this will give u the result of Nan which means not a valid number 
console.log(String(1991)); // this is how u convert anything into string 

// type coercion
console.log("hi i am " + 20 + "years old student");
console.log("30" - "10");// this will give output 20
console.log("2" * "3");// this will give output of 6

*/

/*
==================================================================================================
 CONCEPT: FALSY VALUES
 - A "falsy" value is a value that becomes FALSE when converted to a boolean.
 - JavaScript has exactly 5 FALSY values:
     1. 0          (the number zero)
     2. ""         (empty string)
     3. NaN        (Not a Number)
     4. undefined  (variable declared but not assigned)
     5. null       (intentionally empty)
 - EVERYTHING ELSE is "truthy" (becomes true when converted to boolean).
   Examples of truthy: "sahil", 3, -1, "0", " ", [], {} — all are truthy!
 - We rarely convert to Boolean explicitly. Instead, JS does it IMPLICITLY
   in if-statements: if(money) checks if 'money' is truthy.
 - GOTCHA: if(0) is false, so checking if someone has money = 0 would fail!
   This is a common bug — use explicit checks like if(money !== undefined) instead.
===================================================================================================

// we are having 5 falsy values : 0 , "" , NaN , undefined , null:- basically they give false when we try to convert them into a boolean

console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(NaN));
console.log(Boolean(undefined));
console.log(Boolean("sahil"));
console.log(Boolean(3));

// we never do this in real like explicitly converting into boolean it is always implicit (coercion)

const money = 10;
if(money){
    console.log("yeah u have money !");
} else{
    console.log("ooooo u dont have money");
}

let height ;
if(height){
    console.log("Height is defined");
}else{
    console.log("Height is not defined");
}
// as we know that undefined give falsy value so in the if block where condition is checked it give false value 
// so else block run and if we define height equal to 0 then it also give false and else block run 

*/



/*
====================================================================================================
 CONCEPT: EQUALITY OPERATORS (=== vs ==)
 - STRICT EQUALITY (===) → Compares value AND type. NO type coercion.
     "18" === 18  → false (string vs number → different types)
     18 === 18    → true  (same value, same type)
 - LOOSE EQUALITY (==) → Compares value only. DOES type coercion.
     "18" == 18   → true  (JS converts "18" to 18, then compares)
 - BEST PRACTICE: Always use === (strict equality) to avoid unexpected bugs.
   Loose equality can lead to confusing results like: 0 == "" → true, null == undefined → true
 - STRICT NOT EQUAL (!==) → opposite of ===, no coercion
 - LOOSE NOT EQUAL (!=)   → opposite of ==, does coercion
 - prompt() returns a STRING, so use Number(prompt(...)) to convert input to a number
   before doing strict comparison with a number.
====================================================================================================

let age = "18";
if(age === 18)
{
    console.log("you are a adult");
}
else{
    console.log("not adult");
}
// above u use strict equality having (===) three equal to  sign
 
   // When u use strict equality this did not perform any type coercion but 
   // when u use loose equality it will perform the type coercion which will 
   // effect the result

if(age == 18){
    console.log("congo u r an adult");
}else{
    console.log("not adult");
}
// abouve u use the loose equality having (==) two equal to sign

let favNum = Number(prompt("what is ur fav number ? "));
if(favNum === 18){
    console.log("Yeah 18 is matched");
}
else if(favNum === 20){
    console.log("lucky 20 is matched");
}
else if (favNum === 22){
    console.log("22 is matched");
}
else{
    console.log("No match found.");
}

if(favNum !== 19){// this is strict not equal to operator 
    console.log("why not 19?");
}

*/



/*

========================================================================
 CONCEPT: LOGICAL OPERATORS
 - Logical operators combine multiple boolean conditions:
     && (AND) → true only if BOTH sides are true
     || (OR)  → true if AT LEAST ONE side is true
     !  (NOT) → flips true to false, and false to true
 - Evaluation order: ! runs first, then &&, then ||
 - SHORT-CIRCUIT EVALUATION:
     && → if the first value is false, it stops and returns false (doesn't check the rest)
     || → if the first value is true, it stops and returns true (doesn't check the rest)
 - Practical use: combine multiple conditions in if-statements for complex logic.
   Example: "Can drive if has license AND good vision AND is NOT tired"
========================================================================


const hasDrivingLicense = true;
const hasGoodVision = true;

console.log(hasDrivingLicense && hasGoodVision);
console.log(hasDrivingLicense || hasGoodVision);
console.log(!hasDrivingLicense);

if (hasDrivingLicense && hasGoodVision){
    console.log("U can drive");
}else{
    console.log("No u can't drive ");
}
const isTired = true;

if(hasDrivingLicense && hasGoodVision && !isTired){
    console.log("you can drive the car ");
}
else{
    console.log("you can not drive ");
}


*/


/*
===========================================================================
 CONCEPT: SWITCH STATEMENT
 - switch is an alternative to long if/else if chains when comparing ONE value
   against MULTIPLE possible values.
 - Structure:
     switch(value) {
         case "option1": ... break;
         case "option2": ... break;
         default: ...
     }
 - The 'break' keyword is CRITICAL — without it, code "falls through" to the
   next case and keeps executing (this is called FALL-THROUGH behavior).
 - FALL-THROUGH can be useful: putting two cases together without a break
   between them means both cases run the same code.
   Example: case "Wednesday": case "Thursday": → both run the same code.
 - 'default' is like 'else' — it runs when no case matches.
 - switch uses STRICT COMPARISON (===), so types must match too.
=========================================================================== 

const day = "Monday";

switch (day) {
    case "Monday" :
        console.log("do js");
        break;
    case "Tuesday" :
        console.log("Do java");
        break;       
    case "Wednesday":
    case "Thrusday":
        console.log("do Dsa");
        break;
    case "Friday":
        console.log("do Practice");
        break;
    case "Saturday":
        console.log("Do js");
        break;
    case "Sunday":
        console.log("Take rest");
        break;
    default:
        console.log("day does not exist");        
}

*/

