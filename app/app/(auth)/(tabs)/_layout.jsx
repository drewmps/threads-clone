import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { useContext } from "react";
import AuthenticationContext from "../../../context/AuthenticationContext";
import * as SecureStore from "expo-secure-store";

const styles = StyleSheet.create({
  createIconContainer: {
    backgroundColor: Colors.itemBackground,
    padding: 2,
    borderRadius: 8,
  },
});
const CreateTabIcon = ({ color, size, focused }) => {
  return (
    <View style={styles.createIconContainer}>
      <Ionicons name="add" color={color} size={size} />
    </View>
  );
};

export default function Layout() {
  const router = useRouter();
  const { isLogin, setIsLogin } = useContext(AuthenticationContext);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setIsLogin(false);
  };
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size, focused }) => (
            <CreateTabIcon color={color} size={size} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push("/(modal)/create");
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
