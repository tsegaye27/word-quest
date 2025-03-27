import fs from "fs";

// 1. Load files
const words = JSON.parse(fs.readFileSync("./assets/words.json", "utf-8"));
const cefrWords = fs
  .readFileSync("./cefr.txt", "utf-8")
  .split("\n")
  .filter(Boolean);

// 2. Create CEFR lookup dictionary
const cefrMap = {};
cefrWords.forEach((line) => {
  const [word, grade] = line.split(","); // Format: "apple,A1"
  if (word && grade) cefrMap[word.toLowerCase()] = grade.trim();
});

// 3. Update difficulty and track missing words
const missingWords = [];
const updatedWords = words.map((wordObj) => {
  const cefrGrade = cefrMap[wordObj.word.toLowerCase()];

  if (!cefrGrade) {
    missingWords.push(wordObj.word);
    return { ...wordObj }; // Keep original if no CEFR grade
  }

  // Map CEFR to difficulty
  let difficulty;
  if (["A1", "A2"].includes(cefrGrade)) difficulty = "easy";
  else if (["B1", "B2"].includes(cefrGrade)) difficulty = "medium";
  else difficulty = "hard"; // C1/C2

  return {
    ...wordObj,
    difficulty,
    cefr_level: cefrGrade, // Optional: add CEFR grade to object
  };
});

// 4. Save results
fs.writeFileSync("words-updated.json", JSON.stringify(updatedWords, null, 2));
console.log("✅ Updated words saved to words-updated.json");

// 5. Show missing words
if (missingWords.length > 0) {
  console.log("\n⚠️  Missing CEFR grades for:");
  console.log(missingWords.join(", "));
} else {
  console.log("✨ All words had CEFR grades!");
}
