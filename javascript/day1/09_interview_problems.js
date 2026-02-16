/**
 * ============================================================
 *  📋 Day 1 — Interview Coding Problems (Foundations)
 * ============================================================
 *  Topics: Variables, Data Types, Strings, Objects, Arrays
 *  Rules : Solve each problem in the space provided.
 *          DO NOT use Google / AI — think first, code later.
 *  Run   : node 09_interview_problems.js
 * ============================================================
 */

// ⚠️⚠️⚠️ STRICT WARNING ⚠️⚠️⚠️
// ─────────────────────────────────────────────────────────────
//  1. DO NOT skip any problem. Solve ALL 5 in order.
//  2. DO NOT use any external library or import.
//  3. DO NOT look at solutions online — struggle is learning.
//  4. You MUST use console.log() to print your output.
//  5. TRY to solve each within the time limit mentioned.
//  6. If stuck for more than the time limit, write pseudocode
//     in comments, then move to the next problem.
// ─────────────────────────────────────────────────────────────


console.log("=".repeat(60));
console.log("🧠 DAY 1 — INTERVIEW CODING PROBLEMS");
console.log("=".repeat(60));


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 1: Swap Two Variables Without a Third Variable
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given two variables `a = 5` and `b = 10`, swap their
//    values WITHOUT using a temporary third variable.
//    Print both values before and after the swap.
//
// 📌 EXPECTED OUTPUT:
//    Before → a = 5, b = 10
//    After  → a = 10, b = 5
//
// ⏱️ TIME LIMIT : 5 minutes
// 📦 SPACE      : O(1) — no extra variables allowed
// ⏳ TIME COMP  : O(1)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 1: Swap Two Variables ---");

let a = 5;
let b = 10;

// ✍️ YOUR CODE BELOW ⬇️

console.log(`Before → a = ${a}, b = ${b}`);

b = a + b;
a = b - a;
b = b - a;

console.log(`After  → a = ${a}, b = ${b}`);




// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 2: Reverse a String Without .reverse()
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given the string "playwright", reverse it WITHOUT using
//    the .reverse() method or any built-in reverse function.
//    You CAN use .split(), .length, loops, or any string
//    method you learned in Day 1.
//
// 📌 EXPECTED OUTPUT:
//    Original : playwright
//    Reversed : thgirwyalp
//
// ⏱️ TIME LIMIT : 8 minutes
// 📦 SPACE      : O(n) — where n is string length
// ⏳ TIME COMP  : O(n)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 2: Reverse a String ---");




// ✍️ YOUR CODE BELOW ⬇️
const originalStr = "playwright";
let newStr = "";
for (let i = originalStr.length; i > 0; i--) {
    newStr = newStr + originalStr[i - 1];

}
console.log(originalStr);
console.log(newStr);



// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 3: Count Vowels in a String
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given the string "Automation Testing Is Fun", count how
//    many vowels (a, e, i, o, u) are in it.
//    The check should be CASE-INSENSITIVE.
//
// 📌 EXPECTED OUTPUT:
//    String : Automation Testing Is Fun
//    Vowel Count : 9
//
// ⏱️ TIME LIMIT : 8 minutes
// 📦 SPACE      : O(1) — only a counter variable
// ⏳ TIME COMP  : O(n) — where n is string length
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 3: Count Vowels ---");

const sentence = "Automation Testing Is Fun";

// ✍️ YOUR CODE BELOW ⬇️

count = 0;
for (let i = 0; i < sentence.length - 1; i++) {
    if (sentence[i] === 'a' || sentence[i] === 'e' || sentence[i] === 'i' || sentence[i] === 'o' || sentence[i] === 'u') {
        count++;
    }
    else if (sentence[i] === 'A' || sentence[i] === 'E' || sentence[i] === 'I' || sentence[i] === 'O' || sentence[i] === 'U') {
        count++;
    }
}
console.log(count);



// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 4: Find the Largest Number in an Array
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given the array [34, 78, 12, 91, 56, 3, 89], find the
//    LARGEST number WITHOUT using Math.max() or .sort().
//    You must use a loop to find it manually.
//
// 📌 EXPECTED OUTPUT:
//    Array   : [34, 78, 12, 91, 56, 3, 89]
//    Largest : 91
//
// ⏱️ TIME LIMIT : 5 minutes
// 📦 SPACE      : O(1) — only a tracker variable
// ⏳ TIME COMP  : O(n) — where n is array length
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 4: Largest Number in Array ---");

const numbers = [34, 78, 12, 91, 56, 3, 89];

// ✍️ YOUR CODE BELOW ⬇️
for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] > numbers[i + 1]) {
        numbers[i] = numbers[i + 1];
    }
    else {
        numbers[i + 1] = numbers[i];
    }


}
console.log(numbers);





// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 5: Build a User Profile Object from Variables
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    You are given the following variables:
//       const firstName = "Shubham";
//       const role = "QA Engineer";
//       const experience = 2;
//       const skills = ["Playwright", "JavaScript", "API Testing"];
//
//    Create an object called `profile` with these as keys:
//       name, role, experience, skills, summary
//
//    The `summary` key should be a STRING built using a
//    template literal in this EXACT format:
//    "<name> is a <role> with <experience> years of experience."
//
//    Then print the ENTIRE object using console.table().
//    Also print ONLY the first skill from the skills array.
//
// 📌 EXPECTED OUTPUT:
//    (console.table of the profile object)
//    First Skill : Playwright
//
// ⏱️ TIME LIMIT : 8 minutes
// 📦 SPACE      : O(1) — just the object
// ⏳ TIME COMP  : O(1)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 5: Build User Profile Object ---");

const firstName = "Shubham";
const role = "QA Engineer";
const experience = 2;
const skills = ["Playwright", "JavaScript", "API Testing"];

// ✍️ YOUR CODE BELOW ⬇️

// Create profile object
const profile = {
    name: firstName,
    role: role,
    experience: experience,
    skills: skills,
    summary: `${firstName} is a ${role} with ${experience} years of experience.`
};

// Print entire object
console.table(profile);

// Print first skill
console.log("First Skill :", skills[0]);



// ✍️ YOUR CODE ABOVE ⬆️


console.log("\n" + "=".repeat(60));
console.log("✅ ALL PROBLEMS ATTEMPTED — Great job! 💪");
console.log("=".repeat(60));
