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
  apiKey: "AIzaSyAG3XPMSeY2cbm1o10lqvrwotuHOF7oGmo",
  authDomain: "ppc-recorder.firebaseapp.com",
  databaseURL: "https://ppc-recorder.firebaseio.com",
  projectId: "ppc-recorder",
  storageBucket: "ppc-recorder.appspot.com",
  messagingSenderId: "449196439956",
  appId: "1:449196439956:web:5048e1d9494a7a32217781",
  measurementId: "G-Q5L4ZM9QTN",
}

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


