import { useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/AuthContext";
import { LOGIN } from "../queries/queriesAndMutations";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setIsLogin } = useContext(AuthContext);

  const [handleLogin, { data, loading, error }] = useLazyQuery(LOGIN, {
    onCompleted: async (result) => {
      await SecureStore.setItemAsync("access_token", result.login.access_token);
      setIsLogin(true);
    },
  });
  const onSubmit = () => {
    handleLogin({
      variables: {
        username,
        password,
      },
    });
  };
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
      <Button title="Log In" onPress={onSubmit} />
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
