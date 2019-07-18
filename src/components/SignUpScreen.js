import React from "react";
import Auth from "@aws-amplify/auth";
import Loading from "./Loading";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Button,
  Alert
} from "react-native";
import { Container, Item, Input, Icon } from "native-base";

export default class SignUpScreen extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false,
    authCode: ""
  };
  async signUp() {
    try {
      const { username, password } = this.state;
      // rename variable to conform with Amplify Auth field phone attribute
      await Auth.signUp({
        username,
        password
      })
        .then(() => {
          Alert.alert("Enter the confirmation code you received.");
        })
        .catch(err => {
          if (!err.message) {
            Alert.alert("Error when signing up: ", err);
          } else {
            Alert.alert("Error when signing up: ", err.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  // Confirm users and redirect them to the Landing page
  async confirmSignUp() {
    try {
      const { username, authCode, password } = this.state;
      this.setState({ loading: true });
      await Auth.confirmSignUp(username, authCode)
        .then(async () => {
          await Auth.signIn(username, password)
            .then(user => {
              console.log(user.username);
              this.setState({ user, loading: false });
              this.props.navigation.navigate("Landing");
            })
            .catch(err => {
              if (!err.message) {
                this.setState({ loading: false });
                Alert.alert("Error when signing in: ", err);
              } else {
                this.setState({ loading: false });
                Alert.alert("Error when signing in: ", err.message);
              }
            });
        })
        .catch(err => {
          if (!err.message) {
            this.setState({ loading: false });
            Alert.alert("Error when entering confirmation code: ", err);
          } else {
            this.setState({ loading: false });
            Alert.alert("Error when entering confirmation code: ", err.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  // Resend code if not received already
  async resendSignUp() {
    try {
      const { username } = this.state;
      await Auth.resendSignUp(username).catch(err => {
        if (!err.message) {
          this.setState({ loading: false });
          Alert.alert("Error requesting new confirmation code: ", err);
        } else {
          this.setState({ loading: false });
          Alert.alert("Error requesting new confirmation code: ", err.message);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
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
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* username section  */}
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
                  {/*  password section  */}
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
                      // ref={c => this.SecondInput = c}
                      ref="SecondInput"
                      onSubmitEditing={event => {
                        this.signUp();
                      }}
                      onChangeText={value =>
                        this.onChangeText("password", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.signUp()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                  {/* code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmation code"
                      placeholderTextColor="#0468d4"
                      keyboardType={"numeric"}
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      onSubmitEditing={event => {
                        this.confirmSignUp();
                      }}
                      onChangeText={value =>
                        this.onChangeText("authCode", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.confirmSignUp()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Confirm Sign Up</Text>
                  </TouchableOpacity>

                  <Button
                    title="Resend Code"
                    color="#841584"
                    onPress={() => this.resendSignUp()}
                  />
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
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#23ccc9"
  },
  itemStyle: {
    marginBottom: 10,
    borderColor: "#5a52a5"
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
    marginBottom: 10,
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
    height: 600,
    bottom: 270,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  textStyle: {
    padding: 5,
    fontSize: 18
  },
  countryStyle: {
    flex: 1,
    backgroundColor: "#99ff",
    borderTopColor: "#211f",
    borderTopWidth: 1,
    padding: 12
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#211f",
    backgroundColor: "#fff3"
  }
});
