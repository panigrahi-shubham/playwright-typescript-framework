# 📘 Day 3: Conditionals & Loops — Complete Concept Guide

**Date:** February 12, 2026  
**Goal:** Master decision-making and repetition — the core of test automation logic

---

## 🎯 Learning Objectives

By the end of Day 3, you will:
- ✅ Write `if/else if/else` chains and nested conditions
- ✅ Use ternary operators and `switch` statements
- ✅ Apply truthy/falsy values in conditionals
- ✅ Write `for`, `for...of`, `for...in`, `while`, and `do...while` loops
- ✅ Use array methods: `forEach`, `map`, `filter`, `find`, `some`, `every`, `reduce`
- ✅ Control loops with `break`, `continue`, and labeled statements
- ✅ Apply real-world patterns: guard clauses, retry, pagination

---

## 📁 File Structure

| # | File | Topic |
|---|------|-------|
| 01 | `01_if_else.js` | if/else if/else, nested ifs, flattening logic |
| 02 | `02_ternary_switch.js` | Ternary operator, switch statement, fall-through |
| 03 | `03_truthy_falsy_conditionals.js` | Clean condition checks, guard clauses |
| 04 | `04_for_loops.js` | for, for...of, for...in loops |
| 05 | `05_while_do_while.js` | while, do...while, retry patterns |
| 06 | `06_array_methods.js` | forEach, map, filter, find, some, every, reduce |
| 07 | `07_loop_control.js` | break, continue, labeled statements |
| 08 | `08_practical_patterns.js` | Validation, categorize, search, reports, retry |
| 09 | `09_practice_exercises.js` | 5 exercises + 3 debug challenges |

---

## 🚀 How to Run

```bash
# Navigate to day3 folder
cd javascript/day3

# Run any file
node 01_if_else.js
node 02_ternary_switch.js
node 03_truthy_falsy_conditionals.js
node 04_for_loops.js
node 05_while_do_while.js
node 06_array_methods.js
node 07_loop_control.js
node 08_practical_patterns.js
node 09_practice_exercises.js
```

---

## 📖 Concept Explanations

### 1️⃣ `if / else if / else` — The Foundation of Decision-Making

**What is it?**  
The `if` statement is how your code makes decisions. It evaluates a **condition** (something that resolves to `true` or `false`) and runs a block of code only if that condition is true.

**Syntax:**
```javascript
if (condition) {
    // Runs when condition is TRUE
} else if (anotherCondition) {
    // Runs when first condition is FALSE, but this one is TRUE
} else {
    // Runs when ALL conditions above are FALSE (catch-all)
}
```

**How it works step-by-step:**
1. JavaScript evaluates the `if` condition
2. If it's `true` → runs that block and **skips everything else**
3. If it's `false` → moves to the next `else if` and checks that condition
4. If all `else if` conditions fail → runs the `else` block (the fallback)

**Key Concepts Covered:**

#### Basic if/else
The simplest form — one check with two outcomes:
```javascript
const statusCode = 200;
if (statusCode === 200) {
    console.log("Success");       // ← This runs
} else {
    console.log("Something wrong");
}
```

#### if/else if/else chains
When you have **more than two** possible outcomes:
```javascript
if (statusCode === 200) {
    console.log("Success");
} else if (statusCode === 401) {
    console.log("Unauthorized");
} else if (statusCode === 404) {
    console.log("Not found");
} else {
    console.log("Unexpected status");
}
```
> **Rule:** JavaScript checks from top to bottom. The **first** match wins, and all remaining conditions are skipped.

#### Nested if statements
Decisions inside decisions — useful when one condition depends on another being true first:
```javascript
if (user.isLoggedIn) {
    if (user.hasPermission) {
        if (user.accountType === "premium") {
            console.log("Full access granted");
        }
    }
}
```
> ⚠️ **Problem:** Deep nesting makes code hard to read. This is sometimes called the "pyramid of doom."

