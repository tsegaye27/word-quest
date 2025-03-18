export const checkGuess = (guess: string, target: string) => {
  return guess.split("").map((letter, index) => {
    if (letter === target[index]) {
      return "🟩";
    } else if (target.includes(letter)) {
      return "🟨";
    } else {
      return "⬛";
    }
  });
};
