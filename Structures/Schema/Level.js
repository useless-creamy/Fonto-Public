const { model, Schema } = require("mongoose");

module.exports = model("Level", new Schema({

    Guild: String,
    User: String,
    XP: Number,
    Level: Number
}));