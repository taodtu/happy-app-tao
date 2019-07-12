import React from "react";
import Auth from "@aws-amplify/auth";
import Loading from "../Loading";
import { getOwner } from "../../Api";
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
import MenuButton from "../MenuButton";

const INITIAL_STATE = {
  email: "",
  phone_number: "",
  short_des: "",
  long_des: "",
  address: "",
  name: "",
  photo_uri: "",
  lat: 53.4868458,
  lng: -2.2401032,
  register: true,
  loading: false
};
export default class HomeScreen extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  componentDidMount = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          email: user.attributes.email
        });
      })
      .catch(err => console.log(err));
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  getOwner = () => {
    getOwner(this.state.phone_number).then(
      ({ formatted_address, geometry, name }) => {
        this.setState({});
      }
    );
  };
  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;
    const {
      email,
      phone_number,
      short_des,
      long_des,
      address,
      name,
      photo_uri,
      lng,
      lat,
      register
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <MenuButton navigation={this.props.navigation} />
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
                  <Text style={styles.Text}>
                    Please use your google map phone number to register and
                    follow the format as below{" "}
                  </Text>
                  {/*  phone_number section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="call" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="441618344989"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.getOwner();
                      }}
                      onChangeText={value =>
                        this.onChangeText("phone_number", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.getOwner()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                  {/* <Button
                    title="Resend Code"
                    color="#841584"
                    onPress={() => this.resendSignUp()}
                  /> */}
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
    marginBottom: 10
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
  },
  Text: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#5a52a5",
    marginBottom: 20
  }
});
