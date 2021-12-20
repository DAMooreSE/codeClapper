const { exec } = require("child_process")

module.exports = function executeShellCmd(cmd, throwOnError = true) {
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 1000 * 1000 * 5 }, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        if (throwOnError) {
          return reject(error)
        }

        return resolve(error)
      }

      return resolve(stdout || stderr)
    })
  })
}
