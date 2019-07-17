import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getOwner } from "../../graphql/queries";
import DealCard from "../deals-screen/DealCard";
import QRCode from "react-native-qrcode";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";

export default class PromoScreen extends React.Component {
  state = {
    owner: {},
    showOwner: false,
    time: 0
  };
  async componentDidMount() {
    try {
      const ownerID = this.props.navigation.getParam("ownerID");
      const { data } = await API.graphql(
        graphqlOperation(getOwner, { id: ownerID })
      );
      this.setState({
        owner: data.getOwner,
        showOwner: true,
        time: Date.now()
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    /*getting items from props*/
    const { navigation } = this.props;
    const name = navigation.getParam("name", "No Name");
    const drink = navigation.getParam("drink", "No Drink");
    const price = navigation.getParam("price", "No Price");
    const quantity = navigation.getParam("quantity", "No Quantity");
    const type = navigation.getParam("type", "No Type");
    const couponID = navigation.getParam("coupon_id", "No Coupon ID");
    const duration = navigation.getParam("duration");
    const created_at = navigation.getParam("created_at");
    //profile props
    const {
      phone_number,
      description,
      address,
      title,
      photo_uri,
      lat,
      lng
    } = this.state.owner;
    return (
      <ScrollView style={{ backgroundColor: "#FDD96E" }}>
        <View style={styles.container}>
          <LinearGradient colors={["#fdd96e", "#fdc41c", "#f0a202"]}>
            <View style={styles.container}>
              <View style={{ marginTop: 30 }} />
              <DealCard
                venueName={name}
                drink={drink}
                price={price}
                quantity={quantity}
                type={type}
                duration={
                  (created_at + duration * 60 * 1000 - this.state.time) / 1000
                }
              />
            </View>
            <View style={styles.container}>
              <QRCode
                value={couponID}
                size={250}
                bgColor="#1cbbf3"
                fgColor="white"
              />
            </View>
          </LinearGradient>
        </View>
        {this.state.showOwner ? (
          <View style={styles.container}>
            <Text style={styles.textStyle}>{name}</Text>
            <Text style={styles.phone}>Tel: +{phone_number}</Text>
            {title ? <Text style={styles.title}>{title}</Text> : <View />}
            {photo_uri ? (
              <Image
                width={Dimensions.get("window").width - 32}
                style={{ marginBottom: 10 }}
                source={{ uri: `${photo_uri}` }}
              />
            ) : (
              <View />
            )}
            {description ? (
              <Text style={styles.title}>{description}</Text>
            ) : (
              <View />
            )}
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
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdd96e",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 16,
    marginRight: 16
  },
  map: { marginTop: 10, alignSelf: "stretch", height: 300 },

  textStyle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#0468d4"
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    color: "#0468d4"
  },
  phone: {
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
