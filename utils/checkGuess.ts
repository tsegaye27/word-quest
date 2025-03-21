export const checkGuess = (guess: string, target: string) => {
  const targetLetters = target.split("");
  return guess.split("").map((letter, index) => {
    if (letter === targetLetters[index]) {
      return { letter, color: "#4CAF50" };
    } else if (targetLetters.includes(letter)) {
      return { letter, color: "#FFC107" };
    } else {
      return { letter, color: "#757575" };
    }
  });
};
