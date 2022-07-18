import { observable, action, computed } from "mobx";
import _ from "lodash";
import { formatSession, sortSessionsInDescOrder } from "../utils";
import { recordingStates } from "./constants";

export class AppStore {
  @observable initializedData = false;
  @observable initializedProfile = false;
  @observable rawSessions;
  @observable selectedSessionId;
  @observable selectedClipId;
  @observable selectedAudioClipId;
  @observable spinner;
  @observable apiHasError;
  @observable fabOpen;
  @observable loadingSessions;
  @observable isAuthenticating = false;
  @observable authenticationError;
  @observable profile;
  @observable checkingAuth = true;
  @observable isFetchingDevices = true;
  @observable fetchingDevicesError = false;
  @observable devices;
  @observable recordingState = recordingStates.IDLE;

  @computed get sessions() {
    if (!this.rawSessions) {
      return [];
    }

    return this.rawSessions.map(formatSession);
  }

  @computed get completedSessions() {
    return sortSessionsInDescOrder(
      this.sessions.filter((s) => s.endDate && !s.aborted)
    );
  }

  @computed get abortedSessions() {
    return sortSessionsInDescOrder(this.sessions.filter((s) => s.aborted));
  }

  @computed get activeSession() {
    return _.find(this.sessions, (s) => !s.endDate);
  }

  @computed get selectedSession() {
    const session = _.find(
      this.sessions,
      (s) => s.id === this.selectedSessionId
    );
    return session;
  }

  @computed get selectedClip() {
    if (!this.selectedSession || !this.selectedSession.clips) {
      // console.log(
      //   "buksie: selectedClip(): going to return because no selectedSession with clips"
      // );
      return undefined;
    }

    // console.log("buksie: going to return the selected clip!");

    return this.selectedSession.clips[this.selectedClipId];
  }

  @computed get selectedAudioClip() {
    if (!this.selectedSession) {
      return undefined;
    }

    if (!this.selectedClip) {
      return undefined;
    }

    if (!this.selectedClip.audioClips) {
      return undefined;
    }

    return this.selectedClip.audioClips[this.selectedAudioClipId];
  }

  @action
  setCheckingAuth(value) {
    this.checkingAuth = value;
  }

  @action
  setAuthenticating(value) {
    this.isAuthenticating = value;
  }

  @action
  setAuthenticationError(value) {
    this.authenticationError = value;
  }

  @action
  setProfile(profile) {
    this.profile = profile;
  }

  @action
  setSpinner(spinning) {
    console.log("Log: setting spinner to ", spinning);
    this.spinner = spinning;
  }

  @action
  setFabOpenState(open) {
    this.fabOpen = open;
  }

  @action
  setSessions(sessions) {
    this.rawSessions = sessions;

    this.loadingSessions = false;
    this.initializedData = true;
  }

  @action
  setFetchingDevices() {
    this.fetchingDevicesError = false;
    this.isFetchingDevices = true;
  }

  @action
  setDevices(devices) {
    this.devices = devices;
    this.isFetchingDevices = false;
  }

  @action
  setDevicesError() {
    this.isFetchingDevices = false;
    this.fetchingDevicesError = true;
  }

  @action
  setRecordingState(value) {
    this.recordingState = value;
  }

  @action
  endSession() {
    if (!this.selectedSession) {
      return;
    }

    this.selectedSession.endDate = Date.now();
    this.selectedSession.completed = true;
  }

  @action
  selectSession(sessionId) {
    console.log("buksie: setting the selected session ", sessionId);
    this.selectedSessionId = sessionId;
  }

  @action
  setApiError(apiHasError) {
    this.apiHasError = apiHasError;
  }

  @action
  selectClip(sessionId, clipId) {
    this.selectSession(sessionId);
    this.selectedClipId = clipId;
  }

  @action
  selectAudioClip(sessionId, clipId, audioClipId) {
    console.log("buksie: selectAudioClip... ");
    this.selectClip(sessionId, clipId);
    this.selectedAudioClipId = audioClipId;
  }

  @action
  updateSession(session) {
    if (this.activeSession && this.activeSession.id === session.id) {
      console.log("buksie: active session being updated! ", session);
    } else {
      // console.log("buksie: non active session being updated ", session.id);
    }

    const storedSession = _.find(this.rawSessions, (s) => s.id === session.id);
    // const indexOfStoredSession = (storedSession)

    if (storedSession) {
      const index = _.indexOf(this.rawSessions, storedSession);
      this.rawSessions[index] = session;
    } else {
      this.rawSessions.push(session);
    }
  }
}

const instance = new AppStore();

export default instance;
