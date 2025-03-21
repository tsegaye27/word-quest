import { useDarkMode } from "@/context/DarkModeContext";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FlipInEasyX } from "react-native-reanimated";

type GuessHistoryProps = {
  guesses: { letter: string; color: string }[][];
};

export default function GuessHistory({ guesses }: GuessHistoryProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <View style={styles.container}>
      {guesses.map((guess, index) => (
        <View key={index} style={styles.row}>
          {guess.map((item, i) => (
            <Animated.View
              key={i}
              entering={FlipInEasyX.duration(400).delay(i * 50)}
            >
              <Text
                style={[
                  styles.letter,
                  {
                    backgroundColor: item.color,
                    borderColor: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  },
                ]}
              >
                {item.letter.toUpperCase()}
              </Text>
            </Animated.View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 6,
  },
  letter: {
    width: 48,
    height: 48,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    borderRadius: 10,
    color: "#ffffff",
    borderWidth: 2,
    // Dynamic border color handled inline
    overflow: "hidden",
    textAlignVertical: "center",
  },
});
