import React from "react";
import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";
import { createOffer } from "../../graphql/mutations";
import { getOwner } from "../../graphql/queries";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert
} from "react-native";
import MenuButton from "../MenuButton";
import { Container, Item, Input, Icon } from "native-base";
export default class PromoScreen extends React.Component {
  state = {
    id: "",
    created_at: "",
    venue_name: "",
    ownerID: "",
    duration: "",
    price: "",
    drink: "",
    quantity: ""
  };
  componentDidMount = async () => {
    Auth.currentAuthenticatedUser()
      .then(async user => {
        const { data } = await API.graphql(
          graphqlOperation(getOwner, { id: user.username })
        );
        this.setState({
          ownerID: user.username,
          id: Math.random(),
          venue_name: data.getOwner.name
        });
      })
      .catch(err => console.log(err));
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  submit = () => {
    this.setState({ loading: true });
    const {} = this.state;
  };
  render() {
    const { duration, price, drink, quantity } = this.state;
    return (
      <SafeAreaView style={styles.container}>
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
                  <Text style={styles.Text}>Create a new promo</Text>
                  {/*  duration section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Input
                      style={styles.input}
                      value={duration}
                      placeholder="duration (minutes)"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("duration", value)
                      }
                    />
                  </Item>
                  {/*  price section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Input
                      style={styles.input}
                      value={price}
                      placeholder="Price £"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      ref="SecondInput"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.ThirdInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("price", value)}
                    />
                  </Item>
                  {/*  drink section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Input
                      style={styles.input}
                      value={drink}
                      placeholder="Drink"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref="ThirdInput"
                      onSubmitEditing={event => {
                        this.refs.FourthInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("drink", value)}
                    />
                  </Item>
                  {/*  quantity section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Input
                      style={styles.input}
                      value={quantity}
                      placeholder="Quantity"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref="FourthInput"
                      onSubmitEditing={event => this.submit()}
                      onChangeText={value => this.onChangeText("drink", value)}
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
    backgroundColor: "#FDD96E",
    justifyContent: "center",
    flexDirection: "column"
  },
  input: {
    textAlign: "center",
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
    backgroundColor: "#FDD96E"
  },
  itemStyle: {
    marginBottom: 10,
    borderColor: "#5a52a5"
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
