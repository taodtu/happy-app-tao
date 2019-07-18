import React from "react";
import Auth from "@aws-amplify/auth";
import logo from "../images/beer.png";
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
  Image,
  Button
} from "react-native";
import { Container, Item, Input, Icon } from "native-base";
import MenuButton from "./MenuButton";

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
    try {
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
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <SafeAreaView style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
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
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Image source={logo} style={styles.image} />
                  </View>
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
  image: {
    width: 80,
    height: 80,
    marginBottom: 20
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
    marginBottom: 20,
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
    marginBottom: 20,
    borderRadius: 24
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  Text: {
    textAlign: "center"
  },
  Button: {
    marginBottom: 20
  }
});
