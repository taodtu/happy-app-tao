// eslint-disable
// this is an auto generated file. This will be overwritten

export const getOwner = `query GetOwner($id: ID!) {
  getOwner(id: $id) {
    id
    phone_number
    address
    placeID
    lat
    lng
    name
    photo_uri
    title
    description
  }
}
`;
export const listOwners = `query ListOwners(
  $filter: ModelOwnerFilterInput
  $limit: Int
  $nextToken: String
) {
  listOwners(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      phone_number
      address
      placeID
      lat
      lng
      name
      photo_uri
      title
      description
    }
    nextToken
  }
}
`;
export const getOffer = `query GetOffer($id: ID!) {
  getOffer(id: $id) {
    id
    venue_name
    duration
    price
    quantity
    drink
    created_at
    ownerID
  }
}
`;
export const listOffers = `query ListOffers(
  $filter: ModelOfferFilterInput
  $limit: Int
  $nextToken: String
) {
  listOffers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      venue_name
      duration
      price
      quantity
      drink
      created_at
      ownerID
    }
    nextToken
  }
}
`;
