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
  apiKey: "AIzaSyDY72P5MTZ3MrFUfJMQu3qQQhKoDSvQykA",
  authDomain: "codeclapper-15c0b.firebaseapp.com",
  databaseURL: "https://codeclapper-15c0b-default-rtdb.firebaseio.com/",
  projectId: "codeclapper-15c0b",
  storageBucket: "codeclapper-15c0b.appspot.com",
  messagingSenderId: "593433560251",
  appId: "1:593433560251:web:8285e293f5ff3cd722559e",
  measurementId: "G-SY7HHR7C1M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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


