# 📘 Day 7: Objects, Classes & Async/Await

**Date:** February 15, 2026  
**Goal:** Master objects, build classes for POM, and understand async/await — the bridge to Playwright

---

## 🎯 Learning Objectives

By the end of Day 7, you will:
- ✅ Create objects, access properties (dot & bracket), and use nested objects
- ✅ Destructure objects and arrays (essential for Playwright)
- ✅ Use object methods, `this` keyword, spread operator, and JSON
- ✅ Build classes with constructors, methods, getters, setters, and static methods
- ✅ Implement inheritance with `extends` and `super()` — POM foundation
- ✅ Understand Promises (states, `.then()/.catch()`)
- ✅ Write `async/await` code — sequential, parallel, and error handling
- ✅ Know why `forEach` + `async` is WRONG and what to use instead

---

## 📁 File Structure

| # | File | Topic |
|---|------|-------|
| 01 | `01_objects_basics.js` | Object literals, dot/bracket access, nested objects, Java comparison |
| 02 | `02_object_destructuring.js` | Destructuring, renaming, defaults, nested, Playwright relevance |
| 03 | `03_object_methods_this.js` | Methods, `this`, spread operator, Object.keys/values/entries, JSON |
| 04 | `04_classes_basics.js` | Class syntax, constructor, getters/setters, static methods |
| 05 | `05_classes_inheritance.js` | extends, super(), method overriding, POM preview |
| 06 | `06_promises_basics.js` | Async concept, Promise states, .then()/.catch(), chaining |
| 07 | `07_async_await.js` | async/await, sequential vs parallel, forEach bug, Playwright preview |
| 08 | `08_practice_exercises.js` | 5 exercises + debug challenge |

---

## 🚀 How to Run

```bash
cd javascript/day7
node 01_objects_basics.js
node 02_object_destructuring.js
node 03_object_methods_this.js
node 04_classes_basics.js
node 05_classes_inheritance.js
node 06_promises_basics.js
node 07_async_await.js
node 08_practice_exercises.js
```

---

## 🤖 Automation Relevance

| Concept | Use in Playwright |
|---------|-------------------|
| Objects | Every element, config, and API response is an object |
| Destructuring | `const { test, expect } = require(...)`, test fixtures `({ page })` |
| `this` keyword | Access locators and page inside class methods |
| Spread operator | Merge configs, extend test data |
| JSON | API request/response bodies |
| Classes + Inheritance | Page Object Model — BasePage → SearchPage, LoginPage |
| async/await | EVERY Playwright command needs `await` |
| Promise.all | Parallel API calls, parallel assertions |
| for...of + await | Sequential page interactions |

---

## 📋 Quick Reference

### Object Operations
| Operation | Syntax |
|-----------|--------|
| Create | `const obj = { key: value }` |
| Access | `obj.key` or `obj["key"]` |
| Add | `obj.newKey = value` |
| Delete | `delete obj.key` |
| Check exists | `"key" in obj` |
| Safe access | `obj?.nested?.deep` |
| Copy/Merge | `{ ...obj1, ...obj2 }` |

### Class Syntax
| Feature | Syntax |
|---------|--------|
| Define | `class ClassName { }` |
| Constructor | `constructor(args) { this.prop = args }` |
| Method | `methodName() { }` |
| Getter | `get propName() { }` |
| Static | `static methodName() { }` |
| Inherit | `class Child extends Parent { }` |
| Call parent | `super()` in constructor, `super.method()` |

### Async Rules
| Pattern | Use |
|---------|-----|
| Sequential | `for...of` + `await` |
| Parallel | `Promise.all()` + `.map()` |
| Racing | `Promise.race()` — first wins |
| Error handling | `try/catch` (same as Java!) |
| ❌ NEVER | `forEach` + `async` |

---

## 🔗 Next Steps

**Day 8:** TypeScript fundamentals — types, interfaces, and everything you need for professional Playwright tests 🚀
