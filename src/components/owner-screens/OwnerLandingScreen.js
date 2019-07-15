import React from "react";
import Auth from "@aws-amplify/auth";
import logo from "../../images/beer.png";
import { StyleSheet, View, Image } from "react-native";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
export default class LandingScreen extends React.Component {
  state = {
    venue_name: ""
  };
  componentDidMount = async () => {
    await this.loadApp();
  };
  loadApp = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        //get owner(user.username)
      })
      .catch(err => console.log(err));
    this.props.navigation.navigate(
      this.state.venue_name ? "OwnerApp" : "Register"
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F75A84",
    alignItems: "center",
    justifyContent: "center"
  }
});
