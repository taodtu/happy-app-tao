// eslint-disable
// this is an auto generated file. This will be overwritten

export const createOwner = `mutation CreateOwner($input: CreateOwnerInput!) {
  createOwner(input: $input) {
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
export const updateOwner = `mutation UpdateOwner($input: UpdateOwnerInput!) {
  updateOwner(input: $input) {
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
}
`;
export const deleteOwner = `mutation DeleteOwner($input: DeleteOwnerInput!) {
  deleteOwner(input: $input) {
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
}
`;
export const createOffer = `mutation CreateOffer($input: CreateOfferInput!) {
  createOffer(input: $input) {
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
export const updateOffer = `mutation UpdateOffer($input: UpdateOfferInput!) {
  updateOffer(input: $input) {
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
export const deleteOffer = `mutation DeleteOffer($input: DeleteOfferInput!) {
  deleteOffer(input: $input) {
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
