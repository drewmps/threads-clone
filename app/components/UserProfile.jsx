import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FOLLOW_USER, GET_PROFILE } from "../queries/queriesAndMutations";
import { useEffect } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { Colors } from "../constants/Colors";

export default function UserProfile({ userId }) {
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: {
      userId,
    },
  });

  const { userProfile } = useUserProfile();
  const isSelf = userId === userProfile?._id;

  const [handleFollow] = useMutation(FOLLOW_USER, {
    onError: (result) => {
      Alert.alert(result.message);
    },
    refetchQueries: [
      {
        query: GET_PROFILE,
        variables: { userId },
      },
    ],
  });

  const handleClickFollow = () => {
    handleFollow({
      variables: {
        newFollow: {
          followingId: userId,
        },
      },
    });
  };
  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>{data?.getUserById?.name}</Text>
          <Text style={styles.username}>{data?.getUserById?.username}</Text>
        </View>
        <View>
          <Image
            source={require("../assets/images/no-profile-picture.png")}
            style={styles.image}
          />
        </View>
      </View>

      <Text style={styles.bio}>
        {data?.getUserById?.follower?.length} Followers
      </Text>
      <View style={styles.buttonRow}>
        {isSelf && (
          <>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Share Profile</Text>
            </TouchableOpacity>
          </>
        )}

        {!isSelf && (
          <>
            <TouchableOpacity
              style={styles.fullButton}
              onPress={() => {
                handleClickFollow();
              }}
            >
              <Text style={styles.fullButtonText}>Follow</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileTextContainer: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bio: {
    marginTop: 16,
    fontSize: 14,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-evenly",
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },

  fullButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  fullButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
