// thinking is that the api can add to store
// these are kind of like the actions we have in redux
import firebase from "firebase";
import _ from "lodash";
import store from "../stores/AppStore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDY72P5MTZ3MrFUfJMQu3qQQhKoDSvQykA",
  authDomain: "codeclapper-15c0b.firebaseapp.com",
  databaseURL: "https://codeclapper-15c0b-default-rtdb.firebaseio.com/",
  projectId: "codeclapper-15c0b",
  storageBucket: "codeclapper-15c0b.appspot.com",
  messagingSenderId: "593433560251",
  appId: "1:593433560251:web:8285e293f5ff3cd722559e",
  measurementId: "G-SY7HHR7C1M"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = firebase.firestore();

function getSessionCollection() {
  return db.collection("users").doc(store.profile.uid).collection("sessions");
}

function parseFirebaseDate(date) {
  if (!date) {
    return undefined;
  }

  if (_.isDate(date)) {
    return date;
  }

  if (_.isNumber(date)) {
    return new Date(date);
  }

  return date.toDate();
}

function parseSession(doc) {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    startDate: parseFirebaseDate(data.startDate),
    endDate: parseFirebaseDate(data.endDate),
  };
}

// assumes that the user is logged in
// eslint-disable-next-line import/prefer-default-export
export async function getSessions() {
  const sessions = await getSessionCollection().get();
  const parsedSessions = sessions.docs.map((d) => parseSession(d));
  return parsedSessions;
}

export function syncSessions(onSession) {
  getSessionCollection()
    .where("startDate", ">", Date.now() - 86400000)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(async (snapshot) => {
        onSession(parseSession(snapshot));
      });
    });
}

export function postClipToSession(sessionId, clip) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clip.id}`]: clip,
    });
}

export function putVideoClipEndDate(sessionId, clipId) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clipId}.endDate`]: Date.now(),
    });
}

export function postAudioClipToActiveClip(sessionId, clipId, audioClip) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clipId}.audioClips.${audioClip.id}`]: audioClip,
    });
}

export function putAudioClipEndDate(sessionId, clipId, audioClipId) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clipId}.audioClips.${audioClipId}.endDate`]: Date.now(),
      [`clips.${clipId}.audioClips.${audioClipId}.completed`]: true,
    });
}

export function putAudioClipAbort(sessionId, clipId, audioClipId) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clipId}.audioClips.${audioClipId}.aborted`]: true,
    });
}

export function putAudioClipStartDate(sessionId, clipId, audioClipId) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clipId}.audioClips.${audioClipId}.startDate`]: Date.now(),
    });
}

export function putClipStartDate(sessionId, clipId) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clipId}.startDate`]: Date.now(),
    });
}

export function putClipEndDate(sessionId, clipId) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clipId}.completed`]: true,
    });
}

export function putClipAbort(sessionId, clipId) {
  return getSessionCollection()
    .doc(sessionId)
    .update({
      [`clips.${clipId}.aborted`]: true,
    });
}

export async function stopSession(sessionId, ctime) {
  console.log("stopping session ", {
    sessionId,
    ctime,
  });

  await getSessionCollection()
    .doc(sessionId)
    .update({
      sessionId,
      endDate: Date.now(),
      startDate: new Date(ctime).getTime(),
      completed: true,
    });

  const sessionDoc = await getSessionCollection().doc(sessionId).get();
  return sessionDoc.data();
}

export async function updateSessionExportStatus(sessionId, status) {
  await getSessionCollection().doc(sessionId).update({
    exportStatus: status,
  });
}

export async function startSession(outputFolder) {
  const result = await getSessionCollection()
    .where("completed", "==", false)
    .get();

  const batch = firebase.firestore().batch();
  result.docs.forEach((doc) => {
    const docRef = getSessionCollection().doc(doc.id);
    batch.update(docRef, {
      endDate: Date.now(),
      aborted: true,
      completed: true,
    });
  });

  await batch.commit();

  const response = await getSessionCollection().add({
    startDate: Date.now(),
    folder: outputFolder,
    completed: false,
  });

  const doc = await response.get();

  return { id: doc.id, ...doc.data() };
}

export async function getSessionDownloadUrl(sessionUrl) {
  var storage = firebase.storage();
  var pathReference = storage.ref(sessionUrl);
  const url = await pathReference.getDownloadURL();

  return url;
}

export async function loginWithEmail(email, password) {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  return firebase.auth().signInWithEmailAndPassword(email, password);
}
