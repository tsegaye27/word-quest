import { useDarkMode } from "@/context/DarkModeContext";
import { Link } from "expo-router";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export default function CustomDrawerContent(props: any) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <Link href="/game" asChild>
        <DrawerItem
          label="New Game"
          onPress={() => props.navigation.closeDrawer()}
        />
      </Link>
      <Link href="/instructions" asChild>
        <DrawerItem
          label="Instructions"
          onPress={() => props.navigation.closeDrawer()}
        />
      </Link>
      <DrawerItem
        label={isDarkMode ? "Light Mode" : "Dark Mode"}
        onPress={toggleDarkMode}
      />
      <DrawerItem
        label="Close"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}
