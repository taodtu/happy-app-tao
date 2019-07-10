import React from "react";
import { Dimensions } from "react-native";
import LandingScreen from "./src/components/LandingScreen";
import SignInScreen from "./src/components/SignInScreen";
import SignUpScreen from "./src/components/SignUpScreen";
import ForgetPasswordScreen from "./src/components/ForgetPasswordScreen";
import HomeScreen from "./src/components/HomeScreen";
import PromoScreen from "./src/components/PromoScreen";
import ProfileScreen from "./src/components/ProfileScreen";
import SettingScreen from "./src/components/SettingScreen";
import MenuDrawer from "./src/components/MenuDrawer";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import Amplify from "@aws-amplify/core";
import config from "./src/aws-exports";

Amplify.configure(config);

const SignInStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Pub sign in`, // for the header screen
      headerBackTitle: "Back to Sign In"
    })
  },
  SignUp: { screen: SignUpScreen },
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
const WIDTH = Dimensions.get("window").width;
const DrawerConfig = {
  drawerWidth: WIDTH * 0.8
  // contentComponent: ({ navigation }) => {
  //   return <MenuDrawer navigation={navigation} />;
  // }
};
const OwnerDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: PromoScreen,
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
  DrawerConfig
);
const AppNavigator = createSwitchNavigator({
  Landing: LandingScreen,
  Owner: OwnerDrawerNavigator, // the Owner stack
  App: AppTabNavigator // the App stack
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
