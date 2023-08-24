const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const notModel = require("../models/nootifications.model")
const nodemailer = require("nodemailer")
// const getLandingPage = (req, res)=>{
    // let api = userModel.find({})
    // console.log(api)
//     res.send("Landing Page")
// }
const signUpUser = async(req, res)=>{
    const { username, email, password } = req.body
    try {
        if (username === "" || email === "" || password === "") {
            res.send({message: "Username, email and password must not be empty", status: false})
        } else {
            const checkExistingUser = await userModel.findOne({
                $or:[
                    { username },
                    { email }
                ]
            })
            console.log(checkExistingUser);
            if (!checkExistingUser) {
                console.log(req.body);
                let { username, email, password } = req.body
                let newUser = {
                    username,
                    email,
                    password,
                    ownedGroups: []
                }
                
                let form = new userModel(newUser)
                try {
                    let savedUser = await form.save()
                    if (savedUser) {
                        console.log(savedUser);
                        let notification = {
                            user: savedUser._id,
                            notifications: []
                        }
                        let save = new notModel(notification)
                        await save.save()
                        // console.log(notify);
                        let token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "2h"})
                        console.log(token);
                        res
                        .status(201)
                        .send({message: "Sign up successful", status: true, token})
                    }
                } catch (error) {
                    console.log(error.message);
                    if (error.message.includes("duplicate key error")) {
                        res.send({message:"Email or username already in use", status: false})
                    } else{
                        res.send({message:"Internal server error", status: false})
                    }
                    
                }
                
            } else {
                res.send({message:"Email or username already in use", status: false})
            }
            
        }
    } catch (error) {
        console.log(error);
        
        res.send({message:"Internal server error", status: false})
    }
}

