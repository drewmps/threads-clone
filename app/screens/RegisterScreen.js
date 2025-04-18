import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { REGISTER } from "../queries/queriesAndMutations";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const [handleRegister, { data, loading, error }] = useMutation(REGISTER, {
    onCompleted: (result) => {
      navigation.navigate("LoginScreen");
    },
  });

  const onSubmit = () => {
    const payload = {
      email,
      name,
      password,
      username,
    };
    handleRegister({
      variables: {
        newUser: payload,
      },
    });
  };
  return (
    <View>
      <Text>RegisterScreen</Text>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        secureTextEntry={true}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
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
      <Button title="Register" onPress={onSubmit} />
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
