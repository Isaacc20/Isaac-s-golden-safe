const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    user: {type: String, required: true, trim: true},
    notifications: {type: Array, required: true, default: []}
})

const notModel = mongoose.model.notifications_collection || mongoose.model("notifications_collection", notificationSchema)

module.exports = notModel