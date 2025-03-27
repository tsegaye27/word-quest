import fs from "fs";

const words = fs
  .readFileSync("./assets/allowedWord.txt", "utf8")
  .split("\n")
  .filter((word) => word.trim().length === 5)
  .map((word) => word.trim().toUpperCase());

fs.writeFileSync("./assets/allowedWords.json", JSON.stringify(words));
console.log("Done!");
