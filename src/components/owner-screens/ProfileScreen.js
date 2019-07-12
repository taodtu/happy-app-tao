import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MenuButton from "../MenuButton";
export default class PromoScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.textStyle}>Promo List</Text>
        <MapView
          style={{ alignSelf: "stretch", height: 400 }}
          provider="google"
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a73b7",
    alignItems: "center",
    justifyContent: "space-around"
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  }
});
