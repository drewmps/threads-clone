import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Profile from "../../profile";

export default function Page() {
  const { id } = useLocalSearchParams();
  return <Profile userId={id} />;
}

const styles = StyleSheet.create({});
