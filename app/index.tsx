import React, { useEffect, useState } from "react";
import { DarkModeContext } from "@/context/DarkModeContext";
import { Link } from "expo-router";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearGameState } from "@/utils/store";

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [hasSavedState, setHasSavedState] = useState(false);

  useEffect(() => {
    const checkSavedState = async () => {
      try {
        const savedState = await AsyncStorage.getItem("gameState");
        setHasSavedState(!!savedState);
      } catch (error) {
        console.error("Error checking saved state:", error);
      }
    };
    checkSavedState();
  }, []);

  const handleReset = async () => {
    await clearGameState("gameState");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DarkModeContext.Provider
        value={{ isDarkMode, toggleDarkMode: () => setIsDarkMode(!isDarkMode) }}
      >
        <StatusBar
          style={isDarkMode ? "light" : "dark"}
          backgroundColor={isDarkMode ? "#1e1e1e" : "#f4f4f4"}
        />
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
          <Text style={[styles.title, isDarkMode && styles.darkText]}>
            Word Quest
          </Text>
          <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>
            Guess the hidden word in 6 tries
          </Text>

          <Link
            style={[styles.button, isDarkMode && styles.darkButton]}
            href="/game"
            asChild
          >
            <TouchableOpacity onPress={handleReset} activeOpacity={0.8}>
              <Text style={[styles.buttonText]}>New Game</Text>
            </TouchableOpacity>
          </Link>

          {hasSavedState && (
            <Link
              style={[styles.button, isDarkMode && styles.darkButton]}
              href="/game"
              asChild
            >
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={[styles.buttonText]}>Resume Game</Text>
              </TouchableOpacity>
            </Link>
          )}

          <Link
            style={[styles.button, isDarkMode && styles.darkButton]}
            href="/game/instructions"
            asChild
          >
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={[styles.buttonText]}>How to Play</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </DarkModeContext.Provider>
    </GestureHandlerRootView>
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
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  darkText: {
    color: "#FFF",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: "#666",
  },
  button: {
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginVertical: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  darkButton: {
    backgroundColor: "#2E7D32",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  themeToggle: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
  },
});
