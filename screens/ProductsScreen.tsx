import { StyleSheet } from "react-native";

import ShowProducts from "../components/ShowProducts";
import { Text, View } from "../components/Themed";
import tw from "../lib/tailwind";
import { RootTabScreenProps } from "../types";

import Constants from "expo-constants";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProductsScreen({
  navigation,
}: RootTabScreenProps<"Products">) {
  return (
    <View style={[styles.container, tw`bg-gray-50`]}>
      <View
        style={[tw`flex flex-row justify-between items-center py-4 w-full`]}
      >
        <MaterialCommunityIcons name="menu" size={24} color="black" />
        <Text style={[tw`font-bold leading-tight text-brandOrange text-lg`]}>
          mPharma
        </Text>
        <FontAwesome name="bell-o" color="black" size={20} />
      </View>
      <View style={[tw`h-[150px] bg-brandOrange/15 rounded-lg w-full p-5`]}>
        <Text
          style={[tw`text-2xl font-bold w-1/2 leading-tight text-black/80`]}
        >
          We will deliver your medicine
        </Text>
      </View>

      <ShowProducts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
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
