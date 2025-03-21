import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const CustomButton = ({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    width: 200,
    alignItems: "center",
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#e0e0e0",
  },
});
