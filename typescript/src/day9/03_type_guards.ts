/**
 * ============================================
 * 03 — Type Guards
 * ============================================
 *
 * Day 9: Interfaces, Type Guards & Advanced Types
 * Type guards are conditional checks that tell
 * TypeScript what TYPE a variable is inside a block.
 * This is called "type narrowing."
 *
 * Run: npx ts-node 03_type_guards.ts
 */

console.log("═══════════════════════════════════════");
console.log("   TYPE GUARDS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. typeof GUARD — NARROWING PRIMITIVES
// ═══════════════════════════════════════
console.log("📌 typeof Guard\n");

// typeof works for primitive types: string, number, boolean, undefined, object, function

function formatValue(value: string | number | boolean): string {
    if (typeof value === "string") {
        // TypeScript KNOWS value is string here → .toUpperCase() available
        return value.toUpperCase();
    } else if (typeof value === "number") {
        // TypeScript KNOWS value is number here → .toFixed() available
        return value.toFixed(2);
    } else {
        // TypeScript KNOWS value is boolean here
        return value ? "Yes" : "No";
    }
}

console.log('  formatValue("cotton"):', formatValue("cotton"));      // "COTTON"
console.log("  formatValue(250.5):", formatValue(250.5));            // "250.50"
console.log("  formatValue(true):", formatValue(true));              // "Yes"

// Practical example: Playwright locators can accept string | number
function setInputValue(value: string | number): string {
    if (typeof value === "number") {
        return `await page.fill('#input', '${value.toString()}')`;
    } else {
        return `await page.fill('#input', '${value}')`;
    }
}

console.log("\n  setInputValue(250):", setInputValue(250));
console.log("  setInputValue('cotton'):", setInputValue("cotton"));


// ═══════════════════════════════════════
// 2. instanceof GUARD — NARROWING CLASSES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 instanceof Guard\n");

// instanceof checks if an object was created from a specific class
// Same keyword and concept as Java!

class SearchError extends Error {
    constructor(public query: string, message: string) {
        super(message);
        this.name = "SearchError";
    }
}

class APIError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = "APIError";
    }
}

function handleError(error: Error): string {
    if (error instanceof SearchError) {
        // TypeScript KNOWS error is SearchError → has .query
        return `🔍 Search failed for: "${error.query}" — ${error.message}`;
    } else if (error instanceof APIError) {
        // TypeScript KNOWS error is APIError → has .statusCode
        return `🌐 API error ${error.statusCode}: ${error.message}`;
    } else {
        return `❓ Unknown error: ${error.message}`;
    }
}

console.log("  " + handleError(new SearchError("cotton", "No results found")));
console.log("  " + handleError(new APIError(404, "Product not found")));
console.log("  " + handleError(new Error("Something went wrong")));

console.log("\n  💡 instanceof works same as Java — checks the class chain");


// ═══════════════════════════════════════
// 3. 'in' OPERATOR GUARD
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 'in' Operator Guard\n");

// Check if a property EXISTS in an object to narrow the type

interface SuccessResponse {
    status: "success";
    data: { results: string[]; count: number };
}

interface ErrorResponse {
    status: "error";
    errorCode: number;
    message: string;
}

type APIResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: APIResponse): string {
    if ("data" in response) {
        // TypeScript KNOWS this is SuccessResponse (only it has 'data')
        return `✅ Found ${response.data.count} results: [${response.data.results.join(", ")}]`;
    } else {
        // TypeScript KNOWS this is ErrorResponse
        return `❌ Error ${response.errorCode}: ${response.message}`;
    }
}

const success: SuccessResponse = {
    status: "success",
    data: { results: ["Cotton Shirt", "Silk Fabric"], count: 2 }
};

const failure: ErrorResponse = {
    status: "error",
    errorCode: 404,
    message: "Products not found"
};

console.log("  " + handleResponse(success));
console.log("  " + handleResponse(failure));


// ═══════════════════════════════════════
// 4. DISCRIMINATED UNIONS — THE MOST POWERFUL PATTERN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Discriminated Unions — The Most Powerful Pattern\n");

// When multiple types share a common property with DIFFERENT literal values,
// TypeScript can discriminate between them with a switch statement.

interface TextMessage {
    kind: "text";
    content: string;
    from: string;
}

interface ImageMessage {
    kind: "image";
    imageUrl: string;
    caption?: string;
    from: string;
}

