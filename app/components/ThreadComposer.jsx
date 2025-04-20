import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  InputAccessoryView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserProfile } from "../hooks/useUserProfile";
import { CREATE_POST, GET_POSTS } from "../queries/queriesAndMutations";
import { useMutation } from "@apollo/client";
import { Colors } from "../constants/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

export default function ThreadComposer(isPreview = false, isReply, threadId) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tagsText, setTagsText] = useState("");
  const { userProfile } = useUserProfile();

  const [handleCreate, { data, loading, error }] = useMutation(CREATE_POST, {
    onError: (result) => {
      Alert.alert(result.message);
    },
    onCompleted: (result) => {
      setContent("");
      setImgUrl("");
      setTagsText("");
      router.dismiss();
    },
    refetchQueries: [
      {
        query: GET_POSTS,
      },
    ],
  });
  const handleSubmit = async () => {
    handleCreate({
      variables: {
        newPost: {
          content,
          imgUrl,
          tags: tagsText.split(",").map((item) => item.trim()),
        },
      },
    });
  };
  const removeThread = () => {
    setContent("");
    setImgUrl("");
    setTagsText("");
  };
  const handleCancel = async () => {
    setContent("");
    setImgUrl("");
    setTagsText("");
    Alert.alert("Discard thread?", [
      {
        text: "Discard",
        style: "destructive",
        onPress: () => router.dismiss(),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };
  return (
    <View>
      <Stack.Screen
        options={{
          headerLeft: () => {
            <TouchableOpacity onPress={handleCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>;
          },
        }}
      />
      <View style={styles.topRow}>
        <Image
          source={require("../assets/images/no-profile-picture.png")}
          style={styles.avatar}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.name}>{userProfile?.name}</Text>
          <TextInput
            style={styles.input}
            placeholder={isReply ? "Reply to thread" : "What's new?"}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            multiline
            autoFocus={!isPreview}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={imgUrl}
            onChangeText={(text) => {
              setImgUrl(text);
            }}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Hashtags"
            value={tagsText}
            onChangeText={(text) => {
              setTagsText(text);
            }}
            multiline
          />
        </View>

        {!isPreview ? (
          <></>
        ) : (
          <View
            style={{
              alignSelf: "flex-start",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={removeThread}
            >
              <Ionicons name="close" size={24} color={Colors.border} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignSelf: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  centerContainer: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    maximumHeight: 100,
  },
  iconRow: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  iconButton: {
    marginRight: 16,
  },
  cancelButton: {
    marginLeft: 12,
    alignSelf: "flex-start",
  },
  submitButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
