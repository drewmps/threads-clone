import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SEARCH_USER } from "../../../../queries/queriesAndMutations";
import { Stack } from "expo-router";
import ProfileSearchResult from "../../../../components/ProfileSearchResult";

export default function Page() {
  const [search, setSearch] = useState("");
  const [handleSearch, { data, loading, error }] = useLazyQuery(SEARCH_USER, {
    onCompleted: (result) => {
      // console.log("Search result", result);
    },
    onError: (result) => {
      Alert.alert(result.message);
    },
  });

  const onSearch = (search) => {
    handleSearch({
      variables: {
        keyword: search,
      },
    });
  };
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  console.log("ini data", data);
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Search",
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: (event) => {
              onSearch(event.nativeEvent.text);
            },
            tintColor: "black",
            autoFocus: true,
            hideWhenScrolling: false,
          },
        }}
      />
      <FlatList
        data={data?.searchUser}
        ListEmptyComponent={() => <Text>No users found</Text>}
        renderItem={({ item }) => {
          return <ProfileSearchResult user={item} />;
        }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
