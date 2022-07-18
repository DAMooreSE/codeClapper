import uuid from "uuid";
import { History } from "history";
import store from "../stores/AppStore";
import { postClipToSession } from "../services/api";

export default async function addClipToSession(history) {
  const { selectedSession } = store;

  if (!selectedSession) {
    // todo: add logging library for stuff like this
    return;
  }

  const clip = {
    startDate: Date.now(),
    id: uuid.v4(),
    audioClips: {},
    completed: false,
  };

  // do this in api
  store.setSpinner(true);
  try {
    postClipToSession(selectedSession.id, clip);
    history.push(`/sessions/${selectedSession.id}/clips/${clip.id}/video`);
  } catch (err) {
    console.error(err);
    store.setApiError(true);
  }
  store.setSpinner(false);
}