#### Flattening nested ifs
Use `&&` (AND) to combine conditions into one line:
```javascript
// Instead of 3 levels of nesting:
if (user.isLoggedIn && user.hasPermission && user.accountType === "premium") {
    console.log("Full access granted");
}
```
> 💡 **Best Practice:** Flatten when possible. Your code becomes much more readable.

#### Logical Operators in Conditions
| Operator | Name | Meaning |
|----------|------|---------|
| `&&` | AND | Both sides must be true |
| `\|\|` | OR | At least one side must be true |
| `!` | NOT | Flips true ↔ false |

```javascript
// AND — both must be true
if (testResult.status === "passed" && testResult.errors === 0) { ... }

// OR — at least one must be true
if (priority === "P0" || (priority === "P1" && isBlocking)) { ... }
```

**🤖 Automation Use:**  
In Playwright tests, `if/else` is used everywhere:
- Check if an element is visible before clicking
- Handle different API response codes
- Route logic based on environment (staging vs production)
- Decide whether to take screenshots on failure

---

### 2️⃣ Ternary Operator & Switch Statement

#### Ternary Operator (`? :`)

**What is it?**  
A **one-line shorthand** for a simple `if/else`. It's an **expression** (returns a value), not a statement.

**Syntax:**
```javascript
const result = condition ? valueIfTrue : valueIfFalse;
```

**How it works:**
1. Evaluate the `condition`
2. If `true` → return `valueIfTrue`
3. If `false` → return `valueIfFalse`

**Examples:**
```javascript
// Instead of 5 lines of if/else:
const status = age >= 18 ? "adult" : "minor";

// Set timeout based on environment
const timeout = isCI ? 30000 : 10000;

// Inline in template strings
console.log(`Cart: ${count} ${count === 1 ? "item" : "items"}`);
```

**Nested Ternary (use sparingly!):**
```javascript
const discount = isPremium ? 20 : isMember ? 10 : 0;
```
> ⚠️ **Rule:** Use ternary ONLY for simple, two-way choices. If you need nested ternaries, use `if/else` instead — readability matters more than brevity.

#### Switch Statement

**What is it?**  
A cleaner way to compare **one variable** against **many exact values**. Think of it as a more organized `if/else if/else if/else` chain.

**Syntax:**
```javascript
switch (variable) {
    case "value1":
        // Code for value1
        break;        // ← CRITICAL: stops execution
    case "value2":
        // Code for value2
        break;
    default:
        // Code when nothing matches (like 'else')
}
```

**How it works:**
1. JavaScript evaluates the `switch` expression
2. Compares it against each `case` using **strict equality** (`===`)
3. When a match is found, runs that block
4. `break` stops execution — **without it, code "falls through"** to the next case
5. `default` runs if nothing matches

**⚠️ The `break` Rule:**
```javascript
// WITHOUT break — fall-through (runs all cases after the match!)
switch (x) {
    case 1: console.log("one");     // If x === 1, this runs...
    case 2: console.log("two");     // ...AND this runs too!
    case 3: console.log("three");   // ...AND this!
}
```

**Intentional Fall-Through — Grouping Cases:**
```javascript
// Group related HTTP status codes
switch (responseCode) {
    case 400:
    case 401:
    case 403:
    case 404:
        console.log("Client error");  // All 4xx codes land here
        break;
    case 500:
    case 502:
    case 503:
        console.log("Server error");  // All 5xx codes land here
        break;
}
```

**When to Use Switch vs If/Else:**

| Use Switch | Use If/Else |
|------------|-------------|
| One variable, many exact values | Ranges (`score > 90`) |
| 3+ cases for the same variable | Complex conditions (`a && b \|\| c`) |
| Discrete values (strings, numbers) | Different variables per condition |

**🤖 Automation Use:**  
- **Ternary:** Set config values based on CI/local, mobile/desktop selectors
- **Switch:** Route browser-specific settings (chromium/firefox/webkit), handle HTTP codes

---

### 3️⃣ Truthy / Falsy in Conditionals