const logInUser = async(req, res)=>{
    console.log(req.body);

    let { username, password } = req.body
    if (username === "" || password === "") {
        res.send({message: "Inputs should not be empty", status: false})
    }
    try {
        if (req.body.username.includes("@")) {
            const checkExistingUser = await userModel.findOne({
                $or:[
                    {
                        email: req.body.username
                    }
                ]
            })
            if (!checkExistingUser) {
                res.send({message: "User not found", status: false})
            } else{
                console.log(checkExistingUser);
                await checkExistingUser.validatePassword(password,(same)=>{
                    if (!same) {
                        console.log(same);
                        res.send({message: "Wrong password", status: false})
                    } else {
                        let token = jwt.sign({email: checkExistingUser.email}, process.env.JWT_SECRET, {expiresIn: "2h"})
                        console.log(token);
                        res.send({message: `Welcome ${checkExistingUser.username}`, status: true, token})
                    }
                })
                
            }
        } else {
            const checkExistingUser = await userModel.findOne({
                $or:[
                    {
                        username
                    }
                ]
            })
            if (!checkExistingUser) {
                res.send({message: "User not found", status: false})
            } else{
                await checkExistingUser.validatePassword(password,(same)=>{
                    if (!same) {
                        console.log(same);
                        res.send({message: "Wrong password", status: false})
                    } else {
                        let token = jwt.sign({email: checkExistingUser.email}, process.env.JWT_SECRET, {expiresIn: "2h"})
                        console.log(token);
                        res.send({message: `Welcome ${checkExistingUser.username}`, status: true, token})
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.send({message: "Something went wrong, please try again", status: false})
    }
}

const sendCode = async (req, res) => {
    console.log(req.body);
    const checkExistingUser = await userModel.findOne({email : req.body.email})
    if (!checkExistingUser) {
        res.send({message: "User not found", status: false})
    } else {
        console.log(checkExistingUser);
        let code = Math.floor(100000 + Math.random() * 900000)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        let mailOptions = {
            from: process.env.GMAIL,
            to: checkExistingUser.email,
            subject: `Account recovery for ${checkExistingUser.username}`,
            html: `<div>
                <p>Hello ${checkExistingUser.username},</p>
                <p>A user requested for an account recovery code at <a href='http://localhost:3002'><strong style='color: rebeccapurple;'>Isaac's Golden safe</strong></a></p>
                <p>Your code is <strong style='color: rebeccapurple;'>${code}</strong></p> <br>
                <p>If this is not you, kindly ignore</p>
            </div>`
        }
        let transport = await transporter.sendMail(mailOptions)
            if (transport) {
                res.send({message:"Email successfully sent", user: code, status: true})
            } else {
                res.send({message: "Code not sent, pls retry", status: false})
            }
        
    }
}

const setNewPassword = async(req, res)=>{
    console.log(req.body);
    try {
        let user = await userModel.findOneAndUpdate({email: req.body.email},{password: req.body.newPassword} )
        let form = await user.save()
        console.log(form);
        // if (user) {
            // let { username, email, password ,ownedGroups} = user
            // let newUser = {
            //     username, 
            //     email,
            //     password: req.body.newPassword,
            //     ownedGroups
            // }
            // let form = await newUser.save()
            if (!form) {
                res.send({message: "Something went wrong on our side, please try again", status: true})
            } else {
                let token = jwt.sign({email: form.email}, process.env.JWT_SECRET, {expiresIn: "2h"})
                console.log(token);
                res.send({message: `Welcome ${form.username}`, status: true, token})
            }
        // } else {
            
        // }
    } catch (error) {
        console.log(error);
    }
}

const verifyToken = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    try {
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) {
        res.send({ message: "Session timed out", status: false });
      } else {
        console.log(decodedToken);
        try {
          const checkExistingUser = await userModel.findOne({
            $or: [{ email: decodedToken.email }],
          });
          if (checkExistingUser) {
            console.log(checkExistingUser);
            res.send({ user: checkExistingUser, status: true });
          }
        } catch (err) {
          console.log(err);
          res.send({ message: "Session timed out", status: false });
        }
      }
    } catch (error) {
      console.log(error);
    //   if (error.message === "jwt expired") {
    //     res.send({ message: "Session timed out", status: false });
    //   }
        if (error.name === "JsonWebTokenError" && error.message === "jwt malformed") {
            res.send({ message: "Invalid token", status: false });
        } else if (error.name === "TokenExpiredError") {
            res.send({ message: "Session timed out", status: false });
        } else {
            console.log(error);
            res.send({ message: "Something went wrong, pls try again", status: false });
        }
    }
  };
  

// const verifyToken = async(req, res)=>{
//     let token = req.headers.authorization.split(" ")[1];
//     try {
//         let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
//         if (!verifyToken) {
//             res.send({message: "Session timed out", status: false})
//         } else{
//             console.log(verifyToken);
//                 const checkExistingUser = userModel.findOne({
//                     $or:[
//                         {email: verifyToken.email}
//                     ]
//                 }).catch((err)=>{
//                     console.log(err);
//                     res.send({message: err.message, status:false})
//                 })
//                 if (checkExistingUser) {
//                     console.log(checkExistingUser);
//                     res.send({checkExistingUser, status: true})
//                 }
//         }
//         // .then((result)=>{
//         //     console.log(result);
//         //     const checkExistingUser = userModel.findOne({
//         //         $or:[
//         //             {email: result.email}
//         //         ]
//         //     }).catch((err)=>{
//         //         console.log(err);
//         //         res.send({message: err.message, status:false})
//         //     })
//         //     if (checkExistingUser) {
//         //         console.log(checkExistingUser);
//         //         res.send({checkExistingUser, status: true})
//         //     }
//         // })
            
//     } catch (error) {
//         console.log(error);
//         if (error.message == "jwt expired") {
//             res.send({message: "Session timed out", status: false})
//         }
        
//     }
// }

module.exports = { signUpUser, logInUser, verifyToken, sendCode, setNewPassword }