import { Pressable, StyleSheet } from "react-native";

import ShowProducts from "../components/ShowProducts";
import { Text, View } from "../components/Themed";
import tw from "../lib/tailwind";
import * as WebBrowser from "expo-web-browser";

const _handlePressButtonAsync = async () => {
  let result = await WebBrowser.openBrowserAsync(
    "https://github.com/ceafive/mPharma"
  );
};

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
        <Text style={[tw`font-semibold`]}>Designed and Built by</Text>
        <Text style={[tw`text-lg font-bold`]}>Castro Agbo</Text>
        <Pressable onPress={_handlePressButtonAsync}>
          <View style={[tw`flex flex-row`]}>
            <Text style={[tw``]}>Github: </Text>
            <Text style={[tw`text-blue-500`]}>
              https://github.com/ceafive/mPharma
            </Text>
          </View>
        </Pressable>
        <Text style={[tw`font-bold mt-10`]}>{new Date().getFullYear()}</Text>
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
