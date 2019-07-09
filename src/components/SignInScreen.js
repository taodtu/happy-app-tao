import React from "react";
import logo from "../images/beer.png";
import Auth from "@aws-amplify/auth";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Animated
} from "react-native";
import { Container, Item, Input, Icon } from "native-base";
export default class SignInScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  signIn = async () => {
    const { email, password } = this.state;
    await Auth.signIn(email, password)
      .then(user => {
        this.setState({ user });
        this.props.navigation.navigate("Landing");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when signing in: ", err);
          Alert.alert("Error when signing in: ", err);
        } else {
          console.log("Error when signing in: ", err.message);
          Alert.alert("Error when signing in: ", err.message);
        }
      });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Animated.Image
                  source={logo}
                  style={{ width: 80, height: 80 }}
                />
              </View>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("email", value)}
                    />
                  </Item>
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText("password", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.signIn()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>

                  <Text
                    style={styles.buttonText}
                    onPress={() => this.props.navigation.navigate("SignUp")}
                  >
                    Don't have an account? Sign Up
                  </Text>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#5a52a5"
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 200,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#aa73b7"
  },
  itemStyle: {
    marginBottom: 20
  },
  iconStyle: {
    color: "#5a52a5",
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#667292",
    padding: 14,
    marginBottom: 20,
    borderRadius: 24
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  logoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
