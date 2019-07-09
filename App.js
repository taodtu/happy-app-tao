import React from "react";
import LandingScreen from "./src/components/LandingScreen";
import SignInScreen from "./src/components/SignInScreen";
import HomeScreen from "./src/components/HomeScreen";
import ProfileScreen from "./src/components/ProfileScreen";
import PromoScreen from "./src/components/PromoScreen";
import SettingScreen from "./src/components/SettingScreen";
import { View, TouchableOpacity } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import { Icon, Tabs } from "native-base";
import Amplify from "@aws-amplify/core";
import config from "./src/aws-exports";
import Auth from "@aws-amplify/auth";

Amplify.configure(config);

const OwnerStackNavigator = createStackNavigator({
  Header: {
    screen: PromoScreen,
    // Set the header icon
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  }
});
const OwnerDrawerNavigator = createDrawerNavigator({
  Tabs: OwnerStackNavigator,
  Promo: PromoScreen,
  Profile: ProfileScreen,
  Setting: SettingScreen
});
const AppStackNavigator = createStackNavigator({
  Header: {
    screen: HomeScreen,
    // Set the header icon
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  }
});
const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Promo list`, // for the header screen
      headerBackTitle: "Back"
    })
  }
});
const AppDrawerNavigator = createDrawerNavigator(
  {
    Tabs: AppStackNavigator, // defined above
    Home: HomeStackNavigator,
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => ({
        title: `Pub owner sign in`, // for the header screen
        headerBackTitle: "Back"
      })
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: true
  }
);
const AppNavigator = createSwitchNavigator({
  Landing: LandingScreen,
  Owner: OwnerDrawerNavigator, // the Owner stack
  App: AppDrawerNavigator // the App stack
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
