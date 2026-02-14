/**
 * ============================================
 * 07 - Coding Challenges: Data Pipeline,
 *      Report Generator & Message Center
 * ============================================
 * 
 * Day 6: Loops Deep Dive, Iterators & Patterns
 * Three realistic challenges that combine
 * everything from Days 2–6. These are the kind
 * of problems in SDET take-home assignments.
 * 
 * Run: node 07_coding_challenges.js
 */

console.log("═══════════════════════════════════════");
console.log("   CODING CHALLENGES — ALL SOLVED");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// CHALLENGE 1: DATA PROCESSING PIPELINE
// ═══════════════════════════════════════
console.log("📌 CHALLENGE 1: DATA PROCESSING PIPELINE\n");

// Given: raw API response from search (messy data)
const rawAPIResponse = {
    status: 200,
    data: {
        totalResults: 156,
        page: 1,
        results: [
            {
                id: 101, name: "  Cotton Fabric  ", price: "250.00", moq: "100",
                category: "textiles",
                supplier: { name: "TexPro", rating: "4.8", verified: "true" }
            },
            {
                id: 102, name: "LED Panel ", price: "invalid", moq: "50",
                category: "electronics",
                supplier: { name: "LightCo", rating: "3.2", verified: "false" }
            },
            {
                id: 103, name: " Steel Bolt", price: "15.50", moq: "5000",
                category: "hardware",
                supplier: null
            },
            {
                id: 104, name: "Silk Thread", price: "120.00", moq: "200",
                category: "textiles",
                supplier: { name: "SilkWeave", rating: "4.5", verified: "true" }
            },
            {
                id: 105, name: "  ", price: "300.00", moq: "75",
                category: "textiles",
                supplier: { name: "FabricHub", rating: "4.1", verified: "true" }
            }
        ]
    }
};

function processSearchResults(response) {
    // Step 1: Safely extract results array
    // Optional chaining handles missing/null data at any level
    const rawResults = response?.data?.results ?? [];

    return rawResults
        // Step 2: Clean each product
        .map(product => ({
            id: product.id,
            name: product.name?.trim() ?? "",                   // Trim whitespace
            price: parseFloat(product.price) || NaN,            // Parse string → number
            moq: parseInt(product.moq) || 0,                   // Parse string → integer
            category: product.category?.toUpperCase() ?? "UNKNOWN",
            supplierName: product.supplier?.name ?? null,
            supplierRating: parseFloat(product.supplier?.rating) || 0,
            isVerifiedSupplier: product.supplier?.verified === "true"
        }))

        // Step 3: Filter out invalid products
        .filter(product => {
            // Must have a non-empty name
            if (!product.name) return false;
            // Price must be a valid number
            if (isNaN(product.price)) return false;
            // Must have a supplier
            if (!product.supplierName) return false;
            return true;
        })

        // Step 4: Sort by price (lowest first)
        .sort((a, b) => a.price - b.price);
}

const cleanProducts = processSearchResults(rawAPIResponse);

console.log(`  Input: ${rawAPIResponse.data.results.length} raw products`);
console.log(`  Output: ${cleanProducts.length} clean products (filtered & sorted)\n`);

for (const p of cleanProducts) {
    const verified = p.isVerifiedSupplier ? "✅" : "⚠️";
    console.log(`  ${p.id} | ${p.name.padEnd(15)} | $${String(p.price).padEnd(7)} | ${p.category.padEnd(11)} | ${p.supplierName} ${verified}`);
}

// Edge case: handle null/undefined responses gracefully
console.log(`\n  Edge case — null response: ${processSearchResults(null).length} results (no crash!)`);
console.log(`  Edge case — empty data:    ${processSearchResults({ data: null }).length} results`);


// ═══════════════════════════════════════
// CHALLENGE 2: TEST REPORT GENERATOR
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n📌 CHALLENGE 2: TEST REPORT GENERATOR\n");

const testResults = [
    { name: "Login - Valid credentials", status: "pass", duration: 2300, browser: "chromium" },
    { name: "Login - Invalid password", status: "pass", duration: 1800, browser: "chromium" },
    { name: "Search - Basic query", status: "pass", duration: 3100, browser: "chromium" },
    { name: "Search - Empty query", status: "fail", duration: 5000, browser: "chromium", error: "Timeout" },
    { name: "Search - With filters", status: "pass", duration: 4200, browser: "firefox" },
    { name: "PDP - Load product", status: "pass", duration: 2900, browser: "firefox" },
    { name: "PDP - Contact supplier", status: "fail", duration: 6000, browser: "firefox", error: "Button not found" },
    { name: "PDP - Image gallery", status: "skip", duration: 0, browser: "webkit" },
    { name: "Message - Send message", status: "pass", duration: 3500, browser: "webkit" },
    { name: "Message - Read receipt", status: "fail", duration: 5500, browser: "webkit", error: "Assertion failed" }
];

