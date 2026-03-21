
// ── INTERFACE 1: IUser ──────────────────────────────────────────────────
// Describes a test account. Used in: login tests, registration tests.
export interface IUser {
  email: string;       // REQUIRED — TypeScript error if missing
  password: string;    // REQUIRED — TypeScript error if missing
  name?: string;        // OPTIONAL — the ? means: present OR absent, both are fine
}         // Without ?, TypeScript treats the property as required.
         // name?: string means: if name exists, it must be a string.
         // name: string means: name must ALWAYS exist AND be a string.

// ── INTERFACE 2: IProduct ───────────────────────────────────────────────
// Describes a product to search for. Used in: search tests, product page tests.
export interface IProduct {
  name: string;         // display name of product e.g. "Blue Top"
  category: string;     // product category e.g. "Women"
  searchTerm: string;   // what to type in the search box e.g. "top"
}

// ── INTERFACE 3: ISearchTest ─────────────────────────────────────────────
// Describes a complete search test scenario INCLUDING the expected outcome.
// This is the key design: test data carries the assertion logic with it.
export interface ISearchTest {
  term: string;                // what to search for
  expectedInURL: string;       // substring that must appear in URL after search
  shouldHaveResults: boolean;  // true=expect products, false=expect zero products
}
           // shouldHaveResults is how we handle NEGATIVE TESTS in the same loop.
           // One for...of loop handles BOTH "expect results" AND "expect empty".
