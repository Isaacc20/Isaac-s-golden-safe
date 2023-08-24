const express = require("express");
const thriftModel = require("../models/thriftModel");
const userModel = require("../models/user.model");
const socketClient = require("socket.io")
// const thriftModel = require("./models/thriftModel")
// const userModel = require("./models/user.model")
const notModel = require("../models/nootifications.model")

const getThrift = async(req, res)=>{
    let userId = await req.headers.authorization.split(" ")[1];
    // console.log(userId);
    try {
        const ownedGroups = await thriftModel.find({ leader: userId });
        const userGroups = await thriftModel.find({ members: userId });

    if (userGroups) {
    //   console.log(userGroups, ownedGroups);
      res.send({ userGroups, ownedGroups, status: true });
    } else {
      res.send({ message: "No groups found for the user", status: false });
    }
        
    } catch (error) {
        console.log(error);
        res.send({message: "Something went wrong", status: false})
    }
}

const createthrift = async(req, res)=>{
    // console.log(req.body);
    let { leader, thriftName, headCount, members, frequency, duration, amount, interest, thriftPool } = req.body
    let newBody = {
        leader,
        thriftName,
        headCount,
        members,
        frequency: frequency === "1 day(s)"? "daily": frequency === "1 week(s)"? "weekly": frequency === "1 month(s)"? "monthly": `${frequency.split("(")[0]}s`,
        duration: duration === "1 day(s)"? "day": duration === "1 week(s)"? "week": duration === "1 month(s)"? "month": `${duration.split("(")[0]}s`,
        amount,
        interest,
        thriftPool
    }
    let form = new thriftModel(newBody)
    try {
        let save = await form.save()
        if (save) {
            console.log(save);
            let user = await userModel.findById(save.leader)
            if (user) {
                console.log(user._id);
                user.ownedGroups ? user.ownedGroups = [...user.ownedGroups, save._id]: user.ownedGroups = [save._id]
                let newUser = await user.save()
                console.log(newUser);
            }
            // userModel.ownedGroups = [...userModel.ownedGroups, save._id]
            res.send({message: "Thrift saved successfully", id: save._id, status: true})
        } else {
            res.send({message: "Something went wrong, please try again", status: false})
        }
    } catch (error) {
        console.log(error);
        res.send({message: "Something went wrong, please try again", status: false})
    }
}

const getInviteGroup = async(req, res)=>{
    // console.log(req.body);
    try {
        let thrift = await thriftModel.findOne({ _id: req.body.id })
        console.log(thrift);
        if (thrift) {
            res.send({thrift, status: true})
        }else {
            res.status(404).send({message: "Group not found", status: false})
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({message: error.message, status: false})
    }
}

const validateGroup = async(req, res)=>{
    // console.log(req.body);
    try {
        let thrift = await thriftModel.findOne({_id: req.body.thriftId})
        if (!thrift) {
            res.send({message: "Request not sent, This group doesn't exist", status: false})
        } else {
            let member = thrift.members.find(el=>el === req.body.userId)
            if (thrift.members.length === thrift.headCount) {
                res.send({message: "Request not sent, This group is filled", status: false})
            } else if (member) {
                res.send({message: "You are already a member of this group", status: false})
            } else{
                res.send({message: "Group is valid", status: true})
            }
        }
    } catch (error) {
        console.log(error);
    }
}


// const socketInvite = (socket)=>{
//         console.log(socket.id)
//         console.log("A user connected successfully");
//         socket.on("sendRequest", async(details)=>{
//             console.log(details);
//             try {
//                 let thrift = await thriftModel.findById(details.thriftId)
//                 if (thrift) {
//                     let thriftLeader = thrift.leader
//                     let leader = await userModel.findById(thriftLeader)
//                     if (leader) {
//                         const message = {
//                             method: "request to join",
//                             group: details.thriftId,
//                             user: details.userId,
//                             date: details.date,
//                             time: details.time
//                         }
        
//                         let user = await userModel.findById(details.userId)
//                         let group = await thriftModel.findById(details.thriftId)
//                         let notification = await notModel.findOne({userId: leader._id})
//                         console.log(notification);
//                         if (notification) {
//                             // if (!notification.notifications) {
//                                 let form = await notModel.findOneAndUpdate({userId: leader._id}, {notifications : [message]})
//                                 let save = await form.save()
//                                 if (save) {
//                                     console.log(save);
//                                     io.emit("requestSent", `Request successfuly sent to the thrift owner`)
//                                 }
//                             // }
                            
//                         }
//                         // if (!notification) {
//                         //     let form = new notModel({
//                         //         userId: leader._id,
//                         //         notifications: [message]
//                         //     })
//                         //     let save = await form.save()
//                         //     if (save) {
//                         //         io.emit("requestSent", `Request successfuly sent to the thrift owner`)
//                         //     }
//                         // }else{
//                         //     notification.notifications = [...notification.notifications, message]
//                         //     await notification.save()
//                         // }
//                         io.emit("notify", message)
//                     }
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         })
//         socket.on("disconnect", ()=>{
//             console.log("Someone disconnected");
//         })
//     }


module.exports = { getThrift, createthrift, getInviteGroup, validateGroup }