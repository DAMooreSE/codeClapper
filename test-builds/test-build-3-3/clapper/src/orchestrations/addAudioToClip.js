import uuid from "uuid";
import store from "../stores/AppStore";
import { postAudioClipToActiveClip } from "../services/api";

export default async function addAudioToClip(history) {
  const { selectedSession, selectedClip } = store;

  if (!selectedSession || !selectedClip) {
    console.warn(
      "could not add an audio clip, because we need a selectedSession and selectedClip"
    );
    return;
  }

  const audioClip = {
    startDate: Date.now(),
    id: uuid.v4(),
    completed: false,
  };

  // do this in api
  store.setSpinner(true);
  try {
    postAudioClipToActiveClip(selectedSession.id, selectedClip.id, audioClip);
    history.push(
      `/sessions/${selectedSession.id}/clips/${selectedClip.id}/audio/${audioClip.id}`
    );
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);
}