**What is it?**  
In JavaScript, every value is inherently **truthy** or **falsy**. When used in a condition (like `if`), JavaScript automatically converts the value to `true` or `false`.

**The 8 Falsy Values (memorize these!):**
| Value | Type |
|-------|------|
| `false` | Boolean |
| `0` | Number |
| `-0` | Number |
| `0n` | BigInt |
| `""` | Empty string |
| `null` | Null |
| `undefined` | Undefined |
| `NaN` | Not a Number |

**Everything else is truthy** — including `[]` (empty array), `{}` (empty object), `"0"` (string zero).

**Clean Checks Using Truthy/Falsy:**
```javascript
// ❌ Verbose (don't do this)
if (errorMessage !== "" && errorMessage !== null && errorMessage !== undefined) { ... }

// ✅ Clean (do this!)
if (errorMessage) { ... }   // Truthy = has a value
if (!errorMessage) { ... }  // Falsy = empty/null/undefined
```

**⚠️ The Empty Array Trap:**
```javascript
const items = [];
if (items) {
    // ⚠️ This RUNS! Empty array [] is TRUTHY!
}

// ✅ Check .length instead
if (items.length) { ... }     // 0 is falsy → skips if empty
if (!items.length) { ... }    // True when array is empty
```

#### Guard Clauses (Early Return Pattern)

**What is it?**  
Exit a function early when bad/invalid data is detected, instead of wrapping everything in nested ifs.

```javascript
function processData(response) {
    if (!response) return null;           // Guard 1: no response
    if (!response.data) return null;      // Guard 2: no data field
    if (!response.data.length) return []; // Guard 3: empty data

    // ✅ If we get here, data is valid — process normally
    return response.data;
}
```

> 💡 **Why?** Guard clauses keep the "happy path" (main logic) un-indented and easy to read. Each guard handles one specific failure case.

**🤖 Automation Use:**  
- Validate API responses before asserting
- Check element text exists before comparing
- Handle conditional test steps based on config flags

---

### 4️⃣ For Loops — Repeating Actions

#### Classic `for` Loop

**What is it?**  
The traditional counted loop. You control the start, end, and step.

**Syntax:**
```javascript
for (initialization; condition; increment) {
    // Code to repeat
}
```

**How it works (step-by-step):**
1. **Initialization** (`let i = 0`) → Runs ONCE before the loop starts
2. **Condition** (`i < 5`) → Checked BEFORE each iteration. If `false`, loop stops
3. **Body** → Runs if condition is `true`
4. **Increment** (`i++`) → Runs AFTER each iteration

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}
// Total: 5 iterations (0 through 4)
```

#### `for...of` Loop (Modern, Preferred for Arrays)

**What is it?**  
Iterates directly over the **values** of an iterable (arrays, strings, Maps, Sets).

```javascript
const fruits = ["Apple", "Banana", "Cherry"];

for (const fruit of fruits) {
    console.log(fruit);  // "Apple", "Banana", "Cherry"
}
```

**Why prefer it?**
- Cleaner syntax — no `i`, no `.length`, no `array[i]`
- Less room for off-by-one errors
- Works with any iterable, not just arrays

#### `for...in` Loop (For Objects Only!)

**What is it?**  
Iterates over the **keys** (property names) of an object.

```javascript
const config = { baseURL: "https://api.com", timeout: 30000 };

