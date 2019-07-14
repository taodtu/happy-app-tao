import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { dealsObj } from "../data/deals-data";
import DealCard from "./deals-screen/DealCard";
import {
  getOffers,
  getOffersByOwnerId,
  postOwner,
  updateOwnerDetails,
  deleteOwner
} from "../Api";

const MainView = styled.ScrollView`
  flex: 1;
  background-color: #eac5d8;
`;

const CardWrapper = styled.TouchableOpacity``;

export default class HomeScreen extends Component {
  state = { offers: [] };
  render() {
    const { offers } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <MainView>
        {/* map over deals and create a card for each deal */}
        {offers.map(venue => {
          const {
            active,
            coupon_id,
            drink,
            price,
            quantity,
            timerImg,
            type,
            couponID,
            duration
          } = venue;
          return (
            <View key={coupon_id}>
              <TouchableOpacity
                onPress={() =>
                  navigate("Coupon", {
                    drink: drink,
                    price: price,
                    quantity: quantity,
                    type: type,
                    couponID: couponID,
                    duration: duration
                  })
                }
              >
                <DealCard
                  timerImg={timerImg}
                  drink={drink}
                  price={price}
                  quantity={quantity}
                  type={type}
                  duration={duration}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </MainView>
    );
  }
  componentDidMount() {
    getOffers().then(offers => this.setState({ offers }));
    // getOffersByOwnerId("03a27660-a4b7-11e9-ac27-97a3f1fac344").then(res => {
    //   console.log(res);
    // });
    // postOwner({
    // phoneNumber: "87485959063",
    // place_id: "iuhff6",
    // venueName: "Testing Post",
    // address: "Deansgate",
    // photoUri: "iuhdoidsax.com",
    // email: "billy@theWhiteParadise.com",
    // longDescription: "a cool semi paradise where people have experiences",
    // data_type: "profile",
    // shortDescription: "Paradise",
    // longitude: "54675",
    // latitude: "8697"
    // }).then(console.log);
    // updateOwnerDetails("03a27660-a4b7-11e9-ac27-97a3f1fac344", {
    //   phoneNumber: "87485959063",
    //   place_id: "iuhff6",
    //   venueName: "Testing Put",
    //   address: "Deansgate",
    //   photoUri: "iuhdoidsax.com",
    //   email: "billy@theWhiteParadise.com",
    //   longDescription: "a cool semi paradise where people have experiences",
    //   data_type: "profile",
    //   shortDescription: "Paradise",
    //   longitude: "54675",
    //   latitude: "8697"
    // }).then(console.log);
    deleteOwner("03a27660-a4b7-11e9-ac27-97a3f1fac344");
  }
}
