import store from "../stores/AppStore";
import { putClipStartDate } from "../services/api";

export default async function restartClip(history) {
  const { selectedSession, selectedClip } = store;

  if (!selectedSession) {
    history.push("/");
    return;
  }

  if (!selectedClip) {
    history.push(`/sessions/${selectedSession.id}`);
    return;
  }

  // do this in api
  store.setSpinner(true);
  try {
    await putClipStartDate(selectedSession.id, selectedClip.id);
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);
}
