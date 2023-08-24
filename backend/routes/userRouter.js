const express = require("express")
const route = express.Router()
const { signUpUser, logInUser, verifyToken, sendCode, setNewPassword} = require("../controllers/userController")

route.post("/signup", signUpUser)
route.post("/login", logInUser)
route.post("/sendcode", sendCode)
route.post("/setpassword", setNewPassword)
route.get("/dashboard", verifyToken)

module.exports = route