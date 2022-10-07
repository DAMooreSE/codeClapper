const fs = require("fs")

const { CREDS_PATH } = require("./constants")

module.exports = function getUserCredential() {
  if (!fs.existsSync(CREDS_PATH)) {
    return false
  }

  return JSON.parse(fs.readFileSync(CREDS_PATH, "utf8"))
}
