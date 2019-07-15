import React from "react";
import Auth from "@aws-amplify/auth";
import logo from "../images/beer.png";
import { StyleSheet, View, Image } from "react-native";
export default class LandingScreen extends React.Component {
  state = {
    userToken: null
  };

  componentDidMount = async () => {
    await this.loadApp();
  };
  loadApp = async () => {
    const { navigate } = this.props.navigation;
    const { userToken } = this.state;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          userToken: user.signInUserSession.accessToken.jwtToken
        });
      })
      .catch(err => console.log(err));
    navigate(userToken ? "Owner" : "App");
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
