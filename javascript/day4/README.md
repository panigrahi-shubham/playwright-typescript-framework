# 📘 Day 4: Functions, Arrays & Strings

**Date:** February 13, 2026  
**Goal:** Master functions, arrays, and strings — the three pillars of every Playwright test

---

## 🎯 Learning Objectives

By the end of Day 4, you will:
- ✅ Write functions three ways: declaration, expression, arrow
- ✅ Explain hoisting and the Temporal Dead Zone (TDZ)
- ✅ Use default parameters and rest parameters
- ✅ Understand first-class functions and callbacks
- ✅ Explain closures with real examples
- ✅ Master array methods: `map`, `filter`, `forEach`, `reduce`
- ✅ Chain array methods for data pipelines
- ✅ Use spread operator and destructuring
- ✅ Manipulate strings for testing scenarios
- ✅ Apply the 3-step Playwright array pattern

---

## 📁 File Structure

| # | File | Topic |
|---|------|-------|
| 01 | `01_function_declarations.js` | 3 ways to write functions, hoisting, TDZ |
| 02 | `02_default_rest_params.js` | Default parameters, rest parameters (...args) |
| 03 | `03_callbacks_first_class.js` | First-class functions, callbacks, Playwright relevance |
| 04 | `04_scope_closures.js` | Scope chain, block vs function scope, closures |
| 05 | `05_arrays_basics.js` | Creating, accessing, push/pop, splice/slice |
| 06 | `06_array_methods.js` | forEach, map, filter, reduce, chaining, sort |
| 07 | `07_spread_destructuring.js` | Spread operator, destructuring, Playwright patterns |
| 08 | `08_strings.js` | String methods, trim, 6 Playwright patterns, regex intro |
| 09 | `09_practice_exercises.js` | 5 exercises + debug challenge + interview answers |

---

## 🚀 How to Run

```bash
# Navigate to day4 folder
cd javascript/day4

# Run any file
node 01_function_declarations.js
node 02_default_rest_params.js
node 03_callbacks_first_class.js
node 04_scope_closures.js
node 05_arrays_basics.js
node 06_array_methods.js
node 07_spread_destructuring.js
node 08_strings.js
node 09_practice_exercises.js
```

---

## 🤖 Automation Relevance

| Concept | Use in Playwright |
|---------|-------------------|
| Arrow functions | Every test and callback uses arrow functions |
| Callbacks | `page.evaluate()`, `waitForFunction()`, event listeners |
| Closures | Utility functions, config builders, state tracking |
| map/filter | Process element text, clean data, validate results |
| reduce | Aggregate test data, calculate totals |
| Spread/Destructuring | Copy data, extract values from responses |
| String methods | Build selectors, clean text, assert content |
| trim() | Prevent flaky tests from hidden whitespace |

---

## 📋 Key Takeaways

### Functions
- **Arrow functions** are used 90% of the time in Playwright
- Arrow functions inherit `this` from parent (unlike regular functions)
- The **implicit return trap**: `(x) => { x * 2 }` returns `undefined`!

### Arrays
- `forEach` = side effects (returns `undefined`)
- `map` = transformation (returns new array)
- `filter` + `map` + `reduce` = method chaining power
- `sort()` **mutates** — always use `[...arr].sort()`
- `find()` returns `undefined` (not null!)

### Strings
- `.length` is a **property** (no parentheses!)
- **Always `.trim()`** before asserting text in tests
- `.includes()` is JS version of Java's `.contains()`
- `.replace()` only replaces first match — use `.replaceAll()`

---

## 🔗 Next Steps

**Day 5:** Objects, Classes & Async/Await — object literals, ES6 classes (POM foundation), promises, and async/await 🚀
