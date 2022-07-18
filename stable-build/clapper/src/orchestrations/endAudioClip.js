import store from "../stores/AppStore";
import { putAudioClipEndDate } from "../services/api";
import addAudioToClip from "./addAudioToClip";

export default async function endAudioClip(history, addNew) {
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
    putAudioClipEndDate(
      selectedSession.id,
      selectedClip.id,
      selectedAudioClip.id
    );

    if (addNew) {
      await addAudioToClip(history);
      return;
    }

    history.push(`/sessions/${selectedSession.id}/clips/${selectedClip.id}`);
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);
}
