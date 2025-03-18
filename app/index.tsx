import GuessHistory from "@/components/GuessHistory";
import GuessInput from "@/components/GuessInput";
import { checkGuess } from "@/utils/checkGuess";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const targetWord = "hello";

  const handleGuess = (guess: string) => {
    if (gameOver) return;

    if (guess.length !== targetWord.length) {
      setFeedback("Please enter a word with 5 letters");
      return;
    }

    const result = checkGuess(guess.toLowerCase(), targetWord.toLowerCase());

    setGuesses([...guesses, result]);

    if (guess.toLowerCase() === targetWord.toLowerCase()) {
      setFeedback("🎉 Congratulations! You've found the word!");
      setGameOver(true);
      return;
    }
    const newAttempt = attempts + 1;
    setAttempts(newAttempt);

    if (newAttempt >= 5) {
      setFeedback("❌Game over! The word was 'hello'");
      setGameOver(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Quest</Text>
      <GuessInput onSubmit={handleGuess} disabled={gameOver} />
      <GuessHistory guesses={guesses} />
      <Text style={styles.feedback}>{feedback}</Text>
      <Text style={styles.attempts}>Attempts: {attempts}/5</Text>
      <Link href="/instructions" asChild>
        <Button title="How to Play" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 20 },
  feedback: { marginTop: 20, fontSize: 18 },
  attempts: { marginTop: 18, fontSize: 16, color: "#666" },
});
