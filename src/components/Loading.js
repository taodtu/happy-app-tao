import React from "react";
import logo from "../images/beer.png";
import { StyleSheet, View, Image } from "react-native";
import { Spinner } from "native-base";
export default (Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <Spinner color="#1cbbf3" />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdd96e",
    alignItems: "center",
    justifyContent: "center"
  }
});
