import { isValidWord } from "@/utils/validateWord";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Text,
} from "react-native";

type GuessInputProps = {
  onSubmit: (guess: string) => void;
  disabled: boolean;
};

export default function GuessInput({ onSubmit, disabled }: GuessInputProps) {
  const [letters, setLetters] = useState<string[]>(["", "", "", "", ""]);
  const inputs = useRef<TextInput[]>(Array(5).fill(null));

  const handleLetterChange = (text: string, index: number) => {
    const filtered = text.replace(/[^A-Za-z]/g, "").toUpperCase();
    if (filtered === "" && text !== "") {
      return;
    }
    const newLetters = [...letters];

    if (filtered.length > 1) {
      const pastedLetters = filtered.slice(0, 5).split("");
      pastedLetters.forEach((letter, i) => {
        if (index + i < 5) {
          newLetters[index + i] = letter;
        }
      });
      setLetters(newLetters);
      const nextIndex = Math.min(index + filtered.length, 4);
      inputs.current[nextIndex]?.focus();
      return;
    }

    if (index === 4 && letters[4] !== "") {
      return;
    }

    newLetters[index] = filtered;
    setLetters(newLetters);

    if (filtered && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    const newLetters = [...letters];
    if (newLetters[index] === "") {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    } else {
      newLetters[index] = "";
    }
    setLetters(newLetters);
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      handleBackspace(index);
    }
  };

  const handleSubmit = () => {
    const guess = letters.join("");
    if (guess.length === 5 && isValidWord(guess)) {
      onSubmit(guess);
      setLetters(["", "", "", "", ""]);
      inputs.current[0]?.focus();
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        {letters.map((letter, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref!)}
            style={[
              styles.inputBox,
              { backgroundColor: disabled ? "#ddd" : "#fff" },
            ]}
            value={letter}
            onChangeText={(text) => handleLetterChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            maxLength={5}
            editable={!disabled}
            keyboardType="default"
            autoCapitalize="characters"
            onSubmitEditing={index === 4 ? handleSubmit : undefined}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.submitButton,
          { opacity: disabled || letters.join("").length !== 5 ? 0.6 : 1 },
        ]}
        onPress={handleSubmit}
        disabled={disabled || letters.join("").length !== 5}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },
  inputBox: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 8,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 0,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    maxWidth: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
