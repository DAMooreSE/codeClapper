import store from "../stores/AppStore";
import { putClipEndDate } from "../services/api";

export default async function endClip(history) {
  const { selectedSession, selectedClip } = store;

  if (!selectedSession || !selectedClip) {
    console.warn("could not end clip");
    return;
  }

  store.setSpinner(true);
  try {
    putClipEndDate(selectedSession.id, selectedClip.id);
    history.push(`/sessions/${selectedSession.id}`);
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);
}
