const firebase = require("firebase/app")
const loginWithCredential = require("../lib/loginWithCredential")
const aperture = require("aperture")
const notifier = require("node-notifier")
const { recordingStates, exportStates } = require("../api/constants")
const updateRecordingState = require("../api/updateRecordingState")
const { createSession, endSession } = require("../api")
const fs = require("fs")
const { exportSession, openExportPath } = require("../lib/export")
const updateExportState = require("../api/updateExportState")
const markAllActiveSessionsAsAborted = require("../api/markAllActiveSessionsAsAborted")
const { OUTPUT_PATH,EXPORT_PATH } = require("../lib/constants");

module.exports = async function startCommand() {
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH)
  }

  if (!fs.existsSync(EXPORT_PATH)) {
    fs.mkdirSync(EXPORT_PATH)
  }


  const uid = await loginWithCredential()
  let recorder

  const screens = await aperture.screens()
  const mics = await aperture.audioDevices()
  console.log({ screens, mics })

  const db = firebase.firestore()
  const userRef = db.collection("users").doc(uid)
  let activeSessionId
  await updateRecordingState(uid, recordingStates.IDLE)
  await markAllActiveSessionsAsAborted(uid)

  await userRef
    .collection("actions")
    .where("status", "==", "pending")
    .limit(1)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(async (snapshot) => {
        const action = snapshot.data()
        console.log("Action found: ", action)
        let response

        try {
          if (action.type === "get-devices") {
            console.log("Publishing devices")
            const screens = await aperture.screens()
            const mics = await aperture.audioDevices()

            response = {
              screens,
              mics,
            }
          }

          if (action.type === "start-recording") {
            recorder = recorder || aperture()

            console.log("going to start recording with ", action.request)

            await recorder.startRecording({
			        fps: 30,
              audioDeviceId: action.request.micId,
              screenId: parseInt(action.request.screenId, 10),
            })

            activeSessionId = await createSession(uid)
            updateRecordingState(uid, recordingStates.ACTIVE)

            response = {
              sessionId: activeSessionId,
            }

            notifier.notify({ title: "Started recording!", message: "Started recording!" })
          }

          if (action.type === "stop-recording") {
            updateRecordingState(uid, recordingStates.IDLE)

            if (recorder) {
              const fp = await recorder.stopRecording()

              console.log("stopped recording ", fp)
              updateRecordingState(uid, recordingStates.IDLE)
              notifier.notify({ title: "pressplaycode", message: "Stopped recording!" })

              const targetLocation = `${OUTPUT_PATH}/${activeSessionId}.mp4`

              console.log("the old location ", fp)

              fs.renameSync(fp, targetLocation)

              const stats = fs.statSync(targetLocation)

              console.log("going to stop ", activeSessionId)
              await endSession(uid, activeSessionId, stats.ctime)
            }
          }

          if (action.type === "start-exporting") {
            const sessionId = action.request.sessionId

            updateExportState(uid, sessionId, exportStates.ACTIVE)

            try {
              const sessionData = (await userRef.collection("sessions").doc(sessionId).get()).data()
              console.log("got a request to export sessionId ", sessionId)
              const exportPath = await exportSession({ ...sessionData, id: sessionId })
              updateExportState(uid, sessionId, exportStates.SUCCESS)
              openExportPath(exportPath)
            } catch (err) {
              console.error("GOT an error while exporting : ", err)
              updateExportState(uid, sessionId, exportStates.ERRORED)
            }
          }

          const update = {
            status: "done",
          }

          if (response) {
            update.response = response
          }

          await snapshot.ref.set(update, { merge: true })

          console.log("Done handling action")
        } catch (err) {
          console.error(err)
          await snapshot.ref.set(
            {
              status: "errored",
            },
            { merge: true }
          )
        }
      })
    })

  console.log("listening to actions")
}
