import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

// ---- SREENS IMPORTS ----//
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ReservationScreen from "../screens/ReservationScreen";
import MyBikesScreen from "../screens/MyBikes";
import AddBike from "../screens/AddBike";
import AddPayementMethod from "../screens/AddPayementMethod";
import AccountScreen from "../screens/AccountScreen";
import Calendar from "../screens/Calendar";
import EndRent from "../screens/EndRent";
import Filters from "../screens/Filters";
import List from "../screens/List";
import MyAccountInfo from "../screens/MyAccountInfo";
import PaymentMethods from "../screens/PaymentMethods";
import BikeDetails from "../screens/BikeDetails";
import StartRent from "../screens/StartRent";
import Tchat from "../screens/Tchat";
import UserProfile from "../screens/UserProfile";

// ---- COMPONENTS IMPORTS ----//
import CyclistIcon from "../components/CyclistIcon";

// ---- HOME ----//

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } },
  Filters: { screen: Filters },
  Calendar: { screen: Calendar, navigationOptions: { header: null } },
  List: { screen: List, navigationOptions: { header: null } },
  BikeDetails: { screen: BikeDetails },
  UserProfile: { screen: UserProfile },
  Tchat: { screen: Tchat }
});

HomeStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    />
  )
};

// ---- RESERVATION ----//

const ReservationStack = createStackNavigator({
  Reservation: ReservationScreen,
  BikeDetails: { screen: BikeDetails },
  UserProfile: { screen: UserProfile },
  EndRent: { screen: EndRent },
  StartRent: { screen: StartRent }
});

ReservationStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
    />
  )
};

// ---- MY BIKES ----//

const MyBikesStack = createStackNavigator({
  MyBikes: MyBikesScreen,
  AddBike: { screen: AddBike },
  BikeDetails: { screen: BikeDetails },
  EndRent: { screen: EndRent },
  StartRent: { screen: StartRent }
});

MyBikesStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-calendar" : "ios-calendar"}
    />
  )
};

// ---- ACCOUNT ----//

const AccountStack = createStackNavigator({
  AccountScreen: AccountScreen,
  MyAccountInfo: { screen: MyAccountInfo },
  AddPayementMethod: { screen: AddPayementMethod },
  PaymentMethods: { screen: PaymentMethods }
});

AccountStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => <CyclistIcon focused={focused} />
};

const BottomTabNavigator = createBottomTabNavigator({
  HomeStack,
  ReservationStack,
  MyBikesStack,
  AccountStack
});

export default BottomTabNavigator;
