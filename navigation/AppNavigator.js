import React from "react";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

import LogIn from "../screens/LogIn";
import SignIn from "../screens/SignIn";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import HomeScreen from "../screens/HomeScreen";

const AuthStack = createStackNavigator({
  AuthLoadingScreen: {
    screen: AuthLoadingScreen,
    navigationOptions: { header: null }
  },
  LogIn: { screen: LogIn },
  SignIn: { screen: SignIn }
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: AuthStack,
  Home: MainTabNavigator
});
