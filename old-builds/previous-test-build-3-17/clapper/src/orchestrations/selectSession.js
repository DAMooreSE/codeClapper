import store from "../stores/AppStore";
import loadSessions from "./loadSessions";

export default async function selectSession(sessionId) {
  await loadSessions();
  store.selectSession(sessionId);
}
