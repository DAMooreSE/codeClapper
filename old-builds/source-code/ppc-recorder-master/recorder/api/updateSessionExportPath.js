const firebase = require("firebase/app")

module.exports = function updateSessionExportPath(uid, sessionId, url) {
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("sessions")
    .doc(sessionId)
    .update({
      url,
    })
}
