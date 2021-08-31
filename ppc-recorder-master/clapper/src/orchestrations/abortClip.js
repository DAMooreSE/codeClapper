import store from "../stores/AppStore";
import { putClipAbort } from "../services/api";

export default async function abortClip(history) {
  const { selectedSession, selectedClip } = store;

  if (!selectedSession || !selectedClip) {
    console.warn("could not abort clip");
    return;
  }

  // do this in api
  store.setSpinner(true);
  try {
    putClipAbort(selectedSession.id, selectedClip.id);
    history.push(`/sessions/${selectedSession.id}`);
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);
}
