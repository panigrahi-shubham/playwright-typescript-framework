# Day 10 — TypeScript Classes, Access Modifiers & Page Objects

**Module 3 (continued) | February 22, 2026**

---

## 📁 Files

| # | File | Topic |
|---|------|-------|
| 01 | `01_classes_access_modifiers.ts` | Class basics, public/protected/private, #private, inheritance |
| 02 | `02_parameter_properties_getters.ts` | Parameter properties, get/set, static members, readonly |
| 03 | `03_abstract_classes.ts` | Abstract classes, extends + implements, template method pattern |
| 04 | `04_framework_patterns.ts` | Factory, Builder, Singleton, API Client design patterns |
| 05 | `05_interview_problems.ts` | Practice exercises, debug challenge, common mistakes |

---

## ▶️ How to Run

```bash
cd typescript/src/day10
npx ts-node 01_classes_access_modifiers.ts
npx ts-node 02_parameter_properties_getters.ts
# ... etc
```

---

## 🔑 Key Concepts

- **Access Modifiers** — public (default), protected (class + subclass), private (class only)
- **Parameter Properties** — `constructor(private page: Page)` auto-declares + assigns
- **Getters/Setters** — `get name()` / `set price(v)` — accessed like properties
- **Static Members** — Class-level, no `new` needed — `TestUtils.generateId()`
- **Abstract Classes** — Blueprint with shared logic + abstract method contracts
- **Design Patterns** — Factory\<T\>, Builder (.withX().build()), Singleton, API Client

---

## 🎤 Interview One-Liner

> "I build my Playwright framework with TypeScript classes using proper encapsulation — private for internal state, protected for inheritance, public for the test API. My BasePage is abstract with shared methods and abstract contracts. I use generics for reusable factories, Builder pattern for configs, and Singleton for framework settings."
