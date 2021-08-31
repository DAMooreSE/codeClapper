const firebase = require("firebase/app")

module.exports = async function updateExportState(uid, sessionId, state) {
  firebase.firestore().collection("users").doc(uid).collection("sessions").doc(sessionId).update({
    exportStatus: state,
  })
}
