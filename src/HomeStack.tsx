import React, { useContext, useState, useRef, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList, Text, TouchableOpacity, Button } from "react-native";
import faker from "faker";

import { AuthContext } from "./AuthProvider";
import { Center } from "./Center";
import { HomeParamList, HomeStackNavProps } from "./HomeParamList";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation }: HomeStackNavProps<"Feed">) {
  return (
    <Center>
      <FlatList
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate("Product", { name: item });
              }}
            />
          );
        }}
        keyExtractor={(item, idx) => item + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
}

function Product({ route, navigation }: HomeStackNavProps<"Product">) {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit This Product"
        onPress={() =>
          navigation.navigate("EditProduct", { name: route.params.name })
        }
      />
    </Center>
  );
}

function EditProduct({ route, navigation }: HomeStackNavProps<"EditProduct">) {
  // const [formState] = useState();
  const submit = useRef(() => {});

  submit.current = () => {
    // api call with new form state
    // apiCall(formState)
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);

  return (
    <Center>
      <Text>editing {route.params.name}</Text>
    </Center>
  );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>Sign out</Text>
              </TouchableOpacity>
            );
          }
        }}
        component={Feed}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Product: ${route.params.name}`
        })}
        name="Product"
        component={Product}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                route.params.submit?.current();
              }}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          )
        })}
        name="EditProduct"
        component={EditProduct}
      />
    </Stack.Navigator>
  );
};
