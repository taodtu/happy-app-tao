import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import MenuButton from "../MenuButton";
export default class PromoScreen extends React.Component {
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#FDD96E" }}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.textStyle}>Make a New Offer</Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDD96E",
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    color: "#fff"
  }
});
