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
  apiKey: "AIzaSyBoSQoPY5lSN6lp8-bj4mLVIVcxT_wvI4k",
  authDomain: "codeclapper-d8a72.firebaseapp.com",
  databaseURL: "https://codeclapper-d8a72-default-rtdb.firebaseio.com",
  projectId: "codeclapper-d8a72",
  storageBucket: "codeclapper-d8a72.appspot.com",
  messagingSenderId: "992550955729",
  appId: "1:992550955729:web:268c66ceb8160fde26b3f0"
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


