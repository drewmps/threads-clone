import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Thread from "../../../../components/Thread";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_POST_BY_ID } from "../../../../queries/queriesAndMutations";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useLocalSearchParams();

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { postId: id }, // 👈 pass your parameter here
  });

  if (loading) {
    return (
      <View>
        <Text>loading..</Text>
      </View>
    );
  }
  return (
    <View>
      <ScrollView>
        <Thread thread={data?.getPostById} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
