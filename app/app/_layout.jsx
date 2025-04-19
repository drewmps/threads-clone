import { Link, Slot, Stack } from "expo-router";
import client from "../config/apollo";
import { ApolloProvider } from "@apollo/client";
const InitialLayout = () => {
  return <Slot />;
};
export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <InitialLayout />
    </ApolloProvider>
  );
}
