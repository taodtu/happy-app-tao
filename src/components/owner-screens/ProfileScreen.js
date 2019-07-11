import React from "react";
import Auth from "@aws-amplify/auth";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MenuButton from "../MenuButton";
export default class HomeScreen extends React.Component {
  state = {
    userEmail: "",
    edit: false
  };
  componentDidMount = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          userEmail: user.attributes.email
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    const { userEmail } = this.state;
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.textStyle}>Hello: {userEmail}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aa73b7",
    alignItems: "center",
    justifyContent: "center"
  }
});
