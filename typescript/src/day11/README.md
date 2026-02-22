# Day 11 — TypeScript Advanced Patterns, tsconfig & Module 3 Wrap-Up

**Module 3 (Final Day) | February 22, 2026**

---

## 📁 Files

| # | File | Topic |
|---|------|-------|
| 01 | `01_advanced_patterns.ts` | Mapped types, conditional types, template literal types, keyof/typeof, as const, assertion functions |
| 02 | `02_tsconfig_deepdive.ts` | tsconfig options, strict mode, strictNullChecks, path aliases, .d.ts files |
| 03 | `03_playwright_type_patterns.ts` | test() typing, fixtures with generics, as const debug, expect type safety, defineConfig |
| 04 | `04_interview_problems.ts` | Module 3 cheat sheet, type a framework, fix errors, as const debug challenge, Q&A |

---

## ▶️ How to Run

```bash
cd typescript/src/day11
npx ts-node 01_advanced_patterns.ts
npx ts-node 02_tsconfig_deepdive.ts
npx ts-node 03_playwright_type_patterns.ts
npx ts-node 04_interview_problems.ts
```

---

## 🔑 Key Concepts

- **Mapped Types** — `[K in keyof T]: T[K]` — how `Partial<T>`, `Readonly<T>` work under the hood
- **Conditional Types** — `T extends U ? X : Y` — ternary for types, `infer` keyword
- **Template Literal Types** — `` `on${Capitalize<Events>}` `` — enforce string patterns at type level
- **`keyof`** — gets all property names as a union (`"name" | "price" | ...`)
- **`typeof`** — derives a type from a runtime value  
- **`as const`** — freezes arrays/objects to literal types (most common gotcha fix)
- **Assertion functions** — `asserts value is T` — throws on invalid, narrows after call
- **`strict: true`** — single most important tsconfig option — always on!
- **`strictNullChecks`** — forces `??` or null checks before using `string | null`
- **Path aliases** — `@pages/*`, `@utils/*` — clean import paths via tsconfig `paths`
- **`.d.ts` files** — pure type declarations — why Playwright autocomplete works

---

## 🧠 Debug Challenge Answer

```typescript
// 🐛 Problem: typescript infers string[], not literal union
const data = { browsers: ["chromium", "firefox"] };
// ✅ Fix: freeze with as const
const data = { browsers: ["chromium", "firefox"] } as const;
type Browser = typeof data.browsers[number]; // "chromium" | "firefox"
```

---

## 🎤 Interview One-Liner

> "I configure TypeScript with strict mode, path aliases, and proper source structure. I understand mapped types, keyof, typeof, and as const. I can read Playwright's type definitions and understand how its fixture system uses generics."

---

## 📋 Module 3 Complete Summary

| Day | Topic | Key Takeaway |
|-----|-------|-------------|
| Day 8 | Types, Inference, Annotations | Basic types, unions, enums, `unknown`, tuples |
| Day 9 | Interfaces, Type Guards, Utility Types | Structural typing, discriminated unions, Partial/Pick/Omit |
| Day 10 | Classes, Access Modifiers, Patterns | Parameter properties, abstract BasePage, factory/builder/singleton |
| Day 11 | Advanced Patterns, tsconfig, Playwright Types | Mapped types, `keyof`/`typeof`, `as const`, tsconfig, fixtures |
