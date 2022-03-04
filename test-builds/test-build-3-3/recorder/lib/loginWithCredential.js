const getUserCredential = require("./getUserCredential")
const login = require("./login")

let uid

module.exports = async function loginWithCredential() {
  if (uid) {
    return uid
  }

  const userCredential = getUserCredential()
  if (!userCredential) {
    console.error("You need to log in first!")
    process.exit(1)
  }

  uid = await login(userCredential.email, userCredential.password)

  console.log("Logged in!")

  return uid
}
