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
import { Container, Item, Input, Icon, Picker } from "native-base";

const INPUT = {
  type: "",
  duration: "",
  price: "",
  drink: "",
  quantity: ""
};
export default class PromoScreen extends React.Component {
  state = {
    id: "",
    created_at: "",
    venue_name: "",
    ownerID: "",
    ...INPUT
  };
  componentDidMount = async () => {
    Auth.currentAuthenticatedUser()
      .then(async user => {
        const { data } = await API.graphql(
          graphqlOperation(getOwner, { id: user.username })
        );
        this.setState({
          ownerID: user.username,
          venue_name: data.getOwner.name
        });
      })
      .catch(err => console.log(err));
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  submit = async () => {
    const offer = {
      ...this.state,
      created_at: Date.now(),
      id: Math.random().toString()
    };
    try {
      await API.graphql(graphqlOperation(createOffer, { input: offer }));
      await this.setState({ ...INPUT });
      Alert.alert("Sucessful, new promo released!");
    } catch (err) {
      this.setState({ ...INPUT });
      console.log("error: ", err);
    }
  };
  render() {
    const { duration, price, drink, quantity, type } = this.state;
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
                  <Text style={styles.Text}>
                    Create a new promo (make sure all fields are filled)
                  </Text>
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
                      returnKeyType="next"
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
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref="FourthInput"
                      onChangeText={value =>
                        this.onChangeText("quantity", value)
                      }
                    />
                  </Item>
                  {/*  Type section  */}
                  <Item style={styles.pickerStyle}>
                    <Picker
                      mode="dropdown"
                      placeholder="Select drink type"
                      placeholderStyle={{ color: "#0468d4" }}
                      placeholderIconColor="#007aff"
                      style={{ borderColor: "#0468d4" }}
                      selectedValue={type}
                      ref="FifthInput"
                      onValueChange={selectedValue =>
                        this.onChangeText("type", selectedValue)
                      }
                    >
                      <Picker.Item label="Select a drink type" value="" />
                      <Picker.Item label="Beer" value="Beer" />
                      <Picker.Item label="Wine" value="Wine" />
                      <Picker.Item label="Spirits" value="Spirits" />
                      <Picker.Item label="Cocktail" value="Cocktail" />
                      <Picker.Item
                        label="Non-alcoholic"
                        value="Non-alcoholic"
                      />
                    </Picker>
                  </Item>
                  <TouchableOpacity
                    disabled={
                      duration === "" ||
                      price === "" ||
                      drink === "" ||
                      quantity === "" ||
                      type === ""
                    }
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
  pickerStyle: {
    marginBottom: 30,
    borderColor: "#5a52a5"
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
