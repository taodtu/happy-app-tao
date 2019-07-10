import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MenuButton from "./MenuButton";
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.textStyle}>Owner Profile</Text>
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
