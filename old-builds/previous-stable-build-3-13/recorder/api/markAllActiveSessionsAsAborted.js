const firebase = require("firebase/app")

module.exports = async function markAllActiveSessionsAsAborted(uid) {
  const sessionCollection = firebase.firestore().collection("users").doc(uid).collection("sessions")

  const result = await sessionCollection.where("completed", "==", false).get()

  const batch = firebase.firestore().batch()

  result.docs.forEach((doc) => {
    console.log("going to update a doc as aborted! ", doc.id)
    const docRef = sessionCollection.doc(doc.id)
    batch.update(docRef, {
      endDate: Date.now(),
      completed: true,
      aborted: true,
    })
  })

  await batch.commit()
}
