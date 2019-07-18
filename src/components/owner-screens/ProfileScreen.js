import React from "react";
import Auth from "@aws-amplify/auth";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Alert
} from "react-native";
import Image from "react-native-scalable-image";
import MenuButton from "../MenuButton";
import { API, graphqlOperation } from "aws-amplify";
import { getOwner } from "../../graphql/queries";
import { onUpdateOwner } from "../../graphql/subscriptions";

const INITIAL_STATE = {
  userID: "",
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
export default class PromoScreen extends React.Component {
  state = { ...INITIAL_STATE };
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(async user => {
        try {
          const { data } = await API.graphql(
            graphqlOperation(getOwner, { id: user.username })
          );
          this.setState({ ...data.getOwner });
          //initialize subscription
          this.subscription = API.graphql(
            graphqlOperation(onUpdateOwner)
          ).subscribe({
            next: OwnerData => {
              const newOwner = OwnerData.value.data.onUpdateOwner;
              this.setState({ ...newOwner });
            }
          });
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => console.log(err));
  }
  //  remove the subscription in componentWillUnmount
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  render() {
    const {
      phone_number,
      description,
      address,
      name,
      title,
      photo_uri,
      lat,
      lng
    } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "#FDD96E" }}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.textStyle}>{name}</Text>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <Text style={styles.phone}>Tel: +{phone_number}</Text>
          {photo_uri ? (
            <Image
              width={Dimensions.get("window").width - 32}
              style={{ marginBottom: 10 }}
              source={{ uri: `${photo_uri}` }}
            />
          ) : null}
          {description ? <Text style={styles.phone}>{description}</Text> : null}
          <Text style={styles.title}>{address}</Text>
          <MapView
            style={styles.map}
            provider="google"
            region={{
              latitude: 53.4808,
              longitude: -2.2426,
              latitudeDelta: 0.03,
              longitudeDelta: 0.02
            }}
          >
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lng
              }}
              title={name}
              description={title}
            />
          </MapView>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDD96E",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 16,
    marginRight: 16
  },
  map: { marginTop: 10, alignSelf: "stretch", height: 300 },

  textStyle: {
    marginTop: 70,
    fontSize: 17,
    fontWeight: "bold",
    color: "#0468d4"
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#0468d4"
  },
  phone: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    color: "#0468d4"
  },
  offer: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#0468d4"
  }
});
