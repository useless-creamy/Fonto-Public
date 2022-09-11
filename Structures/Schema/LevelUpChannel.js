const { model, Schema } = require("mongoose");

module.exports = model("LevelUpChannel", new Schema({

    Guild: String,

    Channel: String

}));
