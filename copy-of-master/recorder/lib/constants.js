var appRoot = require("app-root-path")
// var appRoot = path.dirname(process.execPath)

module.exports.CREDS_PATH = appRoot + "/.creds.json"
module.exports.EXPORT_PATH = appRoot + "/exports"
module.exports.OUTPUT_PATH = appRoot + "/output"
module.exports.UPLOAD_PATH = appRoot + "/zips"
