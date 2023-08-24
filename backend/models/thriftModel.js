const mongoose = require("mongoose");
const { Socket } = require("socket.io");
const userModel = require("./user.model");
const notModel = require("./nootifications.model");

const thriftSchema = mongoose.Schema({
    leader: mongoose.Schema.Types.ObjectId,
    thriftName:{type:String, trim: true, required: true},
    headCount: {type: Number, required: true},
    members: [
        mongoose.Schema.Types.ObjectId
    ],
    frequency: {type: String, required: true},
    duration: {type: String, required: true, trim: true},
    amount: {type: Number, required: true},
    interest: {type: Number, required: true},
    thriftPool: {type: Number, required: true}
})

const thriftModel = mongoose.model.thrift_collection || mongoose.model("thrift_collection", thriftSchema)

// thriftSchema.methods.sendRequest = async(details)=>{
//     console.log(details);
//     try {
//         let thrift = await thriftModel.findById(details.thriftId)
//         if (thrift) {
//             let thriftLeader = thrift.leader
//             let leader = await userModel.findById(thriftLeader)
//             if (leader) {
//                 const message = {
//                     method: "request to join",
//                     group: details.thriftId,
//                     user: details.userId,
//                     date: details.date,
//                     time: details.time
//                 }

//                 let user = await userModel.findById({_id: details.userId})
//                 let group = await thriftModel.findById({_id: details.thriftId})
//                 let notification = notModel.find({userId: leader._id})
//                 if (!notification) {
//                     notification = new notModel({
//                         userId: leader._id,
//                         notifications: [message]
//                     })
//                     await notification.save()
//                 }else{
//                     notification.notifications = [...notification.notifications, message]
//                     await notification.save()
//                 }
//                 io.emit("notify", message)
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports = thriftModel