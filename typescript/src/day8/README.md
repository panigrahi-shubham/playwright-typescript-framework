# 📘 Day 8: TypeScript Fundamentals — Types, Inference & Annotations

**Date:** February 22, 2026  
**Goal:** Understand TypeScript's type system — the foundation for writing bulletproof Playwright tests

---

## 🎯 Learning Objectives

By the end of Day 8, you will:
- ✅ Write type annotations for primitives, arrays, functions, and objects
- ✅ Understand type inference and when to use it vs explicit annotations
- ✅ Use union types and type narrowing for flexible, safe code
- ✅ Create type aliases and understand `any` vs `unknown`
- ✅ Use enums (numeric and string) for named constants
- ✅ Work with tuples and type assertions
- ✅ Know why TypeScript powers Playwright's entire API

---

## 📁 File Structure

| # | File | Topic |
|---|------|-------|
| 01 | `01_type_annotations.ts` | Primitives, arrays, functions, objects, Java comparison |
| 02 | `02_type_inference.ts` | Inference rules, const vs let, when to annotate |
| 03 | `03_union_literal_types.ts` | Union types, narrowing, literal types, Playwright config |
| 04 | `04_type_aliases.ts` | `type` keyword, optional/readonly, `any` vs `unknown` |
| 05 | `05_enums.ts` | Numeric & string enums, enum vs literal, Java comparison |
| 06 | `06_tuples_assertions.ts` | Tuples, destructuring, `as` keyword, `as const` |
| 07 | `07_interview_problems.ts` | 5 solve-it-yourself interview problems |

---

## 🚀 How to Run

```bash
# From project root:
npx ts-node typescript/src/day8/01_type_annotations.ts
npx ts-node typescript/src/day8/02_type_inference.ts
npx ts-node typescript/src/day8/03_union_literal_types.ts
npx ts-node typescript/src/day8/04_type_aliases.ts
npx ts-node typescript/src/day8/05_enums.ts
npx ts-node typescript/src/day8/06_tuples_assertions.ts
npx ts-node typescript/src/day8/07_interview_problems.ts

# Compile all (type check only, no output):
npx tsc --project typescript/tsconfig.json --noEmit

# Compile to dist/ folder:
npx tsc --project typescript/tsconfig.json
```

---

## 🤖 Automation Relevance

| Concept | Use in Playwright |
|---------|-------------------|
| Type annotations | Every function parameter and return type is typed |
| Type inference | `const count = await page.locator('.item').count()` → inferred number |
| Union types | `string \| null` for optional locators, API responses |
| Literal types | `{ button: 'left' \| 'right' }`, `{ colorScheme: 'dark' \| 'light' }` |
| Type aliases | Custom types for test data, page objects, API payloads |
| Enums | Test environments, browser selection, test status |
| Tuples | Function returning `[success, message]` pairs |
| Type assertions | `await response.json() as ProductData` |
| `unknown` | Safe handling of raw API response bodies |

---

## 📋 Quick Reference Cheatsheet

### Type Annotations
| What | Syntax | Example |
|------|--------|---------|
| String | `let x: string` | `let name: string = "Shirt"` |
| Number | `let x: number` | `let price: number = 250` |
| Boolean | `let x: boolean` | `let active: boolean = true` |
| Array | `let x: string[]` | `let tags: string[] = []` |
| Function | `(a: T): R` | `(name: string): void` |
| Object | `{ key: type }` | `{ name: string; age: number }` |
| Optional | `key?: type` | `{ timeout?: number }` |
| Union | `A \| B` | `string \| number` |
| Literal | `"a" \| "b"` | `"chromium" \| "firefox"` |
| Tuple | `[T, U]` | `[string, number, boolean]` |

### Common Mistakes
| ❌ Mistake | Why Wrong | ✅ Fix |
|-----------|-----------|-------|
| `String` (uppercase) | JS wrapper object | `string` (lowercase) |
| `any` everywhere | Defeats TypeScript | Use specific types or `unknown` |
| `let x: number = 5` | Redundant annotation | `let x = 5` (infer it) |
| Missing param types | TS can't infer params | `(name: string)` always |

---

## 🎤 Interview Quick-Fire Answers

| Question | Key Points |
|----------|------------|
| What is TypeScript? | JS + static types, compiles to JS, types erased at runtime |
| Type inference? | TS deduces types from values; use for local vars, annotate params |
| Union type? | `string \| number` — variable holds one of several types |
| `any` vs `unknown`? | `any` skips checks (avoid), `unknown` forces check (use) |
| Literal types? | `"chromium" \| "firefox"` — restricts to exact values |
| Type assertions? | `as Type` — compile-time only, no runtime check |

---

## 🔗 Next Steps

**Day 9:** Interfaces, Type Guards & Advanced Types — where TypeScript really starts powering your Page Object Model 🚀
