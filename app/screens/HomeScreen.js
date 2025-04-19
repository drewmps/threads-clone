import { Button, FlatList, ScrollView, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/queriesAndMutations";

export default function HomeScreen() {
  const { data, loading, error } = useQuery(GET_POSTS);

  const { setIsLogin } = useContext(AuthContext);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setIsLogin(false);
  };
  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>error...</Text>;
  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
      <Text>HomeScreen</Text>
      <ScrollView>
        {data.getPosts?.map((post) => {
          return <Text>{post.content}</Text>;
        })}
      </ScrollView>
    </View>
  );
}
