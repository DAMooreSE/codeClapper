const firebase = require("firebase/app")

module.exports = async function login(email, password) {
  const result = await firebase.auth().signInWithEmailAndPassword(email, password)

  const db = firebase.firestore()
  const { uid } = result.user
  var userRef = db.collection("users").doc(uid)
  await userRef.update({
    "metadata.lastLoginTime": Date.now(),
  })

  return uid
}
