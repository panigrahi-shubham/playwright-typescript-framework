/**
 * ============================================
 * 02 — tsconfig.json Deep Dive
 * ============================================
 *
 * Day 11: Advanced Patterns, tsconfig & Wrap-Up
 * Understanding every important tsconfig option,
 * strictNullChecks, path aliases, and how to
 * read/write .d.ts declaration files.
 *
 * Run: npx ts-node 02_tsconfig_deepdive.ts
 */

console.log("═══════════════════════════════════════");
console.log("   TSCONFIG.JSON DEEP DIVE");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. WHAT tsconfig.json CONTROLS
// ═══════════════════════════════════════
console.log("📌 What tsconfig.json Answers\n");

console.log("  Three core questions tsconfig answers:");
console.log("  1. Which files to compile?   → include / exclude");
console.log("  2. What JS version to output? → target + module");
console.log("  3. How strict is type checking? → strict options\n");

console.log("  Current project tsconfig.json:");
console.log("  ─────────────────────────────────────");
console.log("  {");
console.log("    \"compilerOptions\": {");
console.log("      \"target\": \"ES2022\",        → output JS version");
console.log("      \"module\": \"commonjs\",       → Node.js module system");
console.log("      \"strict\": true,              → ALL strict checks on");
console.log("      \"rootDir\": \"./src\",          → source TS files");
console.log("      \"outDir\": \"./dist\",          → compiled JS output");
console.log("      \"esModuleInterop\": true,      → clean import syntax");
console.log("      \"skipLibCheck\": true          → skip .d.ts checking");
console.log("    }");
console.log("  }");


// ═══════════════════════════════════════
// 2. STRICT MODE — Why It Matters
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 strict: true — The Single Most Important Option\n");

console.log("  'strict: true' enables ALL of these at once:");
console.log("  ┌─────────────────────────────┬─────────────────────────────────────┐");
console.log("  │ Option                      │ What it catches                      │");
console.log("  ├─────────────────────────────┼─────────────────────────────────────┤");
console.log("  │ strictNullChecks            │ null/undefined use without checking  │");
console.log("  │ noImplicitAny               │ untyped parameters/variables         │");
console.log("  │ strictFunctionTypes         │ wrong callback parameter types       │");
console.log("  │ strictPropertyInitialization│ class props not initialized          │");
console.log("  │ noImplicitThis              │ 'this' without a type context        │");
console.log("  │ strictBindCallApply         │ wrong args to .bind()/.call()        │");
console.log("  └─────────────────────────────┴─────────────────────────────────────┘");
console.log("\n  💡 Without strict:true, TypeScript is significantly weaker.");
console.log("     Always keep it on. It catches real bugs before runtime.");


// ═══════════════════════════════════════
// 3. strictNullChecks — MOST IMPORTANT STRICT OPTION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 strictNullChecks — Null Safety\n");

// Playwright's .textContent() returns string | null
// Without strictNullChecks, you can pass it directly — CRASH at runtime
// With strictNullChecks, you MUST handle null:

function getPageTitle(maybeTitle: string | null): string {
    // Option 1: nullish coalescing (preferred — safe)
    const safe = maybeTitle ?? "No Title";

    // Option 2: optional chaining
    const length = maybeTitle?.length ?? 0;

    // Option 3: explicit null guard
    if (maybeTitle === null) {
        return "No Title";
    }
    return maybeTitle;
}

console.log("  getPageTitle('Cotton Shirts'):", getPageTitle("Cotton Shirts"));
console.log("  getPageTitle(null):", getPageTitle(null));

// The non-null assertion operator (!) — use sparingly:
function dangerousGet(value: string | null): string {
    // return value!;    // Tells TS "I guarantee it's not null"
    // But if value IS null → runtime crash!
    // DON'T: return value!;
    // DO: return value ?? "fallback";
    return value ?? "fallback";
}

console.log("\n  ┌─────────────────────┬──────────────────────────────────────────┐");
console.log("  │ Pattern             │ Use Case                                 │");
console.log("  ├─────────────────────┼──────────────────────────────────────────┤");
console.log("  │ value ?? 'default'  │ Provide fallback for null/undefined      │");
console.log("  │ value?.property     │ Safe access (undefined if null)          │");
console.log("  │ if (value !== null) │ Explicit null check — safest             │");
console.log("  │ value!              │ Non-null assert — UNSAFE, use sparingly  │");
console.log("  └─────────────────────┴──────────────────────────────────────────┘");


// ═══════════════════════════════════════
// 4. TARGET AND MODULE OPTIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 target and module Options\n");

console.log("  target — what JavaScript version to output:");
console.log("  ┌──────────────┬──────────────────────────────────────────────┐");
console.log("  │ target       │ Generates code using...                      │");
console.log("  ├──────────────┼──────────────────────────────────────────────┤");
console.log("  │ ES5          │ Old syntax (var, no arrow fns) — avoid       │");
console.log("  │ ES2015/ES6   │ let/const, arrow fns, classes, Promises      │");
console.log("  │ ES2022       │ async/await, optional chaining, at() — use!  │");
console.log("  │ ESNext       │ Latest everything — fine for Node.js 18+     │");
console.log("  └──────────────┴──────────────────────────────────────────────┘");

