import { useLazyQuery, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AuthenticationContext from "../context/AuthenticationContext";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import UserProfile from "./UserProfile";
import { useUserProfile } from "../hooks/useUserProfile";
import Tabs from "./Tabs";

export default function Profile(userId, showBackButton = false) {
  const { setIsLogin } = useContext(AuthenticationContext);
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { userProfile } = useUserProfile();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setIsLogin(false);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlatList
        data={[]}
        renderItem={({ item }) => <Text>Test</Text>}
        ListEmptyComponent={
          <Text style={styles.tabContentText}>No post yet</Text>
        }
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: Colors.border,
              }}
            />
          );
        }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              {showBackButton ? (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => {
                    router.back();
                  }}
                >
                  <Ionicons name="chevron-back" size={24} color="black" />
                  <Text>Back</Text>
                </TouchableOpacity>
              ) : (
                <MaterialCommunityIcons name="web" size={24} />
              )}
              <View style={styles.headerIcons}>
                <Ionicons name="logo-instagram" size={24} color="black" />
                <TouchableOpacity onPress={handleLogout}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {!userId?.segment && userId && (
              <UserProfile userId={userId?.userId} />
            )}
            {userId?.segment && userProfile && (
              <UserProfile userId={userProfile?._id} />
            )}
            <Tabs onTabChange={() => {}} />
          </>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabContentText: {
    fontSize: 17,
    color: Colors.border,
    textAlign: "center",
    marginTop: 16,
  },
});
