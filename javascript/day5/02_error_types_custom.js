/**
 * ============================================
 * 02 - Error Types & Custom Error Classes
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * JavaScript has built-in error types, but
 * professional frameworks create CUSTOM errors
 * for meaningful failure messages in reports.
 * 
 * Run: node 02_error_types_custom.js
 */

console.log("═══════════════════════════════════════");
console.log("   ERROR TYPES & CUSTOM ERROR CLASSES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BUILT-IN ERROR TYPES
// ═══════════════════════════════════════
console.log("📌 BUILT-IN ERROR TYPES\n");

// JavaScript has several built-in error types.
// Each represents a specific category of problem.
// Knowing these helps you debug faster.

// Error        → generic base error (all others extend this)
// TypeError    → wrong type used (e.g., calling null.method())
// ReferenceError → accessing a variable that doesn't exist
// RangeError   → value outside allowed range
// SyntaxError  → invalid code structure (usually caught at parse time)

// Demonstration of each type:

const errorExamples = [
    {
        label: "Error (Generic)",
        fn: () => { throw new Error("Something went wrong"); }
    },
    {
        label: "TypeError",
        fn: () => { const x = null; x.toUpperCase(); }
    },
    {
        label: "RangeError",
        fn: () => { const arr = new Array(-1); }  // Negative array length
    },
    {
        label: "SyntaxError (via JSON.parse)",
        fn: () => { JSON.parse("{invalid}"); }
    },
    {
        label: "URIError",
        fn: () => { decodeURIComponent("%"); }    // Malformed URI
    }
];

for (const { label, fn } of errorExamples) {
    try {
        fn();
    } catch (error) {
        // Each error has .name and .message
        console.log(`  ${label}`);
        console.log(`    name:    ${error.name}`);
        console.log(`    message: ${error.message}\n`);
    }
}


// ═══════════════════════════════════════
// 2. CHECKING ERROR TYPE WITH instanceof
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 CHECKING ERROR TYPE WITH instanceof\n");

// In Java, you'd have multiple catch blocks:
//   catch (IOException e) { ... }
//   catch (SQLException e) { ... }
//
// In JavaScript, ONE catch block + instanceof checks:

function parseConfig(jsonString) {
    try {
        const config = JSON.parse(jsonString);

        // Validate required fields
        if (!config.baseURL) {
            throw new TypeError("baseURL is required in config");
        }
        if (config.timeout < 0) {
            throw new RangeError("timeout cannot be negative");
        }

        return config;
    } catch (error) {
        // Check which type of error occurred
        if (error instanceof SyntaxError) {
            console.log("  ❌ Invalid JSON format:", error.message);
        } else if (error instanceof TypeError) {
            console.log("  ❌ Missing required field:", error.message);
        } else if (error instanceof RangeError) {
            console.log("  ❌ Invalid value:", error.message);
        } else {
            console.log("  ❌ Unknown error:", error.message);
        }
        return null;
    }
}

// Test all scenarios
console.log("  Test 1 — Invalid JSON:");
parseConfig("not json");

console.log("  Test 2 — Missing baseURL:");
parseConfig('{"timeout": 5000}');

console.log("  Test 3 — Negative timeout:");
parseConfig('{"baseURL": "https://example.com", "timeout": -100}');

console.log("  Test 4 — Valid config:");
const validConfig = parseConfig('{"baseURL": "https://example.com", "timeout": 5000}');
console.log("  ✅ Valid config parsed:", validConfig);


// ═══════════════════════════════════════
// 3. CUSTOM ERROR CLASSES ⭐ (Framework Pattern)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ CUSTOM ERROR CLASSES\n");

// Professional frameworks don't use generic Error.
// They create CUSTOM error classes with extra context.
//
// Instead of: "Timeout 5000ms exceeded"
// You get:    "Element .product-title not found on ProductDetailPage"
//
// How: Create a class that EXTENDS Error

// Base error for the framework — all custom errors extend this
// Adds timestamp and testName to every error
class TestError extends Error {
    constructor(message, page, step) {
        // super() calls the parent Error constructor
        // This sets the .message property
        super(message);

        // .name should match the class name
        // Without this, all errors show as "Error"
        this.name = "TestError";

        // Custom properties — add any context you need!
        this.page = page;          // Which page was the test on?
        this.step = step;          // What step was being performed?
        this.timestamp = new Date().toISOString();  // When did it happen?
    }
}

// Specific error for element-not-found situations
class ElementNotFoundError extends TestError {
    constructor(selector, page) {
        // Build a descriptive message automatically
        super(
            `Element "${selector}" not found on ${page}`,
            page,
            "locate"
        );
        this.name = "ElementNotFoundError";
        this.selector = selector;   // Store the CSS selector that failed
    }
}

// Specific error for navigation failures
class NavigationError extends TestError {
    constructor(url, statusCode) {
        super(
            `Failed to navigate to ${url} (status: ${statusCode})`,
            url,
            "navigation"
        );
        this.name = "NavigationError";
        this.statusCode = statusCode;  // HTTP status code
    }
}

// Create and inspect a custom error
const navError = new NavigationError("https://b2b-platform.com/products", 500);

console.log("  NavigationError properties:");
console.log("    name:      ", navError.name);        // "NavigationError"
console.log("    message:   ", navError.message);     // "Failed to navigate to..."
console.log("    page:      ", navError.page);        // URL
console.log("    step:      ", navError.step);        // "navigation"
console.log("    statusCode:", navError.statusCode);  // 500
console.log("    timestamp: ", navError.timestamp);   // ISO date string

// Verify inheritance chain — instanceof works for parent classes too!
console.log("\n  Inheritance chain:");
console.log("    navError instanceof NavigationError:", navError instanceof NavigationError); // true
console.log("    navError instanceof TestError:      ", navError instanceof TestError);       // true
console.log("    navError instanceof Error:          ", navError instanceof Error);           // true


// ═══════════════════════════════════════
// 4. USING CUSTOM ERRORS IN TRY/CATCH
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 USING CUSTOM ERRORS IN TRY/CATCH\n");

// Simulate a B2B product page test
function simulateProductPageTest(productId) {
    // Simulate: page loads but element is missing
    if (productId === 99999) {
        throw new NavigationError(
            `https://b2b-platform.com/product/${productId}`,
            404
        );
    }
    if (productId === 12345) {
        throw new ElementNotFoundError(
            ".product-title",
            "ProductDetailPage"
        );
    }
    return { title: "Cotton Fabric", price: 250 };
}

// Test with different product IDs
const testProductIds = [100, 99999, 12345];

for (const id of testProductIds) {
    try {
        const product = simulateProductPageTest(id);
        console.log(`  Product ${id}: ✅ ${product.title} - $${product.price}`);
    } catch (error) {
        // Handle each custom error type differently
        if (error instanceof NavigationError) {
            console.log(`  Product ${id}: ❌ PAGE NOT FOUND (${error.statusCode})`);
            console.log(`    → ${error.message}`);
        } else if (error instanceof ElementNotFoundError) {
            console.log(`  Product ${id}: ❌ ELEMENT MISSING`);
            console.log(`    → Selector: ${error.selector}`);
            console.log(`    → Page: ${error.page}`);
        } else {
            console.log(`  Product ${id}: ❌ ${error.message}`);
        }
    }
}


// ═══════════════════════════════════════
// 5. ERROR HIERARCHY PATTERN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 ERROR HIERARCHY PATTERN\n");

// In a real framework, you'd have a hierarchy like this:
//
// Error (built-in)
//   └── FrameworkError (base for your framework)
//         ├── LoginError (login-specific)
//         ├── SearchError (search-specific)
//         ├── APIError (API-specific)
//         └── ElementNotFoundError (element-specific)
//
// This mirrors Java's exception hierarchy:
// Exception → RuntimeException → NullPointerException, etc.

// Complete framework error hierarchy:

// Base framework error
class FrameworkError extends Error {
    constructor(message, testName = "unknown") {
        super(message);
        this.name = "FrameworkError";
        this.testName = testName;
        this.timestamp = new Date().toISOString();
    }
}

// Login-specific error
class LoginError extends FrameworkError {
    constructor(username, reason) {
        super(`Login failed for user "${username}": ${reason}`, "LoginTest");
        this.name = "LoginError";
        this.username = username;
        this.reason = reason;
    }
}

// Search-specific error
class SearchError extends FrameworkError {
    constructor(searchQuery, filterApplied = "none") {
        super(
            `Search failed for query "${searchQuery}" with filter "${filterApplied}"`,
            "SearchTest"
        );
        this.name = "SearchError";
        this.searchQuery = searchQuery;
        this.filterApplied = filterApplied;
    }
}

// API-specific error
class APIError extends FrameworkError {
    constructor(statusCode, endpoint, method = "GET") {
        super(
            `API ${method} ${endpoint} returned ${statusCode}`,
            "APITest"
        );
        this.name = "APIError";
        this.statusCode = statusCode;
        this.endpoint = endpoint;
        this.method = method;
    }
}

// Demonstrate the hierarchy
const errors = [
    new LoginError("admin", "Invalid password"),
    new SearchError("cotton fabric", "category=textiles"),
    new APIError(503, "/api/products", "POST")
];

for (const err of errors) {
    console.log(`  [${err.name}]`);
    console.log(`    Message:   ${err.message}`);
    console.log(`    Test:      ${err.testName}`);
    console.log(`    Timestamp: ${err.timestamp}`);

    // Show extra properties based on type
    if (err instanceof LoginError) {
        console.log(`    Username:  ${err.username}`);
    } else if (err instanceof SearchError) {
        console.log(`    Query:     ${err.searchQuery}`);
        console.log(`    Filter:    ${err.filterApplied}`);
    } else if (err instanceof APIError) {
        console.log(`    Status:    ${err.statusCode}`);
        console.log(`    Endpoint:  ${err.endpoint}`);
        console.log(`    Method:    ${err.method}`);
    }
    console.log();
}


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📋 ERROR TYPES & CUSTOM ERRORS SUMMARY\n");

console.log("  Built-in types:");
console.log("    • Error       → generic base error");
console.log("    • TypeError   → wrong type used");
console.log("    • RangeError  → value out of range");
console.log("    • SyntaxError → invalid code/JSON");

console.log("\n  Custom errors:");
console.log("    • Extend Error (or your base error class)");
console.log("    • Set this.name = 'YourErrorName'");
console.log("    • Add context: page, selector, statusCode, etc.");
console.log("    • Use instanceof to check type in catch blocks");
console.log("    • Build a hierarchy: FrameworkError → LoginError, SearchError...");

console.log("\n═══════════════════════════════════════\n");