for (const key in config) {
    console.log(`${key}: ${config[key]}`);
}
// "baseURL: https://api.com"
// "timeout: 30000"
```

> ⚠️ **NEVER use `for...in` on arrays!** It iterates over indices as strings, not values, and can include inherited properties.

**Loop Comparison:**
| Loop | Iterates Over | Best For |
|------|---------------|----------|
| `for` | Counter (index) | Known count, need index control |
| `for...of` | Values | Arrays, strings (modern, preferred) |
| `for...in` | Keys (strings) | Object properties (NEVER for arrays) |

**🤖 Automation Use:**  
- `for` → Click through pagination pages (known count)
- `for...of` → Iterate test data arrays, verify multiple products
- `for...in` → Validate config object keys

---

### 5️⃣ While & Do...While Loops

#### `while` Loop

**What is it?**  
Repeats as long as a condition remains `true`. Use when you **don't know** how many iterations you'll need.

**Syntax:**
```javascript
while (condition) {
    // Runs repeatedly while condition is TRUE
    // ⚠️ Must eventually make condition FALSE to avoid infinite loop!
}
```

**How it works:**
1. Check condition → if `false`, skip the loop entirely
2. Run the body
3. Go back to step 1

**Key Pattern — Retry Logic:**
```javascript
let attempts = 0;
let success = false;

while (!success && attempts < 5) {
    attempts++;
    // Try the operation...
    if (/* operation worked */) {
        success = true;
    }
}
```

> ⚠️ **Infinite Loop Warning:** Always ensure the condition will eventually become `false`. Common safeguards: max attempts counter, timeout.

#### `do...while` Loop

**What is it?**  
Same as `while`, but the condition is checked **after** the first execution. This guarantees the body runs **at least once**.

**Syntax:**
```javascript
do {
    // This runs AT LEAST ONCE, even if condition is false
} while (condition);
```

**Key difference from `while`:**
```javascript
let x = 10;

// while → checks first, never runs (10 < 5 is false)
while (x < 5) { console.log("while:", x); x++; }

// do...while → runs once, THEN checks (10 < 5 is false, but body already ran)
do { console.log("do-while:", x); x++; } while (x < 5);
// Output: "do-while: 10"
```

**Retry with Backoff Pattern:**
```javascript
function fetchWithRetry(url, maxRetries = 3) {
    let attempt = 0;

    while (attempt < maxRetries) {
        attempt++;
        // Try fetch...
        if (succeeded) return response;

        const delay = 1000 * attempt;  // 1s, 2s, 3s (exponential backoff)
        // Wait before retrying...
    }
}
```

**When to Use Which:**
| Loop | Condition Check | Minimum Runs | Best For |
|------|----------------|--------------|----------|
| `while` | Before body | 0 | Unknown iterations, retry logic |
| `do...while` | After body | 1 | Need at least one execution (e.g., menu prompts, polling) |

**🤖 Automation Use:**  
- Retry flaky operations with backoff
- Wait for loading spinners to disappear
- Poll API until status changes
- Process paginated API responses

---

### 6️⃣ Array Methods — Functional Looping

These methods are the **modern, functional** way to work with arrays. They're more expressive than `for` loops and are heavily used in real codebases.

#### `forEach` — Execute for Each Element

**What it does:** Calls a function for each element. Returns `undefined` (no new array).
```javascript
const items = ["login", "signup", "search"];
items.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
});
```
> ⚠️ `forEach` does **NOT** work with `await`. Use `for...of` for async operations.

#### `map` — Transform Each Element

**What it does:** Creates a **new array** by transforming each element. Original array is unchanged.

```javascript
const prices = [100, 200, 300];
const withTax = prices.map(price => price * 1.18);
// [118, 236, 354]

// Generate test emails from usernames
const emails = ["alice", "bob"].map(name => `${name}@test.com`);
// ["alice@test.com", "bob@test.com"]
```

#### `filter` — Keep Only Matching Elements

**What it does:** Creates a **new array** containing only elements that pass the test (callback returns `true`).

```javascript
const users = [
    { name: "Alice", isActive: true },
    { name: "Bob", isActive: false },
    { name: "Charlie", isActive: true }
];

const activeUsers = users.filter(user => user.isActive);
// [{ name: "Alice", ... }, { name: "Charlie", ... }]
```

#### `find` — Get the First Match

**What it does:** Returns the **first element** that passes the test. Returns `undefined` if none found.

```javascript
const products = [
    { id: 1, name: "Laptop", inStock: false },
    { id: 2, name: "Mouse", inStock: true }
];

