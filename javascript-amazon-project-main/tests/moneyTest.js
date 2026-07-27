import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: FormatCurrency");

console.log("converts Cents to dollars");
// basic test case to check that function is working or not 
if(formatCurrency(2095) === "20.95"){
    console.log("Test Case Passed");
}
else{
    console.log("Failed")
}

console.log("Working with Zero");
// Edge case 
if(formatCurrency(0) === "0.00"){
    console.log("Test Case Passed");
}
else{
    console.log("Failed");
}

console.log("rounds up to the nearest cent");
//tricky Case
if(formatCurrency(2000.5) === "20.01"){
    console.log("Test Case Passed");
}
else{
    console.log("Failed");
}