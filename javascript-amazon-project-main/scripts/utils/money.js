/*
 CONCEPT: UTILITY / HELPER FUNCTIONS
 - Utility functions perform ONE specific task and are used across the entire project.
 - They're placed in a 'utils' folder by convention.
 - This function converts prices from CENTS to DOLLARS as a formatted string.

 WHY STORE PRICES IN CENTS?
 - JavaScript (and most languages) have floating-point precision issues:
   0.1 + 0.2 = 0.30000000000000004 (not exactly 0.3!)
 - By storing prices as INTEGERS in cents (1090 instead of 10.90),
   we avoid these precision bugs. All math is done with whole numbers.
 - Only at the DISPLAY level do we convert to dollars.

 Math.round() → rounds to the nearest integer (handles edge cases like 2000.5 → 2001)
 / 100 → divides by 100 to convert cents to dollars (2001 → 20.01)
 .toFixed(2) → ensures exactly 2 decimal places (20 → "20.00", 20.1 → "20.10")
 .toFixed() returns a STRING, not a number.
*/
export function formatCurrency(priceCents){
    return (Math.round(priceCents)/100).toFixed(2);
}