import store from "../stores/AppStore";
import { putAudioClipStartDate } from "../services/api";

export default async function restartAudioClip(history) {
  const { selectedSession, selectedClip, selectedAudioClip } = store;

  if (!selectedSession) {
    history.push("/");
    return;
  }

  if (!selectedClip) {
    history.push(`/sessions/${selectedSession.id}`);
    return;
  }

  if (!selectedAudioClip) {
    history.push(`/sessions/${selectedSession.id}/clips/${selectedClip.id}`);
    return;
  }

  store.setSpinner(true);
  try {
    await putAudioClipStartDate(
      selectedSession.id,
      selectedClip.id,
      selectedAudioClip.id
    );
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);
}
