const firebase = require("firebase/app")

const loginWithCredential = require("../lib/loginWithCredential")

module.exports = async function testCommand() {
  const uid = await loginWithCredential()
  const db = firebase.firestore()
  const userRef = db.collection("users").doc(uid)

  await userRef.collection("actions").add({
    status: "pending",
    type: "get-devices",
  })

  console.log("sent a test action!")

  process.exit(0)
}
