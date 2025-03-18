export const checkGuess = (guess: string, target: string) => {
  return guess.split("").map((letter, index) => {
    if (letter === target[index]) {
      return { letter, color: "green" };
    } else if (target.includes(letter)) {
      return { letter, color: "yellow" };
    } else {
      return { letter, color: "gray" };
    }
  });
};
