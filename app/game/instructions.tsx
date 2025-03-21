import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useDarkMode } from "@/context/DarkModeContext"; // Add this import

export default function InstructionsScreen() {
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        How to Play
      </Text>
      <Text style={[styles.description, isDarkMode && styles.darkText]}>
        Guess the 5-letter word. You have 6 attempts. After each guess, you'll
        see feedback:
      </Text>

      <View style={styles.feedbackContainer}>
        <Text style={[styles.feedbackText, isDarkMode && styles.darkText]}>
          🟩{" "}
          <Text style={styles.feedbackLabel}>Correct letter and position</Text>
        </Text>
        <Text style={[styles.feedbackText, isDarkMode && styles.darkText]}>
          🟨{" "}
          <Text style={styles.feedbackLabel}>
            Correct letter, wrong position
          </Text>
        </Text>
        <Text style={[styles.feedbackText, isDarkMode && styles.darkText]}>
          ⬛ <Text style={styles.feedbackLabel}>Incorrect letter</Text>
        </Text>
      </View>

      <Link href="/game" asChild>
        <TouchableOpacity
          style={[styles.button, isDarkMode && styles.darkButton]}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Back to Game</Text>
        </TouchableOpacity>
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
    backgroundColor: "#F5F5F5",
  },
  darkContainer: {
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  darkText: {
    color: "#FFF",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  feedbackContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#757575",
  },
  feedbackLabel: {
    fontWeight: "bold",
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
