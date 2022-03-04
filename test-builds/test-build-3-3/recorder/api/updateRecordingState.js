const firebase = require("firebase/app")

module.exports = async function updateRecordingState(uid, state) {
  const ref = await firebase.firestore().collection("users").doc(uid)
  await ref.set(
    {
      recordingState: state,
    },
    { merge: true },
  )
}
