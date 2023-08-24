const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT
const URI = process.env.MONGO_URI
const userRouter = require("./routes/userRouter")
const thriftRoute = require("./routes/thriftRoute")

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/", userRouter)
app.use("/thrifts", thriftRoute)

const connect = async()=>{
    try {
        mongoose.connect(URI).then((res)=>{
            console.log("Database connected");
        }).catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        console.log("Mongoose refused to connect");
        if (error.code === 'ENOTFOUND') {
            // Handle the 'getaddrinfo ENOTFOUND' error
            console.log('Error: MongoDB server address not found');
            console.log('Please ensure the MongoDB server is running and accessible');
            // Handle the error in an appropriate way, such as sending an error response or displaying a user-friendly message
          } else {
            // Handle other errors
            console.log('Error:', error.message);
            // Handle the error in an appropriate way
          }
    }
}
connect()

let connection = app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
})

const socketClient = require("socket.io")
const thriftModel = require("./models/thriftModel")
const userModel = require("./models/user.model")
const notModel = require("./models/nootifications.model")
// const sendRequest = require("./models/thriftModel/sendRequest")
const io = socketClient(connection, {
    cors: {origin: "*"}
})
io.on("connection", (socket)=>{
    console.log(socket.id)
    console.log("A user connected successfully");
    socket.on("sendRequest", async(details)=>{
        console.log(details);
        try {
            let thrift = await thriftModel.findById(details.thriftId)
            if (thrift) {
                let thriftLeader = thrift.leader
                let leader = await userModel.findById(thriftLeader)
                if (leader) {
                    const message = {
                        method: "request to join",
                        group: details.thriftId,
                        user: details.userId,
                        date: details.date,
                        time: details.time
                    }
    
                    let user = await userModel.findById(details.userId)
                    let group = await thriftModel.findById(details.thriftId)
                    let notification = await notModel.findOne({userId: leader._id})
                    console.log(notification);
                    if (notification) {
                        // if (!notification.notifications) {
                            let form = await notModel.findOneAndUpdate({userId: leader._id}, {notifications : [message]})
                            let save = await form.save()
                            if (save) {
                                console.log(save);
                                io.emit("requestSent", `Request successfuly sent to the thrift owner`)
                            }
                        // }
                        
                    }
                    // if (!notification) {
                    //     let form = new notModel({
                    //         userId: leader._id,
                    //         notifications: [message]
                    //     })
                    //     let save = await form.save()
                    //     if (save) {
                    //         io.emit("requestSent", `Request successfuly sent to the thrift owner`)
                    //     }
                    // }else{
                    //     notification.notifications = [...notification.notifications, message]
                    //     await notification.save()
                    // }
                    io.emit("notify", message)
                }
            }
        } catch (error) {
            console.log(error);
        }
    })
    socket.on("disconnect", ()=>{
        console.log("Someone disconnected");
    })
})