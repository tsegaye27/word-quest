import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { CustomButton } from "./CustomButton";

type GuessInputProps = {
  onSubmit: (guess: string) => void;
  disabled: boolean;
};

export default function GuessInput({ onSubmit, disabled }: GuessInputProps) {
  const [letters, setLetters] = useState<string[]>(["", "", "", "", ""]);
  const inputs = useRef<TextInput[]>(Array(5).fill(null));

  const handleLetterChange = (text: string, index: number) => {
    const newLetters = [...letters];
    newLetters[index] = text.slice(-1).toUpperCase(); // Only keep last character
    setLetters(newLetters);

    // Auto-focus next input
    if (text && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const guess = letters.join("");
    if (guess.length === 5) {
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
            maxLength={1}
            editable={!disabled}
            keyboardType="default"
            autoCapitalize="characters"
            onSubmitEditing={index === 4 ? handleSubmit : undefined}
          />
        ))}
      </View>
      <CustomButton
        title="Submit"
        onPress={handleSubmit}
        disabled={disabled || letters.join("").length !== 5}
      />
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
    marginBottom: 20,
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
    color: "#333",
  },
});