function generateReport(results) {
    // Summary — uses reduce to count in a single pass
    const counts = results.reduce((acc, { status }) => {
        acc[status] = (acc[status] ?? 0) + 1;
        return acc;
    }, {});

    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
    const total = results.length;

    const summary = {
        total,
        passed: counts.pass ?? 0,
        failed: counts.fail ?? 0,
        skipped: counts.skip ?? 0,
        passRate: `${((counts.pass ?? 0) / total * 100).toFixed(1)}%`,
        totalDuration: `${(totalDuration / 1000).toFixed(1)}s`
    };

    // By browser — reduce to group results
    const byBrowser = results.reduce((acc, { browser, status }) => {
        if (!acc[browser]) {
            acc[browser] = { total: 0, passed: 0, failed: 0, skipped: 0 };
        }
        acc[browser].total++;
        if (status === "pass") acc[browser].passed++;
        if (status === "fail") acc[browser].failed++;
        if (status === "skip") acc[browser].skipped++;
        return acc;
    }, {});

    // Clean up — remove zero counts for cleaner output
    for (const browser of Object.values(byBrowser)) {
        if (browser.skipped === 0) delete browser.skipped;
    }

    // Failures — filter + map
    const failures = results
        .filter(r => r.status === "fail")
        .map(({ name, browser, error }) => ({ name, browser, error }));

    // Slowest tests — sort by duration descending, take top 3
    const slowestTests = [...results]                        // Spread to avoid mutating original!
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 3)
        .map(({ name, duration }) => ({
            name,
            duration: `${(duration / 1000).toFixed(1)}s`
        }));

    return { summary, byBrowser, failures, slowestTests };
}

const report = generateReport(testResults);

// Display the report
console.log("  ═══ TEST EXECUTION REPORT ═══\n");

console.log("  📊 Summary:");
console.log(`    Total: ${report.summary.total} | Passed: ${report.summary.passed} | Failed: ${report.summary.failed} | Skipped: ${report.summary.skipped}`);
console.log(`    Pass rate: ${report.summary.passRate} | Duration: ${report.summary.totalDuration}\n`);

console.log("  🌐 By Browser:");
for (const [browser, stats] of Object.entries(report.byBrowser)) {
    const skipText = stats.skipped ? `, Skipped: ${stats.skipped}` : "";
    console.log(`    ${browser.padEnd(10)} — Total: ${stats.total}, Passed: ${stats.passed}, Failed: ${stats.failed}${skipText}`);
}

console.log("\n  ❌ Failures:");
for (const f of report.failures) {
    console.log(`    ${f.name} [${f.browser}] — ${f.error}`);
}

console.log("\n  🐌 Slowest Tests:");
for (const t of report.slowestTests) {
    console.log(`    ${t.duration.padEnd(6)} ${t.name}`);
}


// ═══════════════════════════════════════
// CHALLENGE 3: MESSAGE CENTER SIMULATOR
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n📌 CHALLENGE 3: MESSAGE CENTER SIMULATOR\n");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MessageCenter {
    constructor(currentUser) {
        this.currentUser = currentUser;
        this.messages = [];         // All messages
        this.nextId = 1;            // Auto-increment ID
    }

    async sendMessage(recipient, text, attachments = []) {
        await delay(50);  // Simulate network delay

        const message = {
            id: this.nextId++,
            from: this.currentUser,
            to: recipient,
            text,
            attachments,
            status: "sent",
            timestamp: new Date().toISOString()
        };

        this.messages.push(message);
        return message;
    }

    async markDelivered(messageId) {
        await delay(20);
        const msg = this.messages.find(m => m.id === messageId);
        if (msg) msg.status = "delivered";
        return msg;
    }

    async markRead(messageId) {
        await delay(20);
        const msg = this.messages.find(m => m.id === messageId);
        if (msg) msg.status = "read";
        return msg;
    }

    getConversation(contactName) {
        // All messages with a specific contact (sent or received), sorted by time
        return this.messages
            .filter(m => m.to === contactName || m.from === contactName)
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }

    getUnreadMessages() {
        // Messages that are 'delivered' but not yet 'read'
        return this.messages.filter(m => m.status === "delivered");
    }

    async searchMessages(keyword) {
        await delay(30);  // Simulate search delay
        const lowerKeyword = keyword.toLowerCase();
        return this.messages.filter(m =>
            m.text.toLowerCase().includes(lowerKeyword)
        );
    }

    getConversationSummary() {
        // Unique contacts
        const contacts = [...new Set(this.messages.map(m => m.to))];

        // Most active contact
        const contactCounts = this.messages.reduce((acc, m) => {
            acc[m.to] = (acc[m.to] ?? 0) + 1;
            return acc;
        }, {});

        const mostActive = Object.entries(contactCounts)
            .sort(([, a], [, b]) => b - a)[0];

        return {
            totalConversations: contacts.length,
            totalMessages: this.messages.length,
            unreadCount: this.getUnreadMessages().length,
            mostActiveContact: mostActive
                ? { name: mostActive[0], messageCount: mostActive[1] }
                : null
        };
    }
}

