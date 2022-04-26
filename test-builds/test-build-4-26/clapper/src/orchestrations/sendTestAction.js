import store from "../stores/AppStore";
const firebase = require("firebase/app");

// Build the interactions just for getDevices, but then use that as a template
// to do Request/Response interaction with recording device

//todo: need to unsubscribe after a timeout and return an error
export default async function getDevices() {
  const { profile } = store;

  const db = firebase.firestore();
  const userRef = db.collection("users").doc(profile.uid);

  const ref = await userRef.collection("actions").add({
    status: "pending",
    type: "get-devices",
  });

  console.log("sent a test action!", ref);

  const unsubscribe = ref.onSnapshot((snap) => {
    const data = snap.data();

    if (data.status === "done") {
      console.log(data);
      unsubscribe();
    }
  });
}
