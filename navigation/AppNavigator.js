import React from "react";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import LogIn from "../screens/LogIn";
import SignIn from "../screens/SignIn";

const AuthStack = createStackNavigator({
  AuthLoadingScreen: { screen: AuthLoadingScreen },
  LogIn: { screen: LogIn },
  SignIn: { screen: SignIn }
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: AuthStack
});
