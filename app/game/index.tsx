import { useDarkMode } from "@/context/DarkModeContext";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GuessHistory from "@/components/GuessHistory";
import GuessInput from "@/components/GuessInput";
import React, { useEffect, useState } from "react";
import { checkGuess } from "@/utils/checkGuess";
import { getRandomWord, getWordMeaning } from "@/utils/words";
import { saveGameState, loadGameState, clearGameState } from "@/utils/store";

const GameScreen = () => {
  const { isDarkMode } = useDarkMode();
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState<{ letter: string; color: string }[][]>(
    [],
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [wordMeaning, setWordMeaning] = useState("");

  useEffect(() => {
    const loadState = async () => {
      const savedState = await loadGameState("gameState");
      if (savedState) {
        setAttempts(savedState.attempts || 0);
        setGuesses(savedState.guesses || []);
        setGameOver(savedState.gameOver || false);
        setShowModal(savedState.showModal || false);
        setModalMessage(savedState.modalMessage || "");
        setTargetWord(savedState.targetWord || "");
        setWordMeaning(savedState.wordMeaning || "");
        setDifficulty(savedState.difficulty || "medium");
      } else {
        initializeGame();
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      await saveGameState("gameState", {
        attempts,
        guesses,
        gameOver,
        showModal,
        modalMessage,
        targetWord,
        wordMeaning,
        difficulty,
      });
    };
    saveState();
  }, [
    attempts,
    guesses,
    gameOver,
    showModal,
    modalMessage,
    targetWord,
    wordMeaning,
    difficulty,
  ]);

  const initializeGame = () => {
    const word = getRandomWord(difficulty);
    const meaning = getWordMeaning(word, difficulty);
    setTargetWord(word);
    setWordMeaning(meaning);
  };

  const handleGuess = (guess: string) => {
    const result = checkGuess(guess, targetWord);
    setGuesses([...guesses, result]);

    if (guess === targetWord) {
      setModalMessage(
        `🎉 Congratulations!\nYou won in ${attempts + 1} ${
          attempts === 0 ? "attempt" : "attempts"
        }!`,
      );
      setShowModal(true);
      setGameOver(true);
      return;
    }

    if (attempts >= 5) {
      let message = `Game Over\nThe word was ${targetWord}`;
      if (wordMeaning && wordMeaning !== "No definition available.") {
        message += `\n\n📚 Word Meaning:\n${wordMeaning}`;
      }
      setModalMessage(message);
      setShowModal(true);
      setGameOver(true);
      return;
    }

    setAttempts((prev) => prev + 1);
  };

  const resetGame = async () => {
    initializeGame();
    setAttempts(0);
    setGuesses([]);
    setGameOver(false);
    setShowModal(false);
    await clearGameState("gameState");
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Difficulty selector */}
      <View style={styles.difficultyContainer}>
        <Text style={[styles.difficultyLabel, isDarkMode && styles.darkText]}>
          Difficulty:
        </Text>
        <View style={styles.difficultyButtons}>
          <TouchableOpacity
            style={[
              styles.difficultyButton,
              difficulty === "easy" && styles.selectedButton,
            ]}
            onPress={() => {
              setDifficulty("easy");
              initializeGame();
            }}
          >
            <Text
              style={[
                styles.difficultyButtonText,
                difficulty === "easy" && styles.selectedButtonText,
              ]}
            >
              Easy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.difficultyButton,
              difficulty === "medium" && styles.selectedButton,
            ]}
            onPress={() => {
              setDifficulty("medium");
              initializeGame();
            }}
          >
            <Text
              style={[
                styles.difficultyButtonText,
                difficulty === "medium" && styles.selectedButtonText,
              ]}
            >
              Medium
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.difficultyButton,
              difficulty === "hard" && styles.selectedButton,
            ]}
            onPress={() => {
              setDifficulty("hard");
              initializeGame();
            }}
          >
            <Text
              style={[
                styles.difficultyButtonText,
                difficulty === "hard" && styles.selectedButtonText,
              ]}
            >
              Hard
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <GuessInput onSubmit={handleGuess} disabled={gameOver} />
      <GuessHistory guesses={guesses} />

      <Text style={[styles.attempts, isDarkMode && styles.darkText]}>
        Attempts: {attempts}/6
      </Text>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModal]}>
            <Text style={[styles.modalText, isDarkMode && styles.darkText]}>
              {modalMessage}
            </Text>
            <TouchableOpacity
              style={[styles.button, isDarkMode && styles.darkButton]}
              activeOpacity={0.8}
              onPress={resetGame}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#1e1e1e",
  },
  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  difficultyLabel: {
    fontSize: 14,
    marginRight: 8,
    color: "#333",
  },
  difficultyButtons: {
    flexDirection: "row",
  },
  difficultyButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  difficultyButtonText: {
    fontSize: 12,
    color: "#4CAF50",
  },
  selectedButton: {
    backgroundColor: "#4CAF50",
  },
  selectedButtonText: {
    color: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  attempts: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    width: "80%",
  },
  darkModal: {
    backgroundColor: "#2d2d2d",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  darkButton: {
    backgroundColor: "#2E7D32",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GameScreen;
