import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import MenuButton from "../MenuButton";
export default class PromoScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MenuButton navigation={this.props.navigation} />
          <Text style={styles.textStyle}>Profile</Text>
          <MapView
            style={styles.map}
            provider="google"
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
        </View>
      </ScrollView>
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
  map: { alignSelf: "stretch", height: 300 },

  textStyle: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  }
});
