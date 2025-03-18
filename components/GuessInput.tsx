import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

type GuessInputProps = {
  onSubmit: (guess: string) => void;
  disabled: boolean;
};

export default function GuessInput({ onSubmit, disabled }: GuessInputProps) {
  const [guess, setGuess] = useState("");

  return (
    <View>
      <TextInput
        style={[styles.input, disabled && styles.disabledInput]}
        value={guess}
        onChangeText={setGuess}
        placeholder="Enter your guess"
        maxLength={5}
        editable={!disabled}
      />
      <Button title="Submit" onPress={() => onSubmit(guess)} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  disabledInput: {
    backgroundColor: "#ddd",
  },
});
