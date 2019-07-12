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
  description: "",
  address: "",
  name: "",
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
          "Sucessful! Please finish the following options and click the submit button"
        );
      })
      .catch(err => {
        this.setState({ loading: false });
        Alert.alert(
          "Error when register: please provide the correct telephone format"
        );
      });
  };
  submit = () => {
    this.setState({ loading: true });
    const { photo_uri, description } = this.state;
  };
  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;
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
                  {/*  photo_uri section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="image" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="profile photo url"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("photo_uri", value)
                      }
                    />
                  </Item>
                  {/*  description section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="book" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="venue description"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref="SecondInput"
                      onSubmitEditing={event => this.submit()}
                      onChangeText={value =>
                        this.onChangeText("description", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.submit()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
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
