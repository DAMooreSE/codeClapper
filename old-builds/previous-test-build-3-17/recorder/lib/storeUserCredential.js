const fs = require("fs")
const { CREDS_PATH } = require("./constants")

module.exports = function (email, password) {
  fs.writeFileSync(CREDS_PATH, JSON.stringify({ email: email, password: password }))
}
