import React from "react";
import LandingScreen from "./src/components/LandingScreen";
import SignInScreen from "./src/components/SignInScreen";
import SignUpScreen from "./src/components/SignUpScreen";
import ForgetPasswordScreen from "./src/components/ForgetPasswordScreen";
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

const SignInStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Pub sign in` // for the header screen
    })
  },
  SignUp: SignUpScreen,
  ForgetPassword: ForgetPasswordScreen
});
const options = {
  tabBarPosition: "bottom",
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  }
};
const AppTabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Offers list` // for the header screen
      })
    },
    SignIn: {
      screen: SignInStackNavigator, //define above
      navigationOptions: () => ({
        title: `Pub sign in/up` // for the header screen
      })
    }
  },
  options
);
const OwnerTabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Offers` // for the header screen
      })
    },
    Profile: {
      screen: ProfileScreen, //define above
      navigationOptions: () => ({
        title: `Profile` // for the header screen
      })
    },
    Setting: {
      screen: SettingScreen, //define above
      navigationOptions: () => ({
        title: `Setting` // for the header screen
      })
    }
  },
  options
);
const AppNavigator = createSwitchNavigator({
  Landing: LandingScreen,
  Owner: OwnerTabNavigator, // the Owner stack
  App: AppTabNavigator // the App stack
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
