export const getWordMeaning = async (word: string) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    const data = await response.json();

    if (
      data &&
      Array.isArray(data) &&
      data[0]?.meanings?.[0]?.definitions?.[0]?.definition
    ) {
      return data[0].meanings[0].definitions[0].definition;
    } else {
      return "No definition available.";
    }
  } catch (error) {
    console.log("Error fetching word meaning", error);
    return "Unable to fetch word meaning.";
  }
};