console.log("\n  module — how imports/exports compile:");
console.log("  ┌──────────────┬──────────────────────────────────────────────┐");
console.log("  │ module       │ Generates...                                 │");
console.log("  ├──────────────┼──────────────────────────────────────────────┤");
console.log("  │ commonjs     │ require() / module.exports (Node.js default) │");
console.log("  │ ESNext       │ import / export (modern ES modules)          │");
console.log("  └──────────────┴──────────────────────────────────────────────┘");
console.log("  → For Playwright with Node.js: use ES2022 + commonjs");


// ═══════════════════════════════════════
// 5. PATH ALIASES — Clean Import Paths
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Path Aliases — Clean Imports\n");

console.log("  Without path aliases (ugly relative paths):");
console.log("  import { SearchPage } from '../../../pages/SearchPage';");
console.log("  import { config } from '../../utils/config';");
console.log("  import { ProductData } from '../../../test-data/products';");

console.log("\n  With path aliases (clean):");
console.log("  import { SearchPage } from '@pages/SearchPage';");
console.log("  import { config } from '@utils/config';");
console.log("  import { ProductData } from '@data/products';");

console.log("\n  tsconfig.json 'paths' config:");
console.log("  {");
console.log("    \"compilerOptions\": {");
console.log("      \"baseUrl\": \".\",");
console.log("      \"paths\": {");
console.log("        \"@pages/*\":  [\"src/pages/*\"],");
console.log("        \"@utils/*\":  [\"src/utils/*\"],");
console.log("        \"@data/*\":   [\"src/test-data/*\"],");
console.log("        \"@tests/*\":  [\"tests/*\"]");
console.log("      }");
console.log("    }");
console.log("  }");

console.log("\n  ⚠️ For ts-node / webpack / jest — also need:");
console.log("     tsconfig-paths or similar resolver plugin");
console.log("  ✅ For tsc compilation — paths in tsconfig.json is enough");


// ═══════════════════════════════════════
// 6. FULL PLAYWRIGHT tsconfig Template
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Full Playwright Project tsconfig.json Template\n");

const tsconfigTemplate = {
    compilerOptions: {
        // Output
        target: "ES2022",
        module: "commonjs",
        moduleResolution: "node",
        outDir: "./dist",
        rootDir: "./src",

        // Strictness — ALWAYS on
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noImplicitReturns: true,

        // Module resolution
        esModuleInterop: true,
        resolveJsonModule: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,

        // Path aliases
        baseUrl: ".",
        paths: {
            "@pages/*": ["src/pages/*"],
            "@utils/*": ["src/utils/*"],
            "@data/*": ["src/test-data/*"]
        },

        // Developer experience
        sourceMap: true,
        declaration: true   // generates .d.ts files
    },
    include: ["src/**/*", "tests/**/*"],
    exclude: ["node_modules", "dist"]
};

console.log("  tsconfig template:");
console.log(JSON.stringify(tsconfigTemplate, null, 4).split("\n").map(l => "  " + l).join("\n"));


// ═══════════════════════════════════════
// 7. DECLARATION FILES (.d.ts)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Declaration Files (.d.ts)\n");

console.log("  What .d.ts files are:");
console.log("  • Pure type information — no implementation code");
console.log("  • Tell TypeScript what a JavaScript library exports");
console.log("  • Enable autocomplete + type checking for JS libs\n");

console.log("  Playwright's types live in: node_modules/@playwright/test/types/");
console.log("  This is WHY you get autocomplete for page.goto(), page.fill() etc.\n");

console.log("  Simplified playwright.d.ts:");
console.log("  ─────────────────────────────────────");
console.log("  export interface Page {");
console.log("    goto(url: string): Promise<Response | null>;");
console.log("    fill(selector: string, value: string): Promise<void>;");
console.log("    locator(selector: string): Locator;");
console.log("    title(): Promise<string>;");
console.log("  }");
console.log("  export interface Locator {");
console.log("    click(): Promise<void>;");
console.log("    textContent(): Promise<string | null>;  ← returns null!");
console.log("    count(): Promise<number>;");
console.log("  }\n");

console.log("  When a JS lib has no types → install @types package:");
console.log("  npm install --save-dev @types/node");
console.log("  npm install --save-dev @types/lodash\n");

console.log("  Playwright has BUILT-IN types — no @types needed.");

// Write your own .d.ts (for untyped modules):
// custom-reporter.d.ts:
// declare module "custom-test-reporter" {
//     export interface ReportConfig { outputDir: string; format: "html" | "json"; }
//     export function generateReport(config: ReportConfig): Promise<void>;
// }
console.log("\n  To type an untyped library: create custom-reporter.d.ts");
console.log("  declare module 'custom-test-reporter' {");
console.log("    export function generateReport(config: ReportConfig): Promise<void>;");
console.log("  }");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TSCONFIG SUMMARY\n");

console.log("  • strict: true         → ALWAYS on — enables all strict checks");
console.log("  • target: 'ES2022'     → modern JS output for Node.js 18+");
console.log("  • module: 'commonjs'   → require() style (Playwright/Node default)");
console.log("  • strictNullChecks     → null safety — forces ?? / if-null handling");
console.log("  • paths                → @pages, @utils, @data import aliases");
console.log("  • sourceMap: true      → debugger works with original TS code");
console.log("  • declaration: true    → generates .d.ts for your own library");
console.log("  • .d.ts files          → type contracts Playwright, Node, libs");
console.log("  • @types/node          → types for built-in Node.js APIs");

console.log("\n═══════════════════════════════════════\n");

export { };
