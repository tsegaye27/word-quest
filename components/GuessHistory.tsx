import { StyleSheet, Text, View } from "react-native";

type GuessHistoryProps = {
  guesses: { letter: string; color: string }[][];
};

export default function GuessHistory({ guesses }: GuessHistoryProps) {
  return (
    <View style={styles.container}>
      {guesses.map((guess, index) => (
        <View key={index} style={styles.row}>
          {guess.map((item, i) => (
            <Text
              key={i}
              style={[styles.letter, { backgroundColor: item.color }]}
            >
              {item.letter?.toUpperCase()}
            </Text>
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
    marginBottom: 5,
  },
  letter: {
    width: 40,
    height: 40,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 2,
    padding: 5,
    borderRadius: 5,
    color: "#fff",
  },
});
