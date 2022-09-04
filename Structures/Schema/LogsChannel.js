const { model, Schema } = require("mongoose");

module.exports = model("LogsChannel", new Schema({

    Guild: String,
    Channel: String

}));