import axios from "axios";
import { googleApiKey } from "../apiKey";

const request = axios.create({
  baseURL: "https://uo5xzzqrwb.execute-api.us-east-1.amazonaws.com/dev/api/"
});

export const getOwner = phoneNumber => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%2B${phoneNumber}&inputtype=phonenumber&fields=formatted_address,name,place_id,geometry&key=${googleApiKey}`
    )
    .then(({ data }) => data.candidates[0]);
};

export const getOffers = () => {
  return request.get(`offers`).then(({ data }) => {
    return data;
  });
};
