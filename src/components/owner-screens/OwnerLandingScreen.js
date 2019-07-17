import React from "react";
import Auth from "@aws-amplify/auth";
import logo from "../../images/beer.png";
import { StyleSheet, View, Image } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getOwner } from "../../graphql/queries";
export default class LandingScreen extends React.Component {
  state = {
    venue_name: ""
  };
  componentDidMount = async () => {
    await this.loadApp();
  };
  loadApp = async () => {
    await Auth.currentAuthenticatedUser()
      .then(async user => {
        const { data } = await API.graphql(
          graphqlOperation(getOwner, { id: user.username })
        );
        if (!data.getOwner) return;
        this.setState({ venue_name: data.getOwner.name });
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
    backgroundColor: "#fdd96e",
    alignItems: "center",
    justifyContent: "center"
  }
});
