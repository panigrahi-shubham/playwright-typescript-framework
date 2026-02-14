# 📘 Day 5: Error Handling, Modules & ES6+ Features

**Date:** February 13, 2026  
**Goal:** Master error handling patterns, module systems, and modern JavaScript features — completing your JS foundation before advanced topics

---

## 🎯 Learning Objectives

By the end of Day 5, you will:
- ✅ Use try/catch/finally for robust error handling
- ✅ Create custom error class hierarchies for meaningful failure messages
- ✅ Apply Playwright error patterns: retry logic, soft assertions, screenshots
- ✅ Understand the critical rule: always `await` inside try/catch for async code
- ✅ Know both CommonJS (`require`) and ES Modules (`import/export`)
- ✅ Differentiate default exports from named exports
- ✅ Use optional chaining (`?.`) for safe property access
- ✅ Use nullish coalescing (`??`) vs `||` for smart defaults
- ✅ Use `Map`, `Set`, `for...of`, enhanced object literals
- ✅ Combine all concepts into a professional utility module

---

## 📁 File Structure

| # | File | Topic |
|---|------|-------|
| 01 | `01_try_catch_finally.js` | try/catch/finally, throwing errors, re-throwing, instanceof |
| 02 | `02_error_types_custom.js` | Built-in error types, custom error classes, error hierarchy |
| 03 | `03_playwright_error_patterns.js` | Async errors, retry logic, soft assertions, screenshots |
| 04 | `04_modules_commonjs.js` | CommonJS: require(), module.exports, Node.js built-ins |
| 05 | `05_modules_esm.js` | ES Modules: import/export, default vs named, Playwright usage |
| 06 | `06_es6_optional_nullish.js` | Optional chaining `?.`, nullish coalescing `??`, ternary |
| 07 | `07_es6_map_set_loops.js` | for...of vs for...in, Map, Set, enhanced object literals |
| 08 | `08_combined_utility.js` | All concepts combined into one realistic utility module |
| 09 | `09_practice_exercises.js` | 5 exercises + debug challenge + interview answers |

---

## 🚀 How to Run

```bash
# Navigate to day5 folder
cd javascript/day5

# Run any file
node 01_try_catch_finally.js
node 02_error_types_custom.js
node 03_playwright_error_patterns.js
node 04_modules_commonjs.js
node 05_modules_esm.js
node 06_es6_optional_nullish.js
node 07_es6_map_set_loops.js
node 08_combined_utility.js
node 09_practice_exercises.js
```

---

## 🤖 Automation Relevance

| Concept | Use in Playwright |
|---------|-------------------|
| try/catch | Handle optional popups, flaky operations |
| Custom errors | Meaningful failure messages in test reports |
| Retry logic | Handle flaky clicks, network timeouts |
| Soft assertions | Check ALL conditions, report all failures |
| ES Modules | Every file uses import/export in modern projects |
| Default exports | Page Object classes (one class per file) |
| Named exports | Constants, utility functions, test data |
| Optional chaining `?.` | Safe access to nested API responses |
| Nullish coalescing `??` | Smart defaults when 0/"" are valid |
| Map/Set | Track page timings, deduplicate test data |

---

## 📋 Key Takeaways

### Error Handling
- **try/catch/finally** — catch errors, cleanup in finally
- **Custom error classes** — extend Error for meaningful messages
- **Always re-throw** after logging/screenshots — don't hide failures
- **`await` is critical** — try/catch only catches async errors with await

### Modules
- **CommonJS**: `require()` / `module.exports` — Node.js default
- **ES Modules**: `import` / `export` — modern standard, use in Playwright
- **Default export** → `import X from '...'` (no braces, any name)
- **Named export** → `import { X } from '...'` (braces, exact name)

### ES6+ Features
- `?.` — optional chaining (safe nested access, no crashes)
- `??` — nullish coalescing (default for null/undefined ONLY)
- `||` — logical OR (default for ANY falsy value — careful with 0!)
- `Map` — key-value pairs with any key type
- `Set` — unique values, `[...new Set(arr)]` to deduplicate
- `for...of` for arrays, `for...in` for objects (NEVER for...in on arrays)
- Enhanced object literals: `{ name }` instead of `{ name: name }`

---

## 🔗 Next Steps

**Day 6:** Loops Deep Dive, Array/Object Practice & Real-World JavaScript Patterns 🚀
