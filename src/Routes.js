/* eslint-disable prettier/prettier */
// import {View, Text} from 'react-native';
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Homepage from "./screens/Homepage";
import Uploadpage from "./screens/Uploadpage";
import Detailpage from "./screens/Detailpage";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Uploadpage"
          component={Uploadpage}
          options={{ title: "Upload" }}
        />
        <Stack.Screen
          name="Detailpage"
          component={Detailpage}
          options={{ title: "Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
