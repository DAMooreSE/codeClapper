import firebase from "firebase/app";
import store from "../stores/AppStore";
import syncUserState from "./syncUserState";

export default async function checkAuthState(history) {
  store.setCheckingAuth(true);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.setProfile(user);
      syncUserState();
    }

    store.setCheckingAuth(false);
  });
}
