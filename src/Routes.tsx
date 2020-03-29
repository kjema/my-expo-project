import React, { useState, useEffect, useContext } from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { Text, Button, ActivityIndicator, AsyncStorage } from "react-native";
import { Center } from "./Center";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { AuthContext } from "./AuthProvider";

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation, route }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>Login Screen</Text>
      <Button
        title="log me in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}
function Register({ navigation, route }: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text>Register Screen</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
          // navigation.goBack();
        }}
      />
    </Center>
  );
}

export const Routes: React.FC<RoutesProps> = () => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if user is logged in or not
    AsyncStorage.getItem("user")
      .then(userString => {
        if (userString) {
          // decode it
          login();
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Center>
          <Text>you exist</Text>
        </Center>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
