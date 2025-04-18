import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  return (
    <View>
      <Text>LoginScreen</Text>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Log In" />
      <Button
        title="Register"
        onPress={() => navigation.navigate("RegisterScreen")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "red",
  },
});
