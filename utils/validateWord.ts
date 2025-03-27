import checkedWordList from "../assets/allowedWords.json";

const wordSet = new Set(checkedWordList);

export const isValidWord = (word: string): boolean => {
  return wordSet.has(word.toUpperCase());
};
