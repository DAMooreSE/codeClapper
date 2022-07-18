import store from "../stores/AppStore";
import loadSessions from "./loadSessions";

export default async function selectClip(sessionId, clipId) {
  await loadSessions();
  store.selectClip(sessionId, clipId);
}
