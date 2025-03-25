import wordsData from "../assets/words.json";

export type Difficulty = "easy" | "medium" | "hard";

export type WordEntry = {
  word: string;
  meaning: string;
  difficulty: Difficulty;
};

export const getRandomWordDetails = (difficulty: Difficulty): WordEntry => {
  const words: WordEntry[] = wordsData as WordEntry[];
  const filteredWords = words.filter(
    (entry) => entry.difficulty === difficulty,
  );

  if (filteredWords.length === 0) {
    throw new Error("No words found for the selected difficulty.");
  }

  const randomEntry =
    filteredWords[Math.floor(Math.random() * filteredWords.length)];
  return randomEntry;
};

export const getRandomWord = (difficulty: Difficulty): string => {
  return getRandomWordDetails(difficulty).word.toUpperCase();
};

export const getWordMeaning = (
  word: string,
  difficulty: Difficulty,
): string => {
  const words: WordEntry[] = wordsData as WordEntry[];
  const found = words.find(
    (entry) =>
      entry.word.toLowerCase() === word.toLowerCase() &&
      entry.difficulty === difficulty,
  );
  return found ? found.meaning : "";
};
