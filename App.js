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
const AppTabNavigator = createStackNavigator({
  SignIn: SignInScreen
});
const AppStackNavigator = createStackNavigator({
  // Tabs: AppStackNavigator, // defined above
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Welcome`, // for the header screen
      headerBackTitle: "Back"
    })
  },
  SignIn: SignInScreen
});
const AppNavigator = createSwitchNavigator({
  Landing: LandingScreen,
  Owner: OwnerDrawerNavigator, // the Owner stack
  App: AppStackNavigator // the App stack
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
