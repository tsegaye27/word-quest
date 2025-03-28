import AsyncStorage from "@react-native-async-storage/async-storage";

export interface GameState {
  attempts: number;
  guesses: { letter: string; color: string }[][];
  gameOver: boolean;
  showModal: boolean;
  modalMessage: string;
  targetWord: string;
  wordMeaning: string;
  difficulty: "easy" | "medium" | "hard";
}

export const saveGameState = async (key: string, value: GameState) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving game state:", error);
  }
};

export const loadGameState = async (key: string): Promise<GameState | null> => {
  try {
    const savedState = await AsyncStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error("Error loading game state:", error);
    return null;
  }
};

export const clearGameState = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing game state:", error);
  }
};
