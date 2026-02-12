# 📘 Day 3: Conditionals & Loops

**Date:** February 12, 2026  
**Goal:** Master decision-making and repetition — the core of test automation logic

---

## 🎯 Learning Objectives

By the end of Day 3, you will:
- ✅ Write `if/else if/else` chains and nested conditions
- ✅ Use ternary operators and `switch` statements
- ✅ Apply truthy/falsy values in conditionals
- ✅ Write `for`, `for...of`, `for...in`, `while`, and `do...while` loops
- ✅ Use array methods: `map`, `filter`, `find`, `some`, `every`, `reduce`
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
| 08 | `08_practical_patterns.js` | Guard clauses, retry, pagination, batching |
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

## 🤖 Automation Relevance

| Concept | Use in Automation |
|---------|-------------------|
| if/else | Check element visibility, handle test outcomes |
| Ternary | Set config based on environment (CI vs local) |
| switch | Route browser-specific settings |
| Truthy/falsy | Validate API responses, check element existence |
| for loops | Iterate test data, click through pagination |
| while | Retry flaky operations, wait for conditions |
| Array methods | Process test results, filter failures, build reports |
| break/continue | Stop at first failure, skip known issues |

---

## 📋 Quick Reference

### Loop Comparison
| Loop | Best For |
|------|----------|
| `for` | Index control, known count |
| `for...of` | Array values (modern, preferred) |
| `for...in` | Object keys (NOT for arrays) |
| `while` | Unknown iterations, conditions |
| `do...while` | Need at least 1 execution |

### Array Methods
| Method | Returns | Purpose |
|--------|---------|---------|
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
