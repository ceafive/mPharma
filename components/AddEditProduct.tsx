import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

import tw from "../lib/tailwind";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { sortBy } from "lodash";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  price: string;
};

interface Props {
  onSubmit: SubmitHandler<FormValues>;
  product?: FormValues;
}

export default function AddEditProduct({ onSubmit, product }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: product
      ? product
      : {
          name: "",
          price: "",
        },
  });

  return (
    <View style={[tw`w-full bg-white h-full px-2`]}>
      <KeyboardAvoidingView
        enabled
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 5,
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={[tw`bg-white pt-10`]}
        >
          <View style={[tw`bg-white `]}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[tw`mb-2`]}>
                  <Text>Product Name</Text>
                  <TextInput
                    style={[
                      tw`border border-gray-500 h-[50px] rounded px-2 w-full`,
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Name of product"
                  />
                </View>
              )}
              name="name"
            />
            {errors.name && (
              <Text style={[tw`text-xs text-red-500`]}>Name is required</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[tw`mb-2`]}>
                  <Text>Product Price</Text>
                  <TextInput
                    style={[
                      tw`border border-gray-500 h-[50px] rounded px-2 w-full`,
                    ]}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Price of product"
                    value={value}
                  />
                  {errors.price && (
                    <Text style={[tw`text-xs text-red-500`]}>
                      Price is required
                    </Text>
                  )}
                </View>
              )}
              name="price"
            />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
