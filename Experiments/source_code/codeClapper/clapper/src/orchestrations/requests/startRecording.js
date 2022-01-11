import store from "../../stores/AppStore";
import { recordingStates } from "../../stores/constants";
const firebase = require("firebase/app");

// Build the interactions just for getDevices, but then use that as a template
// to do Request/Response interaction with recording device

//todo: need to unsubscribe after a timeout and return an error
//todo: set error on store
export default async function startRecording({ screen, mic, history }) {
  const { profile } = store;

  store.setRecordingState(recordingStates.STARTING);

  const db = firebase.firestore();
  const userRef = db.collection("users").doc(profile.uid);

  const ref = await userRef.collection("actions").add({
    status: "pending",
    request: {
      screenId: screen,
      micId: mic,
    },
    type: "start-recording",
  });

  const unsubscribe = ref.onSnapshot((snap) => {
    const data = snap.data();
    // can do stuff here, but we're subscribing on user state
    if (data.status === "done") {
      history.push(`/sessions/${data.response.sessionId}`);
      unsubscribe();
    }
  });
}
