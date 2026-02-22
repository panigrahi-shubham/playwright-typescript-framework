# Day 9 — TypeScript Interfaces, Type Guards & Advanced Types

**Module 3 (continued) | February 22, 2026**

---

## 📁 Files

| # | File | Topic |
|---|------|-------|
| 01 | `01_interfaces.ts` | Interface basics, optional/readonly, methods, extends, structural typing, index signatures |
| 02 | `02_interface_vs_type.ts` | Interface vs Type alias, declaration merging, extends vs &, practical rule |
| 03 | `03_type_guards.ts` | typeof, instanceof, `in` operator, discriminated unions, custom type guards (`is`) |
| 04 | `04_utility_types.ts` | Partial, Required, Pick, Omit, Record, combined patterns, test data factory |
| 05 | `05_generics_intro.ts` | Generic functions, generic interfaces, constraints, Java comparison |
| 06 | `06_interview_problems.ts` | Practice exercises, debug challenge, common mistakes |

---

## ▶️ How to Run

```bash
cd typescript/src/day9
npx ts-node 01_interfaces.ts
npx ts-node 02_interface_vs_type.ts
# ... etc
```

---

## 🔑 Key Concepts

- **Interfaces** — contracts that define object shapes (like Java interfaces but for data)
- **Structural Typing** — same shape = compatible (TypeScript) vs same name = compatible (Java)
- **Type Guards** — `typeof`, `instanceof`, `in`, discriminated unions, custom `is` guards
- **Utility Types** — `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`
- **Generics** — `<T>` type parameters for reusable functions and interfaces
- **Factory Pattern** — `Partial<T>` for test data with smart defaults

---

## 🎤 Interview One-Liner

> "I design my Playwright framework with TypeScript interfaces for type safety. I use interfaces for page objects with inheritance, typed test data with optional properties, and generic API response types with discriminated unions. I leverage Partial, Pick, and Omit to avoid duplicating type definitions."