const firstAvailable = products.find(p => p.inStock);
// { id: 2, name: "Mouse", inStock: true }

const tablet = products.find(p => p.name === "Tablet");
// undefined (not found)
```

> 💡 `filter` returns ALL matches (array). `find` returns FIRST match only (single item).

#### `some` — Does ANY Element Match?

**What it does:** Returns `true` if **at least one** element passes the test.

```javascript
const scores = [85, 90, 78, 92];
scores.some(score => score > 90);   // true (92 passes)
scores.some(score => score > 100);  // false (none pass)
```

#### `every` — Do ALL Elements Match?

**What it does:** Returns `true` only if **every** element passes the test.

```javascript
const scores = [85, 90, 78, 92];
scores.every(score => score >= 60);   // true (all pass)
scores.every(score => score >= 90);   // false (78, 85 fail)
```

#### `reduce` — Aggregate Into a Single Value

**What it does:** Reduces an array to a **single value** by applying a function that accumulates results.

**Syntax:**
```javascript
array.reduce((accumulator, currentValue) => {
    // Return updated accumulator
}, initialValue);
```

**Common uses:**
```javascript
// Sum
const total = [100, 200, 300].reduce((sum, n) => sum + n, 0);  // 600

// Count occurrences
const statuses = ["passed", "failed", "passed", "passed", "failed"];
const counts = statuses.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
}, {});
// { passed: 3, failed: 2 }

// Find max
const durations = [1200, 3400, 560, 8990];
const longest = durations.reduce((max, d) => d > max ? d : max, 0);  // 8990
```

#### Method Chaining

Chain methods together for powerful data pipelines:
```javascript
const results = [
    { name: "login", time: 1200, status: "passed" },
    { name: "payment", time: 3400, status: "failed" },
    { name: "checkout", time: 8990, status: "failed" }
];

const slowFailures = results
    .filter(t => t.status === "failed")      // Keep failures only
    .filter(t => t.time > 1000)              // Keep slow ones
    .map(t => `${t.name} (${t.time}ms)`);    // Format for display
// ["payment (3400ms)", "checkout (8990ms)"]
```

**Quick Reference Table:**

| Method | Returns | Mutates Original? | Purpose |
|--------|---------|--------------------|---------|
| `forEach` | `undefined` | No | Side effects for each item |
| `map` | New array | No | Transform each element |
| `filter` | New array | No | Keep matching elements |
| `find` | Single item or `undefined` | No | First match |
| `some` | `boolean` | No | Any match? |
| `every` | `boolean` | No | All match? |
| `reduce` | Any value | No | Aggregate into single value |

> 💡 **None of these methods modify the original array!** They all return new values.

**🤖 Automation Use:**  
- `map` → Generate test URLs from product IDs
- `filter` → Extract failed test results for reporting
- `find` → Look up a specific test case by name
- `some/every` → Quick pass/fail checks across test suites
- `reduce` → Aggregate test durations, build summary reports

---

### 7️⃣ Loop Control — `break`, `continue` & Labels

#### `break` — Exit the Loop Immediately

**What it does:** Completely stops the loop. Execution continues with the code after the loop.

```javascript
const users = ["Alice", "Bob-ADMIN", "Charlie"];

for (const user of users) {
    if (user.includes("ADMIN")) {
        console.log(`Found admin: ${user}`);
        break;  // Stop searching — we found what we need
    }
    console.log(`Checked: ${user}`);
}
// Output: "Checked: Alice" → "Found admin: Bob-ADMIN" (Charlie never checked)
```

**Use case:** Stop at first critical failure, find first match.

#### `continue` — Skip to the Next Iteration

**What it does:** Skips the **rest of the current iteration** and jumps to the next one.

```javascript
const testCases = [
    { name: "login", skip: false },
    { name: "payment", skip: true },
    { name: "search", skip: false }
];

