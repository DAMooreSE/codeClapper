module.exports.recordingStates = {
  // when the recorder starts up, it always needs to set the state to IDLE
  IDLE: "IDLE",

  // when we start a recording successfully using the devices that we got from the clapper, we set the state to active
  ACTIVE: "ACTIVE",

  // if anything goes wrong, we need to tell the clapper that the recording failed
  ERRORED: "ERRORED",

  // when we start exporting, we update to this status
  EXPORTING: "EXPORTING",
}

module.exports.exportStates = {
  IDLE: "IDLE",
  SUCCESS: "SUCCESS",
  ACTIVE: "ACTIVE",
  ERRORED: "ERRORED",
  UPLOADING: "UPLOADING",
}
