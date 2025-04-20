import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { GET_POSTS, LIKE_POST } from "../queries/queriesAndMutations";
import { useMutation } from "@apollo/client";
import { Link } from "expo-router";

export default function Thread({ thread }) {
  const {
    _id,
    content,
    tags,
    imgUrl,
    authorId,
    author,
    likes,
    comments,
    createdAt,
  } = thread;
  const [handleLike, { data, loading, error }] = useMutation(LIKE_POST, {
    onError: (result) => {
      Alert.alert(result.message);
    },
    refetchQueries: [
      {
        query: GET_POSTS,
      },
    ],
  });
  console.log("ini author id", authorId);
  const likeThread = () => {
    handleLike({
      variables: {
        postId: _id,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/no-profile-picture.png")}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Link href={`/feed/profile/${authorId}`} asChild>
              <Text style={styles.headerTextUsername}>{author.username}</Text>
            </Link>
            <Text style={styles.timestamp}>
              {createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "Unknown Date"}
            </Text>
          </View>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={Colors.border}
          />
        </View>
        <Text style={styles.content}>{content}</Text>
        {imgUrl && (
          <View style={styles.mediaContainer}>
            <Image
              source={{ uri: imgUrl }}
              style={styles.mediaImage}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => likeThread()}
          >
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text style={styles.actionText}>{likes?.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
            <Text style={styles.actionText}>{comments?.length}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: "row",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timestamp: {
    color: "#777",
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  mediaImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  mediaContainer: {
    flexDirection: "row",
    gap: 14,
    paddingRight: 40,
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
  },
});
