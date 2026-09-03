/*
 CONCEPT: JASMINE TESTING FRAMEWORK — Structured automated testing
 - Jasmine is a popular JavaScript testing framework.
 - It provides a clean, readable structure for organizing tests.

 KEY JASMINE FUNCTIONS:
 - describe("name", callback) → creates a TEST SUITE (group of related tests).
   Think of it as a folder that holds multiple tests.
 - it("name", callback) → creates a single TEST CASE (also called a "spec").
   The name should describe WHAT the test checks in plain English.
 - expect(actualValue) → creates an EXPECTATION — the value you're testing.
 - .toEqual(expectedValue) → a MATCHER that checks if actual === expected.
   Other matchers: .toBe(), .toContain(), .toBeTruthy(), .toBeFalsy(), etc.

 ADVANTAGES OVER MANUAL TESTING:
 1. Structured output — shows pass/fail for each test with test names
 2. Descriptive names — tests document what the code should do
 3. Automatic running — Jasmine discovers and runs all tests automatically
 4. Better error messages — tells you exactly what was expected vs what was received
*/

import { formatCurrency } from "../../scripts/utils/money.js";

// Test Suite: groups all formatCurrency tests together
describe("test suite : formatCurrency" , () => {
    // Test 1: Basic functionality test
    it('converts cents to dollar' , () => {
        expect(formatCurrency(2095)).toEqual('20.95');
        // Checks: does formatCurrency(2095) return exactly '20.95'?
    });

    // Test 2: Edge case — zero input
    it("Working with zero" , () => {
        expect(formatCurrency(0)).toEqual("0.00");
        // Checks: does zero cents correctly format to "0.00"?
    })

    // Test 3: Tricky case — rounding behavior
    it("rounds up to the nearest cent" , () => {
        expect(formatCurrency(2000.5)).toEqual("20.01");
        // Checks: does 2000.5 cents round up to "20.01"? (Math.round rounds 2000.5 → 2001)
    })
});