import { syncSessions, getSessions } from "../services/api";
import store from "../stores/AppStore";

let subscribed = false;

export default async function loadSessions() {
  console.log("loading Sessions!");
  if (subscribed) {
    console.log("already subscribed, not going to call it again");
    return;
  }

  if (store.loadingSessions) {
    return;
  }

  store.loadingSessions = true;
  store.setSessions([]);

  try {
    const apiSessions = await getSessions();
    store.setSessions(apiSessions);

    syncSessions((session) => store.updateSession(session));

    subscribed = true;

    store.loadingSessions = false;
  } catch (ex) {
    store.loadingSessions = false;
    store.apiHasError = true;

    console.error(ex);
  }
}
