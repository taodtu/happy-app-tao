import React from "react";
import Auth from "@aws-amplify/auth";
import logo from "../images/beer.png";
import { StyleSheet, View, Image } from "react-native";
export default class LandingScreen extends React.Component {
  state = {
    userToken: null
  };
  componentDidMount = async () => {
    try {
      await Auth.currentAuthenticatedUser()
        .then(user => {
          this.setState({
            userToken: user.signInUserSession.accessToken.jwtToken
          });
        })
        .catch(err => console.log(err));
      this.props.navigation.navigate(this.state.userToken ? "Owner" : "App");
    } catch (err) {
      console.log(err);
    }
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
    backgroundColor: "#fdd96e",
    alignItems: "center",
    justifyContent: "center"
  }
});
