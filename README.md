# Appy App

Appy App is an instant notification service that lets pubs and bars send out promotions and offers to app users on an immediate-start, time-limited basis, to add a dynamic aspect to nights out. Here is a video demo (https://youtu.be/W_vw-W-yvEI).

This is the updated version of the final week project of Northcoders with a group of 5. In this version, I wrote most of the front-end and completely replaced the backen-end of the group version with my own back-end 

On the front-end, this project uses React Native, QR codes for coupon generation, Geolocation with calls to Google Places API and Google Maps API, and AWS Cognito for authentification. For the back-end, the tech stack includes DynamoDB, real-time graphql server built with AWS AppSync.

Tech stack:

![tech stack](https://github.com/taodtu/happy-app-tao/blob/dev/src/images/tech%20stack.png)

App structure:

![App structure](https://github.com/taodtu/happy-app-tao/blob/dev/src/images/app%20flow.png)

# Installation

Make sure AWS Amplify and Expo is installed globally in your computer and configured.

run : npm install

then run: amplify init

When prompt for source directory type src.

run: amplify add auth

Add your google api key: first, get your API Key from google developer console, and enable google place and google maps api service. Then, in the root, create a file as apiKey.js, inside write: export const googleApiKey = "Your API Key"; In app.json file, change: "ios": { "bundleIdentifier": "any thing you like to put here", "config": { "googleMapsApiKey": "YOUR IOS API KEY HERE" } }.

run: expo start
