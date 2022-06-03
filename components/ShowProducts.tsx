import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/Colors";
import tw from "../lib/tailwind";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { orderBy } from "lodash";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getData, storeData } from "../lib";
import { FontAwesome } from "@expo/vector-icons";
import { Alert } from "react-native";

export default function ShowProducts() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const storageProducts = await getData("@mpharma/products");
      if (!storageProducts) {
        fetch(`http://www.mocky.io/v2/5c3e15e63500006e003e9795`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            // console.log(data);
            if (data.products) {
              setProducts(data.products);
              storeData("@mpharma/products", data.products);
            }
          });
      } else {
        setProducts(storageProducts);
      }
    })();
  }, [isFocused]);

  const onDelete = async (id: number) => {
    const storageProducts = await getData("@mpharma/products");
    const filtered = storageProducts?.filter((p) => p?.id !== id);

    storeData("@mpharma/products", filtered);

    const newProducts = await getData("@mpharma/products");
    setProducts(newProducts);
  };

  return (
    <View style={[tw`w-full mt-5 bg-gray-50 h-full flex-1`]}>
      <View style={[tw`w-full  bg-gray-50 `]}>
        <View
          style={[tw`flex flex-row justify-between items-center bg-gray-50`]}
        >
          <Text style={[styles.getStartedText, tw`font-black`]}>Products</Text>
          <TouchableOpacity
            style={[tw`py-2`]}
            hitSlop={{ left: 5, right: 5 }}
            onPress={() =>
              navigation.navigate("Add", { title: "Add New Product" })
            }
          >
            <Text style={[tw`text-gray-600`]}>+ Add New Product</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 5,
        }}
        style={[tw`bg-gray-50 `]}
      >
        <View
          style={[
            tw`flex-1 flex flex-row flex-wrap justify-between bg-gray-50`,
          ]}
        >
          {[...products]?.map((p, index) => {
            return <ItemCard key={index} p={p} onDelete={onDelete} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

interface Props {
  p: {
    id: number;
    name: string;
    prices: {
      date: string;
      id: number;
      price: number;
    }[];
  };
  onDelete: (id: number) => void;
}

function ItemCard({ p, onDelete }: Props) {
  const navigation = useNavigation();

  const prices = p?.prices;
  const orderdedPrices = orderBy(prices, ["date"], ["desc"]);

  return (
    <View
      style={[
        tw`relative shadow-sm min-h-[200px] rounded-lg justify-between w-[49%] mb-4 p-2 px-3`,
      ]}
    >
      <Image
        style={[tw`w-full h-[120px]`]}
        resizeMode="contain"
        source={{
          uri: "https://cdn.vox-cdn.com/thumbor/gOTWiYI9kwrb8UpYDI6XavnVz58=/0x19:640x446/1200x800/filters:focal(0x19:640x446)/cdn.vox-cdn.com/assets/1514603/adheretech_bottle_640.png",
        }}
      />

      <View style={[tw`mt-1`]}>
        <Text style={[tw`font-semibold`]}>{p?.name}</Text>
        <Text style={[tw`font-semibold text-green-600`]}>
          GHS {orderdedPrices[0]?.price}
        </Text>
      </View>

      <View>
        <Text style={[tw`text-xs mt-3 font-semibold`]}>Historical Prices</Text>
        {orderdedPrices?.map((p) => {
          return (
            <Text key={p?.id} style={[tw`text-xs`]}>
              GHS {p?.price}
            </Text>
          );
        })}
      </View>
      <Pressable
        onPress={() => {
          Alert.alert(
            "Delete Product",
            `This action will delete this product ${p?.name}`,
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                style: "destructive",
                onPress: () => onDelete(p?.id),
              },
            ]
          );
        }}
        style={({ pressed }) => [
          tw`absolute top-2 right-2`,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        <FontAwesome name="trash" size={25} color={"red"} />
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("Add", {
            title: `Edit ${p?.name}`,
            product: {
              ...p,
              price: String(orderdedPrices[0]?.price),
            },
            isEditing: true,
          });
        }}
        style={({ pressed }) => [
          tw`absolute top-2 left-2`,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        <FontAwesome name="edit" size={25} color={"green"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    // marginHorizontal: 50,
    marginTop: 10,
    width: "100%",
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
