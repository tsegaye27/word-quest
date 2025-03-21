import * as words from "@/assets/words.json";

export async function getRandomWord() {
  try {
    const response = await fetch(
      "https://random-word-api.vercel.app/api?words=1&length=5",
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error("Fetch failed");
    }

    const data = await response.json();
    console.log("Fetched word:", data[0]);
    return data[0].toUpperCase();
  } catch (error) {
    console.error("Fetch error:", error);
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
}
