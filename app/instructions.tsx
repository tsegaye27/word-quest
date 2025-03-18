import { View, Text, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";

export default function InstructionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Play</Text>
      <Text style={styles.text}>
        Guess the 5-letter word. You have 5 attempts. After each guess, you'll
        see feedback:
      </Text>
      <Text style={styles.text}>🟩 = Correct letter and position</Text>
      <Text style={styles.text}>🟨 = Correct letter, wrong position</Text>
      <Text style={styles.text}>⬛ = Incorrect letter</Text>
      <Link href="/" asChild>
        <Button title="Back to Game" />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
