import React from "react";
import logo from "../images/beer.png";
import Auth from "@aws-amplify/auth";
import Loading from "./Loading";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Button,
  Animated
} from "react-native";
import { Container, Item, Input, Icon } from "native-base";
export default class SignInScreen extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false
  };
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  signIn = async () => {
    const { username, password } = this.state;
    this.setState({ loading: true });
    await Auth.signIn(username, password)
      .then(user => {
        this.setState({ user, loading: false });
        this.props.navigation.navigate("Landing");
      })
      .catch(err => {
        this.setState({ loading: false });
        if (!err.message) {
          Alert.alert("Error when signing in: ", err);
        } else {
          Alert.alert("Error when signing in: ", err.message);
        }
      });
  };
  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
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
                  style={{ width: 60, height: 60 }}
                />
              </View>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#0468d4"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("username", value)
                      }
                    />
                  </Item>
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText("password", value)
                      }
                      onSubmitEditing={event => {
                        this.signIn();
                      }}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.signIn()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>

                  <View>
                    <Text style={styles.Text}>Don't have an account?</Text>
                    <Button
                      title="Sign Up"
                      color="#841584"
                      onPress={() => this.props.navigation.navigate("SignUp")}
                    />
                  </View>
                  <View style={styles.Button}>
                    <Text style={styles.Text}>Forget your password?</Text>
                    <Button
                      title="Click here"
                      color="#841584"
                      onPress={() =>
                        this.props.navigation.navigate("ForgetPassword")
                      }
                    />
                  </View>
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
    backgroundColor: "#23ccc9",
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
    marginTop: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#23ccc9"
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
    backgroundColor: "#61a0d4",
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
  },
  Text: {
    textAlign: "center"
  },
  Button: {
    marginBottom: 20
  }
});
