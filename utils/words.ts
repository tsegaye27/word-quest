import words from "@/assets/words.json";

export async function getRandomWord() {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5",
    );
    const data = await response.json();
    return data[0].toUpperCase();
  } catch (error) {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
}
