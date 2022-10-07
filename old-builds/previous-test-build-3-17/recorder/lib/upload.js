const firebase = require("firebase/app")
const path = require("path")
const fs = require("fs")
const archiver = require("archiver")
const { UPLOAD_PATH } = require("./constants")
const updateSessionExportPath = require("../api/updateSessionExportPath")

function zipDirectory(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 } })
  const stream = fs.createWriteStream(out)

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", (err) => reject(err))
      .pipe(stream)

    stream.on("close", () => resolve())
    archive.finalize()
  })
}

const XMLHttpRequest = require("xhr2")
global.XMLHttpRequest = XMLHttpRequest

async function uploadSession(userId, sessionId, exportPath) {
  const storageRef = firebase.storage().ref()

  if (!fs.existsSync(UPLOAD_PATH)) {
    fs.mkdirSync(UPLOAD_PATH)
  }

  const zipPath = path.join(UPLOAD_PATH, `${sessionId}.zip`)
  await zipDirectory(exportPath, zipPath)

  console.log("Done zipping for upload ", zipPath)

  const sessionUploadRef = storageRef.child(`${userId}/${path.basename(zipPath)}`)

  const zipFile = fs.readFileSync(zipPath)
  await sessionUploadRef.put(zipFile.buffer)

  await updateSessionExportPath(userId, sessionId, sessionUploadRef.fullPath)

  console.log("Done uploading :", zipPath, sessionId)
}

module.exports = { uploadSession }
