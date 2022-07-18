import store from "../stores/AppStore";
import loadSessions from "./loadSessions";

export default async function selectAudioClip(sessionId, clipId, audioClipId) {
  await loadSessions();

  store.selectAudioClip(sessionId, clipId, audioClipId);
}
