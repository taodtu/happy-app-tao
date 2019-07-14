import React from "react";
import Auth from "@aws-amplify/auth";
import logo from "../images/beer.png";
import { Icon } from "native-base";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

export default class MenuDrawer extends React.Component {
  navLink(nav, text) {
    return (
      <TouchableOpacity
        style={{ height: 50 }}
        onPress={() => this.props.navigation.navigate(nav)}
      >
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out from the app?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel"
        },
        // Calling signOut
        {
          text: "OK",
          onPress: () => this.signOut()
        }
      ],
      { cancelable: false }
    );
  };
  // Confirm sign out
  signOut = async () => {
    const { navigate } = this.props.navigation;
    await Auth.signOut()
      .then(() => {
        navigate("Landing");
      })
      .catch(err => {
        if (!err.message) {
          Alert.alert("Error changing password: ", err);
        } else {
          Alert.alert("Error changing password: ", err.message);
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              <View style={styles.imgView}>
                <Image style={styles.img} source={logo} />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.name}>Hey fun provider!</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomLinks}>
            {this.navLink("Profile", "Profile")}
            {this.navLink("Edit", "Edit profile")}
            {this.navLink("Promo", "Offers list")}
            {this.navLink("NewPromo", "Create a new promo")}
            {this.navLink("Reset", "Reset password")}
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  flexDirection: "row",
                  justifyContent: "center"
                }
              ]}
              onPress={this.signOutAlert}
            >
              <Icon
                name="md-power"
                style={{ color: "#fff", paddingRight: 10 }}
              />
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.description}>Happy App</Text>
          <Text style={styles.version}>v1.0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray"
  },
  scroller: {
    flex: 1
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#777777"
  },
  profileText: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center"
  },
  name: {
    fontSize: 20,
    paddingBottom: 5,
    color: "white",
    textAlign: "left"
  },
  imgView: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 10
  },
  topLinks: {
    height: 160,
    backgroundColor: "gray"
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 450
  },
  link: {
    flex: 1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: "left"
  },
  footer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "lightgray"
  },
  version: {
    flex: 1,
    textAlign: "right",
    marginRight: 20,
    color: "gray"
  },
  description: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "gray",
    padding: 14,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 40,
    borderRadius: 50
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  }
});
