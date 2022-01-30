#!/usr/bin/env node
const yargs = require("yargs")

const signup = require("./commands/signupCommand")
const login = require("./commands/loginCommand")
const start = require("./commands/startCommand")
const test = require("./commands/testCommand")

var firebase = require("firebase/app")

// Add the Firebase products that you want to use
require("firebase/auth")
require("firebase/firestore")
require("firebase/storage")

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyC8VQ3S6g_wcCbOyP5xEbK2ARvqkN-0oi8",
  authDomain: "codeclapper-994f2.firebaseapp.com",
  databaseURL: "https://codeclapper-994f2-default-rtdb.firebaseio.com",
  projectId: "codeclapper-994f2",
  storageBucket: "codeclapper-994f2.appspot.com",
  messagingSenderId: "226109092427",
  appId: "1:226109092427:web:1cc37f309de70aa8c1d3ce"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

yargs
  .command(
    "start",
    "Starts the recording agent - it listens for commands from your phone",
    (yargs) => {
      return yargs
    },
    start
  )
  .command(
    "signup",
    "Sign up to the service using your email and password",
    (yargs) => {
      return yargs
        .describe("email", "Your email address")
        .describe("password", "Your password")
        .demandOption(["email", "password"])
    },
    signup
  )
  .command(
    "login",
    "Log in to the service with your email and password",
    (yargs) => {
      return yargs
        .describe("email", "Your email address")
        .describe("password", "Your password")
        .demandOption(["email", "password"])
    },
    login
  )
  .command(
    "test",
    "Sends a test action",
    (yargs) => {
      return yargs
    },
    test
  )
  .demandCommand()
  .help("h").argv


