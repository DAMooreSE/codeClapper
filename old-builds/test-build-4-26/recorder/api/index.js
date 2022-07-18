const firebase = require("firebase/app")

function getUserRef(uid) {
  return firebase.firestore().collection("users").doc(uid)
}

function getSessionsRef(uid) {
  return getUserRef(uid).collection("sessions")
}

module.exports.createSession = async function createSession(uid) {
  const sessionsCollection = getSessionsRef(uid)

  const sessionRef = await sessionsCollection.add({
    startDate: Date.now(),
    completed: false,
  })

  return sessionRef.id
}

module.exports.endSession = async function createSession(uid, sessionId, ctime) {
  const sessionRef = await getSessionsRef(uid).doc(sessionId)

  await sessionRef.update({
    ctime,
    completed: true,
  })
}
