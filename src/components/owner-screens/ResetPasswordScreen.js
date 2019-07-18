import React from "react";
import Auth from "@aws-amplify/auth";
import Loading from "../Loading";
import MenuButton from "../MenuButton";
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
  Alert
} from "react-native";
import { Container, Item, Input, Icon } from "native-base";
export default class SettingScreen extends React.Component {
  state = {
    password1: "",
    password2: "",
    loading: false
  };
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  changePassword = async () => {
    try {
      const { password1, password2 } = this.state;
      this.setState({ loading: true });
      await Auth.currentAuthenticatedUser()
        .then(user => {
          return Auth.changePassword(user, password1, password2);
        })
        .then(data => this.setState({ loading: false }))
        .catch(err => {
          if (!err.message) {
            this.setState({ loading: false });
            Alert.alert("Error changing password: ", err);
          } else {
            this.setState({ loading: false });
            Alert.alert("Error changing password: ", err.message);
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
              {/*Infos*/}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <View
                    style={[
                      styles.buttonStyle,
                      { borderRadius: 4, marginBottom: 20 }
                    ]}
                  >
                    <Text style={styles.buttonText}>Change password</Text>
                  </View>
                  {/* Old password */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Old password"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("password1", value)
                      }
                    />
                  </Item>
                  {/* New password */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="New password"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText("password2", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={this.changePassword}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: 40
                    }}
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
    backgroundColor: "#5fd8fab7",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: "#5fd8fa"
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
    backgroundColor: "#fa5f9d",
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
