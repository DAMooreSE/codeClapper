import store from "../stores/AppStore";
const firebase = require("firebase/app");

export default async function syncUserState() {
  const { profile } = store;

  const db = firebase.firestore();

  db.collection("users")
    .doc(profile.uid)
    .onSnapshot((snap) => {
      const data = snap.data();

      store.setRecordingState(data.recordingState);
    });
}
