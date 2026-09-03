/*
 CONCEPT: MANUAL TESTING (Before Jasmine)
 - This file shows the SIMPLEST way to write tests: using if-statements and console.log.
 - Each test follows the pattern:
   1. Call the function with a specific input
   2. Compare the output to what you EXPECT
   3. Log "Passed" or "Failed"

 WHY THIS IS LIMITED:
 - No automatic test runner — you have to open the HTML file and check the console manually.
 - No structured output — just text in the console.
 - No grouping of tests — hard to organize as tests grow.
 - That's why testing FRAMEWORKS like Jasmine exist — they solve all these problems.

 TYPES OF TEST CASES:
 1. BASIC test — checks that the function works with normal input (2095 → "20.95")
 2. EDGE CASE — tests boundary/unusual inputs (0 → "0.00")
 3. TRICKY CASE — tests corner cases where the function might fail (rounding 2000.5 → "20.01")
*/

import { formatCurrency } from "../../scripts/utils/money.js";

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
// Edge case — zero should return "0.00", not "0" or ""
if(formatCurrency(0) === "0.00"){
    console.log("Test Case Passed");
}
else{
    console.log("Failed");
}

console.log("rounds up to the nearest cent");
// Tricky Case — 2000.5 cents should round to 2001 cents = "20.01"
// Tests that Math.round() is handling decimals correctly
if(formatCurrency(2000.5) === "20.01"){
    console.log("Test Case Passed");
}
else{
    console.log("Failed");
}