import { useDarkMode } from "@/context/DarkModeContext";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GuessHistory from "@/components/GuessHistory";
import GuessInput from "@/components/GuessInput";
import React, { useEffect, useState } from "react";
import { checkGuess } from "@/utils/checkGuess";
import { getRandomWord } from "@/utils/words";

export default function GameScreen() {
  const { isDarkMode } = useDarkMode();
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState<{ letter: string; color: string }[][]>(
    [],
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    const initializeGame = async () => {
      const word = await getRandomWord();
      setTargetWord(word);
    };
    initializeGame();
  }, []);
  const handleGuess = (guess: string) => {
    const result = checkGuess(guess, targetWord);
    setGuesses([...guesses, result]);

    if (guess === targetWord) {
      setModalMessage(
        `🎉 Congratulations!\nYou won in ${attempts + 1} ${attempts === 0 ? "attempt" : "attempts"}!`,
      );
      setShowModal(true);
      setGameOver(true);
      return;
    }

    if (attempts >= 5) {
      setModalMessage(`Game Over\nThe word was ${targetWord}`);
      setShowModal(true);
      setGameOver(true);
    }

    setAttempts((prev) => prev + 1);
  };

  const resetGame = async () => {
    const newWord = await getRandomWord();
    setTargetWord(newWord);
    setAttempts(0);
    setGuesses([]);
    setGameOver(false);
    setShowModal(false);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
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
              disabled={false}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