interface FileMessage {
    kind: "file";
    fileName: string;
    fileSize: number;
    from: string;
}

type Message = TextMessage | ImageMessage | FileMessage;

function displayMessage(msg: Message): string {
    // Switch on the discriminant property ('kind')
    switch (msg.kind) {
        case "text":
            // TypeScript KNOWS msg is TextMessage → has .content
            return `💬 ${msg.from}: ${msg.content}`;
        case "image":
            // TypeScript KNOWS msg is ImageMessage → has .imageUrl
            return `🖼️ ${msg.from} sent image: ${msg.imageUrl}`;
        case "file":
            // TypeScript KNOWS msg is FileMessage → has .fileName, .fileSize
            return `📎 ${msg.from} sent ${msg.fileName} (${msg.fileSize} bytes)`;
    }
}

const messages: Message[] = [
    { kind: "text", content: "What's the MOQ for cotton?", from: "Buyer" },
    { kind: "image", imageUrl: "/samples/cotton-001.jpg", from: "Supplier" },
    { kind: "file", fileName: "price-list.pdf", fileSize: 245000, from: "Supplier" }
];

for (const msg of messages) {
    console.log("  " + displayMessage(msg));
}

console.log("\n  💡 The 'kind' property is the discriminant — each variant has a different literal value");
console.log("     Used heavily in Redux actions, API responses, event handling");


// ═══════════════════════════════════════
// 5. CUSTOM TYPE GUARD FUNCTIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Custom Type Guard Functions (the 'is' keyword)\n");

// For complex type checking, create reusable type guard functions
// The 'is' keyword tells TypeScript: "if this returns true, the variable is THIS type"

interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

// Custom type guard — returns 'obj is Product'
function isProduct(obj: unknown): obj is Product {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "name" in obj &&
        "price" in obj &&
        "inStock" in obj &&
        typeof (obj as Product).name === "string" &&
        typeof (obj as Product).price === "number" &&
        typeof (obj as Product).inStock === "boolean"
    );
}

// Usage — TypeScript narrows the type inside the if-block:
function processData(data: unknown): string {
    if (isProduct(data)) {
        // TypeScript KNOWS data is Product here! ✅
        return `Product: ${data.name}, Price: $${data.price}, In Stock: ${data.inStock}`;
    } else {
        return "Not a valid product";
    }
}

console.log("  " + processData({ name: "Cotton Shirt", price: 250, inStock: true }));
console.log("  " + processData({ name: "Silk", price: "expensive" }));
console.log("  " + processData("not an object"));
console.log("  " + processData(null));

console.log("\n  💡 The 'obj is Product' return type is the magic!");
console.log("     Extremely useful for validating API responses in tests:");
console.log("     const data: unknown = await response.json();");
console.log("     if (isProduct(data)) { /* fully type-safe! */ }");


// ═══════════════════════════════════════
// 6. JAVA ↔ TYPESCRIPT COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ TypeScript Type Guard Comparison\n");

console.log("  ┌─────────────────────────────┬───────────────────────────────────┐");
console.log("  │ Java                        │ TypeScript                        │");
console.log("  ├─────────────────────────────┼───────────────────────────────────┤");
console.log("  │ instanceof ClassName        │ instanceof ClassName (same!)      │");
console.log("  │ obj.getClass() == X         │ typeof value === 'string'         │");
console.log("  │ obj.hasProperty() (manual)  │ 'prop' in obj                     │");
console.log("  │ No equivalent               │ Discriminated unions (switch)     │");
console.log("  │ No equivalent               │ Custom: obj is Type (magic!)      │");
console.log("  └─────────────────────────────┴───────────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TYPE GUARDS SUMMARY\n");

console.log("  • typeof:       typeof x === 'string'  (primitives)");
console.log("  • instanceof:   error instanceof APIError  (classes)");
console.log("  • in:           'data' in response  (property check)");
console.log("  • Discriminated: switch(msg.kind)  (literal unions)");
console.log("  • Custom:       function isX(obj): obj is X  (reusable)");
console.log("  • 💡 Type guards = narrowing = telling TS 'trust me, it's THIS type'");
console.log("  • ⚠️ Prefer type guards over 'as' assertions — guards are runtime safe");

console.log("\n═══════════════════════════════════════\n");

export { };
