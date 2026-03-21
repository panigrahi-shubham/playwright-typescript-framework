
// data/testdata.ts
// Import the interfaces from types/index.ts
// Without this import, TypeScript does not know what IUser means here.
import { IUser, IProduct, ISearchTest } from "../types/index";

// ── validUser ────────────────────────────────────────────────────────────
// The : IUser annotation tells TypeScript:
// "Check that this object has exactly what IUser requires."
// If you remove email and try to save — TypeScript shows a red error.
export const validUser: IUser = {
  email: "test@testingexercise.com",
  password: "Test@123",
  name: "Test User",  // included here for registration tests that need a name
};

// ── invalidUser ──────────────────────────────────────────────────────────
// A user account that does NOT exist on automationexercise.com.
// Used in login tests to verify the error message appears.
export const invalidUser: IUser = {
  email: "nobody@doesnotexist.com",
  password: "WrongPass@999",
  // name is intentionally ABSENT — name?: string means this is fine
};

// ── searchProducts ───────────────────────────────────────────────────────
// IProduct[] means: array of IProduct objects.
// TypeScript checks EVERY item in the array matches the IProduct shape.
// When you use this in a for...of loop, each iteration gives you one IProduct.
export const searchProducts: IProduct[] = [
  { name: "Blue Top",     category: "Women", searchTerm: "top" },
  { name: "Men Tshirt",   category: "Men",   searchTerm: "tshirt" },
  { name: "Sleeveless Dress", category: "Women", searchTerm: "dress" },
];

// ── searchScenarios ──────────────────────────────────────────────────────
// ISearchTest includes shouldHaveResults: boolean.
// When true  → the test asserts that product cards ARE visible.
// When false → the test asserts that zero product cards appear (NEGATIVE TEST).
// ONE for...of loop handles BOTH positive and negative cases.
export const searchScenarios: ISearchTest[] = [
  {
    term: "jeans",
    expectedInURL: "products",
    shouldHaveResults: true,   // jeans exist → expect results
  },
  {
    term: "shirt",
    expectedInURL: "products",
    shouldHaveResults: true,
  },
  {
    term: "xyznotarealproduct999",
    expectedInURL: "products",
    shouldHaveResults: false,  // nonsense term → expect ZERO results
  },
];