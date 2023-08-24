const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    username:{type:String, required: true, trim: true},
    email:{type:String, required: true, trim: true},
    password:{type:String, required: true,trim: true},
    ownedGroups:{type: Array}
})
    let saltRound = 10
userSchema. pre("save", function(next){
    bcrypt.hash(this.password, saltRound).then((hashedPassword)=>{
        this.password = hashedPassword
        next()
    }).catch((err)=>{
        console.log(err);
    })
})
userSchema.methods.validatePassword = function(password, callback){
    console.log(password, this);
    bcrypt.compare(password, this.password)
    .then((same)=>{
        callback(same)
    }).catch((err)=>{
        console.log(err);
    })
}

const userModel= mongoose.models.user_collection || mongoose.model("user_collection", userSchema)

module.exports = userModel