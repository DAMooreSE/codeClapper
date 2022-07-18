import store from "../stores/AppStore";
import { putVideoClipEndDate } from "../services/api";

export default async function endClipVideo(history) {
  const { selectedSession, selectedClip } = store;

  if (!selectedSession) {
    history.push("/");
    return;
  }

  if (!selectedClip) {
    history.push(`/sessions/${selectedSession.id}`);
    return;
  }

  store.setSpinner(true);
  try {
    putVideoClipEndDate(selectedSession.id, selectedClip.id);
    history.push(`/sessions/${selectedSession.id}/clips/${selectedClip.id}`);
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);
}
