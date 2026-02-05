/**
 * ============================================
 * 02 - Loops (for & while)
 * ============================================
 * 
 * Day 3: Repeating actions
 * Run: node 02_loops.js
 */

console.log("═══════════════════════════════════════");
console.log("   LOOPS");
console.log("═══════════════════════════════════════\n");

// ═══════════════════════════════════════
// FOR LOOP (Most Common!)
// ═══════════════════════════════════════
console.log("📌 FOR LOOP\n");

// Basic syntax: for (init; condition; increment)
console.log("Basic for loop (0 to 4):");
for (let i = 0; i < 5; i++) {
    console.log(`  Iteration ${i}`);
}

// Looping through array
console.log("\n🤖 Loop through test browsers:");
const browsers = ["chromium", "firefox", "webkit"];

for (let i = 0; i < browsers.length; i++) {
    console.log(`  Testing on: ${browsers[i]}`);
}


// ═══════════════════════════════════════
// FOR...OF LOOP (Cleaner for arrays)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 FOR...OF LOOP (Preferred for arrays)\n");

const testUrls = [
    "/login",
    "/dashboard",
    "/settings"
];

for (const url of testUrls) {
    console.log(`  Visiting: ${url}`);
}


// ═══════════════════════════════════════
// WHILE LOOP
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 WHILE LOOP\n");

// Retry pattern (common in automation)
let attempts = 0;
const maxAttempts = 3;
let success = false;

console.log("Retry pattern:");
while (attempts < maxAttempts && !success) {
    attempts++;
    console.log(`  Attempt ${attempts}...`);

    // Simulate success on 3rd try
    if (attempts === 3) {
        success = true;
        console.log("  ✓ Success!");
    }
}


// ═══════════════════════════════════════
// BREAK & CONTINUE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 BREAK & CONTINUE\n");

// break - exit loop early
console.log("break - stop when found:");
const users = ["user1", "admin", "user2"];
for (const user of users) {
    if (user === "admin") {
        console.log(`  Found admin! Stopping.`);
        break;
    }
    console.log(`  Checking: ${user}`);
}

// continue - skip current iteration
console.log("\ncontinue - skip invalid:");
const ids = [1, -1, 2, -2, 3];
for (const id of ids) {
    if (id < 0) continue;
    console.log(`  Processing ID: ${id}`);
}


console.log("\n═══════════════════════════════════════\n");
