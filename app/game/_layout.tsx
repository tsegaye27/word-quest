import React, { useState } from "react";
import { DarkModeContext } from "@/context/DarkModeContext";
import { TouchableOpacity, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Stack, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function GameLayout() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const segments = useSegments();

  const currentSegment = segments[segments.length - 1];
  const showDrawer =
    currentSegment === "game" || currentSegment === "instructions";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DarkModeContext.Provider
        value={{ isDarkMode, toggleDarkMode: () => setIsDarkMode(!isDarkMode) }}
      >
        <StatusBar
          style={isDarkMode ? "light" : "dark"}
          translucent
          backgroundColor={isDarkMode ? "#1e1e1e" : "#f4f4f4"}
        />

        {showDrawer ? (
          <Drawer
            screenOptions={({ route }) => ({
              drawerStyle: {
                backgroundColor: isDarkMode ? "#1e1e1e" : "#f5f5f5",
                width: 250,
              },
              drawerActiveTintColor: isDarkMode ? "#fff" : "#000",
              drawerInactiveTintColor: isDarkMode ? "#aaa" : "#666",
              headerTitle: "Word Quest",
              headerTitleAlign: "center",
              headerBackTitleVisible: false,
              headerStatusBarHeight: 25,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => setIsDarkMode(!isDarkMode)}
                  style={{ marginRight: 16 }}
                >
                  <Ionicons
                    name={isDarkMode ? "sunny" : "moon"}
                    size={24}
                    color={isDarkMode ? "white" : "black"}
                  />
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: isDarkMode ? "#1e1e1e" : "#f5f5f5",
              },
              headerTintColor: isDarkMode ? "#fff" : "#000",
            })}
          >
            <Drawer.Screen
              name="index"
              options={{ title: "Play Game", headerTitle: "Word Quest" }}
            />
            <Drawer.Screen
              name="instructions"
              options={{
                title: "How to Play",
                headerTitle: "Game Instructions",
              }}
            />
          </Drawer>
        ) : (
          <Stack>
            <Stack.Screen name="" options={{ headerShown: false }} />
          </Stack>
        )}
      </DarkModeContext.Provider>
    </GestureHandlerRootView>
  );
}
