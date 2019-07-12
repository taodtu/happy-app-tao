import React from "react";
import { Dimensions } from "react-native";
import LandingScreen from "./src/components/LandingScreen";
import SignInScreen from "./src/components/SignInScreen";
import SignUpScreen from "./src/components/SignUpScreen";
import ForgetPasswordScreen from "./src/components/ForgetPasswordScreen";
import HomeScreen from "./src/components/HomeScreen";
import PromoScreen from "./src/components/owner-screens/PromoScreen";
import ProfileScreen from "./src/components/owner-screens/ProfileScreen";
import EditScreen from "./src/components/owner-screens/EditScreen";
import ResetPasswordScreen from "./src/components/owner-screens/ResetPasswordScreen";
import CouponDetailScreen from "./src/components/coupon-screen/CouponDetailScreen";
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
const OfferStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Offers list` // for the header screen
    })
  },
  Coupon: {
    screen: CouponDetailScreen,
    navigationOptions: () => ({
      title: `Coupon detail` // for the header screen
    })
  }
});
const AppTabNavigator = createMaterialTopTabNavigator(
  {
    Offer: OfferStackNavigator, //define above
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
  drawerWidth: WIDTH * 0.8,
  contentComponent: ({ navigation }) => {
    return <MenuDrawer navigation={navigation} />;
  }
};
const OwnerDrawerNavigator = createDrawerNavigator(
  {
    Profile: ProfileScreen,
    Edit: EditScreen,
    Promo: PromoScreen,
    Reset: ResetPasswordScreen
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
