import store from "../stores/AppStore";
import { putAudioClipAbort } from "../services/api";

export default async function abortAudioClip(history) {
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

  // do this in api
  store.setSpinner(true);
  try {
    putAudioClipAbort(
      selectedSession.id,
      selectedClip.id,
      selectedAudioClip.id
    );
    history.push(`/sessions/${selectedSession.id}/clips/${selectedClip.id}`);
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);
}
