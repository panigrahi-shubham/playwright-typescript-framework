# Day 2 - Data Types & Operators

**Date:** Tuesday, Feb 4  
**Time:** 19:00-21:00

## 📚 Topics Covered

### Primitive Types
- `string` - Text data (most common in automation)
- `number` - Numeric values (timeouts, prices, counts)
- `boolean` - True/false (test conditions, flags)

### Reference Types
- `array` - Ordered collections (test browsers, users, URLs)
- `object` - Key-value pairs (config, selectors, test data)

### Template Literals
- Modern string syntax with backticks (`)
- Embed expressions with `${expression}`
- Multi-line strings without escape characters
- Perfect for URLs, selectors, and log messages

### Operators
- `===` and `!==` - Strict equality/inequality
- `>`, `<`, `>=`, `<=` - Comparison operators
- `&&` - Logical AND (both must be true)
- `||` - Logical OR (one must be true)
- `!` - Logical NOT (inverts boolean)

### Truthy/Falsy Values
- **Falsy (6 values):** `false`, `0`, `""`, `null`, `undefined`, `NaN`
- **Truthy:** Everything else (including `[]` and `{}`)

---

## 📁 Files

| File | Description |
|------|-------------|
| `01_primitive_types.js` | String, number, boolean deep dive |
| `02_reference_types.js` | Arrays and objects with nested structures |
| `03_template_literals.js` | Modern string syntax for automation |
| `04_operators.js` | Comparison and logical operators |
| `05_truthy_falsy.js` | Understanding type coercion |
| `06_lab_test_data.js` | Lab: Create test data variables |

---

## 🚀 How to Run

```bash
# Navigate to day2 folder
cd javascript/day2

# Run any file
node 01_primitive_types.js
node 02_reference_types.js
node 03_template_literals.js
node 04_operators.js
node 05_truthy_falsy.js
node 06_lab_test_data.js
```

---

## 🤖 Automation Relevance

| Concept | Use in Automation |
|---------|-------------------|
| Strings | URLs, selectors, test data, credentials |
| Numbers | Timeouts, retries, port numbers, prices |
| Booleans | Test flags, headless mode, conditions |
| Arrays | Test browsers, multiple users, URLs |
| Objects | Config objects, page locators, test data |
| Template Literals | Dynamic URLs, selectors, log messages |
| Operators | Assertions, conditions, validations |
| Truthy/Falsy | Checking element existence, defaults |

---

## ✅ Key Takeaways

1. **Always use `===`** instead of `==` for comparisons
2. **Template literals** with backticks make string building cleaner
3. **Objects** are perfect for organizing test data and selectors
4. **Arrays** work great for lists of browsers, users, or test cases
5. **Remember the 6 falsy values** - watch out for `0` and `""`
6. **Use `??`** for defaults when `0` or `""` are valid values

---

## 📝 Commit

```bash
git add .
git commit -m "Day 2: Data types and operators"
```
