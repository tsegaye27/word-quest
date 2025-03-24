export const getWordMeaning = async (word: string) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    const data = await response.json();
    return data[0].meanings[0].definitions[0].definition;
  } catch (error) {
    console.log("Error fetching word meaning", error);
  }
};
