import { useDarkMode } from "@/context/DarkModeContext";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "@/components/CustomButton";

export default function WelcomeScreen() {
  const { isDarkMode } = useDarkMode();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        Word Quest
      </Text>
      <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>
        Guess the hidden word in 6 tries
      </Text>

      <Link href="/game" asChild>
        <CustomButton title="New Game" onPress={() => {}} disabled={false} />
      </Link>

      <Link href="/instructions" asChild>
        <CustomButton title="How to Play" onPress={() => {}} disabled={false} />
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
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: "#666",
  },
});
