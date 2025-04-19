import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/create"
        options={{
          presentation: "modal",
          title: "New thread",
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal-circle" size={24} />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
}
