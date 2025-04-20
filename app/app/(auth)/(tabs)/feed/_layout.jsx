import { Stack } from "expo-router";
import { Colors } from "../../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Thread",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerRight: () => (
            <Ionicons name="notifications-outline" size={24} color="black" />
          ),
        }}
      />
    </Stack>
  );
}
