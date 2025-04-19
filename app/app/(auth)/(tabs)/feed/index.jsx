import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Colors } from "../../../../constants/Colors";
import AuthenticationContext from "../../../../context/AuthenticationContext";
import { useContext } from "react";
export default function Page() {
  const { isLogin, setIsLogin } = useContext(AuthenticationContext);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setIsLogin(false);
  };
  const cekToken = async () => {
    const token = await SecureStore.getItemAsync("access_token");
    console.log(token);
  };
  return (
    <View>
      <Text>This is feed</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
        <Text style={styles.loginButtonText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={cekToken}>
        <Text style={styles.loginButtonText}>Get Token</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  loginImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#999",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    color: "#999",
  },
  signupLink: {
    color: "black",
    fontWeight: "600",
  },
});
