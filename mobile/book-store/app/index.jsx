import { Text, View, } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.pakaya monada balanne uba </Text>
      <Link href="/(auth)/signup">Sign up</Link>
      <Link href="/(auth)">Login</Link>
    </View>
  );
}
