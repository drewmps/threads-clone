import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  const checkToken = async () => {
    const isToken = await SecureStore.getItemAsync("access_token");
    if (isToken) setIsLogin(true);
  };
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      <ApolloProvider client={client}>
        <NavigationContainer>
          {isLogin ? (
            <Stack.Navigator>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
