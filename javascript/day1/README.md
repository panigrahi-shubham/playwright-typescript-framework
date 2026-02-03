# 📘 Day 1: JavaScript Foundations for Automation

**Date:** February 1, 2025  
**Goal:** Master variables, data types & console methods for Playwright automation

---

## 🎯 Learning Objectives

By the end of Day 1, you will:
- ✅ Understand `const`, `let`, and why we avoid `var`
- ✅ Know all JavaScript data types and when to use them
- ✅ Master console methods for debugging
- ✅ Apply these concepts in automation context

---

## 📁 File Structure

| # | File | Topic |
|---|------|-------|
| 01 | `01_hello_world.js` | Your first JavaScript program |
| 02 | `02_variables_basics.js` | const, let, var explained |
| 03 | `03_data_types.js` | Numbers, strings, booleans, null, undefined |
| 04 | `04_strings_deep_dive.js` | String methods & template literals |
| 05 | `05_objects_and_arrays.js` | Complex data structures |
| 06 | `06_console_methods.js` | Debugging with console API |
| 07 | `07_automation_variables.js` | Real-world Playwright examples |
| 08 | `08_practice_exercises.js` | Hands-on coding challenges |

---

## 🚀 How to Run

```bash
# Run any file with Node.js
node 01_hello_world.js

# Run specific file
node 07_automation_variables.js
```

---

## 📝 Quick Reference

### Variables Cheat Sheet
```javascript
const CONFIG_URL = "https://example.com";  // ✅ Use 90% - Cannot reassign
let pageTitle = "Home";                     // ✅ Use 10% - Can reassign
var oldWay = "avoid";                       // ❌ Never use - Has bugs
```

### Data Types
| Type | Example | Use Case |
|------|---------|----------|
| `string` | `"hello"` | URLs, selectors, messages |
| `number` | `42`, `3.14` | Timeouts, counts, ports |
| `boolean` | `true`/`false` | Test flags, conditions |
| `null` | `null` | Empty API response |
| `undefined` | `undefined` | Uninitialized variable |
| `object` | `{key: value}` | Config, test data |
| `array` | `[1, 2, 3]` | Lists, test cases |

---

## 🔗 Next Steps

**Day 2:** Operators & Conditionals (`if/else`, comparison operators)
