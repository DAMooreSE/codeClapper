import store from "../../stores/AppStore";
const firebase = require("firebase/app");

// Build the interactions just for getDevices, but then use that as a template
// to do Request/Response interaction with recording device

//todo: need to unsubscribe after a timeout and return an error
//todo: set error on store
export default async function syncDevices() {
  const { profile } = store;

  store.setFetchingDevices();

  const db = firebase.firestore();
  const userRef = db.collection("users").doc(profile.uid);

  const ref = await userRef.collection("actions").add({
    status: "pending",
    type: "get-devices",
  });

  const unsubscribe = ref.onSnapshot((snap) => {
    const data = snap.data();

    if (data.status === "done") {
      console.log(data);
      store.setDevices(data.response);
      unsubscribe();
    }
  });
}
