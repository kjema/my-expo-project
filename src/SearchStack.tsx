import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchParamList } from "./SearchParamList";
import { Center } from "./Center";
import { Text, Button, FlatList } from "react-native";
import faker from "faker";

interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();

function Search({ navigation }) {
  const [show, setShow] = useState(false);
  return (
    <Center>
      <Button
        title="Search for products"
        onPress={() => {
          setShow(true);
        }}
      />
      {show && (
        <FlatList
          style={{ width: "100%" }}
          renderItem={({ item }) => {
            return (
              <Button
                title={item}
                onPress={() => {
                  // navigation.navigate("Product", { name: item });
                }}
              />
            );
          }}
          keyExtractor={(item, idx) => item + idx}
          data={Array.from(Array(50), () => faker.commerce.product())}
        />
      )}
    </Center>
  );
}

export const SearchStack: React.FC<SearchStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
