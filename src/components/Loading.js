import React from "react";
import logo from "../images/beer.png";
import { StyleSheet, View, Image } from "react-native";
import { Spinner } from "native-base";
export default (Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <Spinner color="green" />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F75A84",
    alignItems: "center",
    justifyContent: "center"
  }
});