// === TEST SCRIPT ===
console.log("  Running Message Center test script...\n");

const mc = new MessageCenter("Buyer123");

// Step 1: Send 5 messages to different suppliers
const msg1 = await mc.sendMessage("TexPro", "Hi, I need a quote for 500 units of cotton fabric");
const msg2 = await mc.sendMessage("SilkWeave", "Can you provide a bulk price for silk thread?");
const msg3 = await mc.sendMessage("TexPro", "Also interested in your premium cotton line");
const msg4 = await mc.sendMessage("GreenTex", "Do you have organic cotton samples?");
const msg5 = await mc.sendMessage("LightCo", "Need quote for 100 LED panels");

console.log(`  Sent ${mc.messages.length} messages\n`);

// Step 2: Mark some as delivered, some as read
await mc.markDelivered(msg1.id);
await mc.markDelivered(msg2.id);
await mc.markDelivered(msg3.id);
await mc.markRead(msg1.id);

console.log("  Status updates:");
console.log(`    msg1 (TexPro):    ${mc.messages[0].status}`);   // read
console.log(`    msg2 (SilkWeave): ${mc.messages[1].status}`);   // delivered
console.log(`    msg3 (TexPro):    ${mc.messages[2].status}`);   // delivered
console.log(`    msg4 (GreenTex):  ${mc.messages[3].status}`);   // sent
console.log(`    msg5 (LightCo):   ${mc.messages[4].status}`);   // sent

// Step 3: Search for messages containing "quote"
const quoteMessages = await mc.searchMessages("quote");
console.log(`\n  Search for "quote": ${quoteMessages.length} message(s)`);
for (const m of quoteMessages) {
    console.log(`    → To: ${m.to} — "${m.text.substring(0, 40)}..."`);
}

// Step 4: Get unread messages
const unread = mc.getUnreadMessages();
console.log(`\n  Unread messages: ${unread.length}`);
for (const m of unread) {
    console.log(`    → To: ${m.to} — "${m.text.substring(0, 40)}..."`);
}

// Step 5: Get conversation with TexPro
const texProConvo = mc.getConversation("TexPro");
console.log(`\n  Conversation with TexPro: ${texProConvo.length} message(s)`);
for (const m of texProConvo) {
    console.log(`    [${m.status}] "${m.text.substring(0, 45)}..."`);
}

// Step 6: Print summary
const summary = mc.getConversationSummary();
console.log("\n  📊 Conversation Summary:");
console.log(`    Total conversations: ${summary.totalConversations}`);
console.log(`    Total messages:      ${summary.totalMessages}`);
console.log(`    Unread count:        ${summary.unreadCount}`);
console.log(`    Most active contact: ${summary.mostActiveContact?.name} (${summary.mostActiveContact?.messageCount} messages)`);


// ═══════════════════════════════════════
// CONCEPTS USED IN EACH CHALLENGE
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n📋 CONCEPTS USED\n");

console.log("  Challenge 1 (Data Pipeline):");
console.log("    ?. optional chaining, ?? nullish coalescing, .map(),");
console.log("    .filter(), .sort(), parseFloat/parseInt, NaN check\n");

console.log("  Challenge 2 (Report Generator):");
console.log("    .reduce(), .filter(), .map(), .sort(), .slice(),");
console.log("    Object.entries(), spread [...arr], destructuring,");
console.log("    template literals, for...of\n");

console.log("  Challenge 3 (Message Center):");
console.log("    Classes, async/await, .find(), .filter(), .reduce(),");
console.log("    Set deduplication, Object.entries(), .sort(),");
console.log("    optional chaining, array destructuring");

console.log("\n═══════════════════════════════════════\n");
