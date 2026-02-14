# 📘 Day 6: Loops Deep Dive, Iterators & Real-World JavaScript Patterns

**Date:** February 14, 2026 (Saturday — Weekend Deep Dive)  
**Goal:** Master loop patterns, understand iterators/generators, apply real-world JS patterns — combine everything from Days 2–5 into professional code

---

## 🎯 Learning Objectives

By the end of Day 6, you will:
- ✅ Know ALL loop types and when to use each
- ✅ Handle async operations in loops correctly (the #1 mistake area)
- ✅ Understand iterators and generators (interview knowledge)
- ✅ Apply real-world patterns: Config Builder, Data Factory, Fluent Builder, Event Emitter
- ✅ Use functional patterns: Debounce, Throttle, Currying, Memoization, Pipe
- ✅ Know JS gotchas: reference vs copy, `==` weirdness, `typeof` quirks, hoisting, `this` binding
- ✅ Solve three realistic coding challenges (SDET take-home level)

---

## 📁 File Structure

| # | File | Topic |
|---|------|-------|
| 01 | `01_all_loop_types.js` | for, for...of, for...in, while, do...while, break/continue, labeled loops |
| 02 | `02_async_loop_patterns.js` | Sequential vs parallel, forEach mistake, retry, pagination, batching |
| 03 | `03_iterators_generators.js` | Iterables, custom iterators, generator functions, test data generators |
| 04 | `04_real_world_patterns_1.js` | Config Builder, Data Factory, Fluent Builder, Event Emitter |
| 05 | `05_real_world_patterns_2.js` | Debounce, Throttle, Currying, Memoization, Pipe |
| 06 | `06_javascript_gotchas.js` | Reference vs copy, == weirdness, typeof, hoisting, this binding |
| 07 | `07_coding_challenges.js` | Data Pipeline, Report Generator, Message Center (all solved) |
| 08 | `08_practice_exercises.js` | Loop mastery (5 ways), code review, debug challenge, interview answers |

---

## 🚀 How to Run

```bash
cd javascript/day6
node 01_all_loop_types.js
node 02_async_loop_patterns.js
node 03_iterators_generators.js
node 04_real_world_patterns_1.js
node 05_real_world_patterns_2.js
node 06_javascript_gotchas.js
node 07_coding_challenges.js
node 08_practice_exercises.js
```

---

## 🤖 Automation Relevance

| Pattern | Use in Playwright |
|---------|-------------------|
| `for...of` + `await` | Sequential element interaction (click, verify, go back) |
| `Promise.all` + `.map()` | Parallel API validation, batch assertions |
| ❌ `forEach` + `async` | NEVER — doesn't wait for async work |
| Retry with backoff | Handle flaky clicks, network timeouts |
| Pagination loop | Scrape all pages of search results |
| Config Builder | Environment-specific test configurations |
| Data Factory | `createProduct({ price: 5000 })` — smart test data |
| `structuredClone()` | Isolate test data in `beforeEach` |
| Event Emitter | Understanding `page.on('dialog')` patterns |

---

## 📋 Key Takeaways

### Loop Rules
- `for...of` for arrays (async-safe) ⭐
- `for...in` for objects ONLY (never arrays)
- `while` for unknown iterations (retry, pagination)
- **NEVER** `forEach` with `async/await`

### Async Patterns
- **Sequential**: `for...of` + `await`
- **Parallel**: `Promise.all` + `.map()`
- **Fail-safe parallel**: `Promise.allSettled`
- **Batch**: `for` loop + `Promise.all` per batch

### Gotchas to Remember
- Spread `{...obj}` = shallow copy (nested refs shared!)
- `structuredClone()` = deep copy (fully independent)
- `NaN !== NaN` — use `Number.isNaN()`
- `typeof null === "object"` — use `=== null`
- `0.1 + 0.2 !== 0.3` — use `toBeCloseTo()`
- Arrow functions as object methods → `this` is wrong

---

## 🔗 Next Steps

**Day 7:** Consolidation + Mini-Project — combine everything from Module 2 into one practical JavaScript project 🚀
