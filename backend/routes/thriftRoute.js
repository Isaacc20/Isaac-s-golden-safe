const express = require("express")
const router = express.Router()
const { getThrift, createthrift, getInviteGroup, validateGroup } = require("../controllers/thriftController")

// const socketClient = require("socket.io")
// const io = socketClient(connection, {
//     cors: {origin: "*"}
// })

router.get("/", getThrift)
// router.get("/socket", socketInvite)
router.post("/createthrift", createthrift)
router.post("/invitegroup", getInviteGroup)
router.post("/validategroup", validateGroup)
// io.on("connection", socketInvite)

module.exports = router