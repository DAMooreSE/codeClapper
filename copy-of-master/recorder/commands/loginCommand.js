const handleLogin = require("../lib/login")
const storeUserCredential = require("../lib/storeUserCredential")

require("firebase/firestore")

module.exports = async function loginCommand(argv) {
  try {
    await handleLogin(argv.email, argv.password)

    storeUserCredential(argv.email, argv.password)

    console.log("Logged in")
    process.exit(0)
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    // ...

    console.error(errorCode, errorMessage)
  }
}
