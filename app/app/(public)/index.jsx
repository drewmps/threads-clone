import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/login.png")}
        style={styles.loginImage}
      />
      <ScrollView>
        <Text></Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,

    alignItems: "center",
  },
  loginImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
});
