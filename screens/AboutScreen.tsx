import { StyleSheet } from "react-native";

import ShowProducts from "../components/ShowProducts";
import { Text, View } from "../components/Themed";
import tw from "../lib/tailwind";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>mPharma</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={[tw`items-center`]}>
        <Text style={[tw`text-lg font-semibold`]}>Designed and Built by</Text>
        <Text style={[tw`text-2xl font-bold`]}>Castro Agbo</Text>
        <Text style={[tw`text-2xl font-bold`]}>Github: </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
