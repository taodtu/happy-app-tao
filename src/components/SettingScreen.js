import React from "react";
import {
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";
export default class SettingsScreen extends React.Component {
  async singOut() {
    await AsyncStorage.clear();

    this.props.navigation.navigate("Landing");
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.singOut()}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aa73b7",
    justifyContent: "center",
    flexDirection: "column"
  },
  textStyle: {
    textAlign: "center"
  }
});
