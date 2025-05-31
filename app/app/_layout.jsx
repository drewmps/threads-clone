import { Link, Slot, Stack, useRouter } from "expo-router";
import client from "../config/apollo";
import { ApolloProvider } from "@apollo/client";
import AuthenticationContext from "../context/AuthenticationContext";
import { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const InitialLayout = () => {
  const { isLogin, setIsLogin } = useContext(AuthenticationContext);
  const router = useRouter();
  const checkToken = async () => {
    const isToken = await SecureStore.getItemAsync("access_token");
    if (isToken) setIsLogin(true);
  };
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLogin) {
      router.replace("/(auth)/(tabs)/feed");
    } else {
      router.replace("/(public)");
    }
  }, [isLogin]);

  return <Slot />;
};
export default function RootLayout() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <AuthenticationContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      <ApolloProvider client={client}>
        <InitialLayout />
      </ApolloProvider>
    </AuthenticationContext.Provider>
  );
}
