var firebase = require("firebase/app")
const storeUserCredential = require("../lib/storeUserCredential")

module.exports = async function signupCommand(argv) {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(argv.email, argv.password)

    const db = firebase.firestore()
    await db
      .collection("users")
      .doc(result.user.uid)
      .set({
        email: result.user.email,
        metadata: {
          lastLoginTime: Date.now(),
          creationTime: result.user.metadata.creationTime,
        },
      })

    storeUserCredential(argv.email, argv.password)
	process.exit(0)
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    // ...

    console.error(errorCode, errorMessage)
  }
}
