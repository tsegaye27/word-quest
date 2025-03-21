import { useState } from "react";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, toggleDarkMode: () => setIsDarkMode(!isDarkMode) }}
    >
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          overlayColor: "transparent",
        }}
      >
        <Drawer.Screen name="index" options={{ title: "Welcome" }} />
        <Drawer.Screen name="game" options={{ title: "Game" }} />
        <Drawer.Screen name="instructions" options={{ title: "How to Play" }} />
      </Drawer>
    </DarkModeContext.Provider>
  );
}
