import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import DealCard from "./deals-screen/DealCard";
import BurgerMenuHeader from "./BurgerMenuHeader";
import Loading from "./Loading";
import { LinearGradient } from "expo-linear-gradient";
import { API, graphqlOperation } from "aws-amplify";
import { listOffers } from "../graphql/queries";
import { onCreateOffer } from "../graphql/subscriptions";

const MainView = styled.ScrollView`
  flex: 1;
  background-color: #fdd96e;
`;
const MapWrapper = styled.View`
  align-items: center;
`;

export default class HomeScreen extends Component {
  state = { offers: [], loading: true, time: 0 };
  render() {
    const { offers, time } = this.state;
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const { loading } = this.state;

    if (loading) return <Loading />;
    return (
      <>
        <BurgerMenuHeader navigation={navigation} />
        <MainView>
          <LinearGradient colors={["#fdd96e", "#fdc41c", "#f0a202"]}>
            <MapWrapper>
              {/* map over deals and create a card for each deal */}
              {offers.map(offer => {
                const {
                  created_at,
                  id,
                  drink,
                  price,
                  quantity,
                  type,
                  duration,
                  venue_name
                } = offer;

                return (
                  <View key={id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate("Coupon", {
                          drink,
                          price,
                          quantity,
                          type,
                          coupon_id: id,
                          duration:
                            (created_at + duration * 60 * 1000 - time) / 1000
                        })
                      }
                    >
                      <DealCard
                        drink={drink}
                        price={price}
                        quantity={quantity}
                        type={type}
                        duration={
                          (created_at + duration * 60 * 1000 - time) / 1000
                        }
                        venueName={venue_name}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </MapWrapper>
          </LinearGradient>
        </MainView>
      </>
    );
  }
  async componentDidMount() {
    const { data } = await API.graphql(graphqlOperation(listOffers));
    const time = Date.now();
    const offers = data.listOffers.items
      .filter(offer => {
        return offer.created_at + offer.duration * 60000 - time > 0;
      })
      .sort((a, b) => b.created_at - a.created_at);
    this.setState({
      offers,
      time,
      loading: false
    });
    //initialize subscription
    this.subscription = API.graphql(graphqlOperation(onCreateOffer)).subscribe({
      next: OfferData => {
        const newOffers = [OfferData.value.data.onCreateOffer, ...offers];
        this.setState({ offers: newOffers });
      }
    });
  }
  // // remove the subscription in componentWillUnmount
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
}
