var appRoot = require("app-root-path")
const newLocal = "/.creds.json"

module.exports.CREDS_PATH = appRoot + newLocal
module.exports.EXPORT_PATH = appRoot + "/exports"
module.exports.OUTPUT_PATH = appRoot + "/output"
module.exports.UPLOAD_PATH = appRoot + "/zips"