for (const test of testCases) {
    if (test.skip) {
        console.log(`Skipping ${test.name}`);
        continue;  // Skip to next test
    }
    console.log(`Running ${test.name}`);
}
// "Running login" → "Skipping payment" → "Running search"
```

**Use case:** Skip invalid data, skip known flaky tests.

#### Labeled Statements — Control Nested Loops

**What is it?**  
Labels let you `break` or `continue` an **outer loop** from inside an inner loop.

```javascript
const categories = [
    { name: "Electronics", products: ["Phone", "Laptop"] },
    { name: "Clothing", products: ["Shirt", "Pants"] }
];

outer: for (const category of categories) {
    for (const product of category.products) {
        if (product === "Laptop") {
            console.log(`Found in ${category.name}`);
            break outer;  // Breaks BOTH loops
        }
    }
}
```

> Without `break outer`, only the inner loop would break, and the outer loop would continue to the next category.

**Comparison:**

| Keyword | What It Does | Scope |
|---------|-------------|-------|
| `break` | Exits the loop completely | Current loop only |
| `continue` | Skips to next iteration | Current loop only |
| `return` | Exits the entire **function** | Function scope |
| `break label` | Exits the **labeled** loop | Outer loop |

**🤖 Automation Use:**  
- `break` → Stop at first critical failure, abort test early
- `continue` → Skip known broken tests, skip invalid data
- `break label` → Exit nested page/element search loops

---

### 8️⃣ Practical Patterns

Real-world patterns that combine multiple concepts:

- **Validation chains** — Guard clause + truthy checks to validate data step-by-step
- **Categorization** — Use `if/else if` or `switch` to sort items into groups
- **Search across data** — Nested loops + `break` to find items in collections
- **Report generation** — `filter` + `map` + `reduce` to generate summaries
- **Retry with backoff** — `while` loop + attempt counter for resilient operations

---

### 9️⃣ Practice Exercises

Hands-on challenges to solidify all concepts:
- Building test report summaries
- Implementing data validation with guard clauses
- Writing retry logic with exponential backoff
- Debugging common loop mistakes (off-by-one, missing break, infinite loops)

---

## 🤖 Automation Relevance

| Concept | Use in Playwright |
|---------|-------------------|
| if/else | Check element visibility, handle test outcomes |
| Ternary | Set config based on environment (CI vs local) |
| switch | Route browser-specific settings |
| Truthy/falsy | Validate API responses, check element existence |
| Guard clauses | Early exit on invalid data before assertions |
| for loops | Iterate test data, click through pagination |
| while | Retry flaky operations, wait for conditions |
| Array methods | Process test results, filter failures, build reports |
| Method chaining | Build data processing pipelines for reports |
| break/continue | Stop at first failure, skip known issues |

---

## 📋 Quick Reference

### Conditional Decision Tree
```
Need a decision?
├── Simple true/false → Ternary (? :)
├── One variable, many exact values → switch
├── Ranges or complex logic → if/else if/else
└── Check for existence → truthy/falsy (if (value))
```

### Loop Decision Tree
```
Need to repeat?
├── Known count / need index → for
├── Array values (no index needed) → for...of
├── Object keys → for...in
├── Unknown iterations / condition-based → while
├── Must run at least once → do...while
└── Transform/filter/aggregate array → Array methods
```

### Falsy Values Cheatsheet
```
false | 0 | -0 | 0n | "" | null | undefined | NaN
```
Everything else is truthy (including `[]`, `{}`, `"0"`, `"false"`)

### Array Methods Cheatsheet
| Method | Returns | Purpose |
|--------|---------| --------|
| `forEach` | `undefined` | Side effects for each item |
| `map` | New array | Transform each element |
| `filter` | New array | Keep matching elements |
| `find` | Single item | First match |
| `some` | `boolean` | Any match? |
| `every` | `boolean` | All match? |
| `reduce` | Any value | Aggregate into single value |

---

## 🔗 Next Steps

**Day 4:** Functions & Scope — writing reusable code, arrow functions, closures, and the `this` keyword 🚀
