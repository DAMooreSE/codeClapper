const firebase = require("firebase/app")
const path = require("path")
const { exportClip } = require("../lib/export")
const { EXPORT_PATH } = require("../lib/constants")
const executeShellCmd = require("../lib/executeShellCmd")
const fs = require("fs")
const ffmpeg = require("ffmpeg-static")

let previousUnsubscribe
let exportedClips = []

module.exports = function subscribeToClips(uid, sessionId, recordingPath, startTime) {

  const exportPath = path.join(EXPORT_PATH, sessionId)

  if (previousUnsubscribe) {
    previousUnsubscribe()
    exportedClips = []
  }

  previousUnsubscribe = firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("sessions")
    .doc(sessionId)
    .onSnapshot(async function (snapshot) {
      const data = snapshot.data()
      console.log("the session has been updated! ", data)

      const completedClips = Object.values(data.clips || {}).filter((c) => c.completed)

      if (exportedClips.length !== completedClips) {
        const newClips = completedClips.filter((c) => exportedClips.indexOf(c.id) === -1)

        if (newClips.length) {
          console.log("found some new clips to export ", newClips)

          const tempPath = `${exportPath}/temp.mp4`
          const tempPathWithAtom = `${exportPath}/temp-with-atom.mp4`

          if (!fs.existsSync(exportPath)) {
            fs.mkdirSync(exportPath)
          }

          fs.copyFileSync(recordingPath, tempPath)

          console.log("copied video file to temp path :", tempPath)

          await executeShellCmd(
            `${ffmpeg} -i ${tempPath} -vcodec copy -acodec copy -movflags faststart ${tempPathWithAtom}`
          )

          newClips.forEach((c) => exportedClips.push(c.id))

          for (var i = 0; i < newClips.length; i++) {
            const clip = newClips[i]
            exportClip(startTime, tempPathWithAtom, exportPath, exportedClips.length + 1, clip)
          }

          console.log("done triggering exports for new clips in session")
        }
      }
    })
}
