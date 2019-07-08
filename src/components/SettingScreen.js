import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Setting</Text>
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
