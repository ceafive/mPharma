import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { findIndex } from "lodash";
import { Platform, StyleSheet } from "react-native";
import AddEditProduct from "../components/AddEditProduct";

import ShowProducts from "../components/ShowProducts";
import { Text, View } from "../components/Themed";
import { getData, storeData } from "../lib";
import { RootStackScreenProps, RootTabScreenProps } from "../types";

export default function ModalScreen({
  navigation,
  route,
}: RootStackScreenProps<"Add">) {
  const {
    params: { product = {}, isEditing },
  } = route;

  // console.log({ product });
  const onSubmit = async (data: any) => {
    // console.log(data);
    let newData = [];
    const storageProducts = await getData("@mpharma/products");

    if (storageProducts) {
      if (isEditing) {
        const pfindindex = findIndex(storageProducts, (o) => {
          return o?.id === product?.id;
        });

        console.log({ pfindindex });
        // return;

        const nData = {
          ...product,
          ...data,
          prices: [
            {
              id:
                storageProducts?.reduce((acc, val) => {
                  return acc + val.prices?.length;
                }, 0) + 1,
              price: parseFloat(data.price),
              date: new Date(),
            },
            ...product?.prices,
          ],
        };

        delete nData.price;

        // console.log({ nData });

        storageProducts[pfindindex] = nData;

        newData = storageProducts;
      } else {
        newData = [
          {
            id: storageProducts?.length + 1,
            name: data.name,
            prices: [
              {
                id: 1,
                price: parseFloat(data.price),
                date: new Date(),
              },
            ],
          },
          ...storageProducts,
        ];
      }
    } else {
      newData = [
        {
          id: storageProducts?.length + 1,
          name: data.name,
          prices: [
            {
              id: 1,
              price: parseFloat(data.price),
              date: new Date(),
            },
          ],
        },
      ];
    }

    // console.log({ newData });
    // return;
    storeData("@mpharma/products", newData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AddEditProduct onSubmit={onSubmit} product={product} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
