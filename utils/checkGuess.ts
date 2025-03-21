export const checkGuess = (guess: string, target: string) => {
  const targetLetters = target.split("");
  const guessLetters = guess.split("");

  const letterCount: Record<string, number> = {};

  targetLetters.forEach((letter) => {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  });

  const result = new Array(guess.length).fill(null);

  guessLetters.forEach((letter, index) => {
    if (letter === targetLetters[index]) {
      result[index] = { letter, color: "#4CAF50" };
      letterCount[letter]--;
    }
  });

  guessLetters.forEach((letter, index) => {
    if (result[index] === null) {
      if (letterCount[letter] > 0) {
        result[index] = { letter, color: "#FFC107" };
        letterCount[letter]--;
      } else {
        result[index] = { letter, color: "#757575" };
      }
    }
  });

  return result;
};
