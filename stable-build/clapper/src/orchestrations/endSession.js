import store from "../stores/AppStore";
import { putSessionEndDate } from "../services/api";

export default async function endSession(history) {
  const { selectedSession } = store;

  if (!selectedSession) {
    // todo: add logging library for stuff like this
    return;
  }

  store.setSpinner(true);
  try {
    putSessionEndDate(selectedSession.id);
  } catch (err) {
    store.setApiError(true);
  }
  store.setSpinner(false);

  history.push("/");
}
