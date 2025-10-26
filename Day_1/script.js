/*
================================================================================
The code which is commented out is of the variable i have learned through this .
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
this code i used to learn the data types 
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
$$ In this peice of code i have learn about the let , var , const keyword 
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
$$ In this peice of code i have learned about operators 
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
In this peice of code i have learned about the string and the template literals
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
In this peice if code i have learned about the if-else conditional statements 
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
Here i learned about the type conversion and the type coercion
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
$$ In this peice of code I have learned about the Falsy values 
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
Here I learned about the equality operator in detail 
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
