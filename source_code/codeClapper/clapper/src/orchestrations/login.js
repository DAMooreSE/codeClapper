import store from "../stores/AppStore";
import { loginWithEmail } from "../services/api";

export default async function login(email, password) {
  if (store.isAuthenticating) {
    return;
  }

  store.setAuthenticating(true);

  try {
    const result = await loginWithEmail(email, password);
    store.setProfile(result.user);
  } catch (error) {
    store.setAuthenticationError(error);
    store.setAuthenticating(false);
  }
}
