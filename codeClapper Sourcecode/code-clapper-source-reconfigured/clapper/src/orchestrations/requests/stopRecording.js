import store from "../../stores/AppStore";
import { recordingStates, exportStates } from "../../stores/constants";
const firebase = require("firebase/app");

// Build the interactions just for getDevices, but then use that as a template
// to do Request/Response interaction with recording device

//todo: need to unsubscribe after a timeout and return an error
//todo: set error on store
export default async function stopRecording(history) {
  const {
    profile,
    activeSession: { id },
  } = store;

  store.setRecordingState(recordingStates.STOPPING);

  const db = firebase.firestore();
  const userRef = db.collection("users").doc(profile.uid);

  console.log("going to update sessions to endTime ", id);

  await userRef.collection("sessions").doc(id).update({
    endDate: Date.now(),
    exportStatus: exportStates.IDLE,
  });

  const ref = await userRef.collection("actions").add({
    status: "pending",
    type: "stop-recording",
  });

  const unsubscribe = ref.onSnapshot((snap) => {
    const data = snap.data();
    // can do stuff here, but we're subscribing on user state
    if (data.status === "done") {
      history.push(`/sessions/${id}/exporting`);
      unsubscribe();
    }
  });
}
