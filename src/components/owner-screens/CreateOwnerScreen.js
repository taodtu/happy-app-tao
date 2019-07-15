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
  Alert
} from "react-native";
import { Container, Item, Input, Icon } from "native-base";

const INITIAL_STATE = {
  email: "",
  phone_number: "",
  description: "",
  address: "",
  name: "",
  title: "",
  photo_uri: "",
  lat: 53.4868458,
  lng: -2.2401032,
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
    this.setState({ loading: true });
    const { phone_number } = this.state;
    getOwner(phone_number)
      .then(
        ({
          formatted_address,
          geometry: {
            location: { lat, lng }
          },
          name,
          place_id
        }) => {
          this.setState({
            address: formatted_address,
            name,
            place_id,
            lat,
            lng,
            phone_number,
            loading: false
          });
        }
      )
      .then(() => {
        Alert.alert(
          "Sucessful! ",
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("OwnerApp")
          },
          { cancelable: false }
        );
      })
      .catch(err => {
        this.setState({ loading: false });
        Alert.alert(
          "Error when register: please provide the correct telephone format"
        );
      });
  };
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
    await Auth.signOut()
      .then(() => {
        this.props.navigation.navigate("Landing");
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
                  <Text style={styles.Text}>
                    Use your phone # registered in google map{" "}
                  </Text>
                  {/*  phone_number section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="call" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="441234567890"
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
                  <TouchableOpacity
                    style={[
                      styles.buttonStyle,
                      {
                        marginTop: 20,
                        flexDirection: "row",
                        justifyContent: "center"
                      }
                    ]}
                    onPress={this.signOutAlert}
                  >
                    <Icon
                      name="md-power"
                      style={{ color: "#FFF", paddingRight: 10 }}
                    />
                    <Text style={styles.buttonText}>Sign Out</Text>
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
