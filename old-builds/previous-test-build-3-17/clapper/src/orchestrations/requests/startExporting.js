import store from "../../stores/AppStore";
import { exportStates } from "../../stores/constants";
import { updateSessionExportStatus } from "../../services/api";
const firebase = require("firebase/app");

// Build the interactions just for getDevices, but then use that as a template
// to do Request/Response interaction with recording device

//todo: need to unsubscribe after a timeout and return an error
//todo: set error on store
export default async function startExporting() {
  const { profile, selectedSession } = store;
  updateSessionExportStatus(selectedSession.id, exportStates.STARTING);

  try {
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(profile.uid);

    // todo: consider pulling from the recorder
    const ref = await userRef.collection("actions").add({
      status: "pending",
      request: {
        sessionId: selectedSession.id,
      },
      type: "start-exporting",
    });

    const unsubscribe = ref.onSnapshot((snap) => {
      const data = snap.data();
      // can do stuff here, but we're subscribing on user state
      if (data.status === "done") {
        console.log("started exporting!");
        unsubscribe();
      }
    });
  } catch (err) {
    console.error("Error while trying to trigger export ", err);
    updateSessionExportStatus(selectedSession.id, exportStates.ERRORED);
  }
}
