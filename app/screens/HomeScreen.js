import { Button, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function HomeScreen() {
  const { setIsLogin } = useContext(AuthContext);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setIsLogin(false);
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
