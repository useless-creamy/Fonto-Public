const { Client } = require("discord.js");
const ms = require("ms");
const mongoose = require("mongoose");
const mongoDBURL = process.env.MONGODBURL

module.exports = {
    name: "ready",
    /**
     * 
     * @param {Client} client 
     */
    async execute (client) {
        
        const { user, ws } = client;

        console.log(`${user.tag} is now online.`)

        setInterval(() => {

            const ping = ws.ping

            user.setActivity({
                name: `Ping: ${ping} ms`,
                type: 3
            })
        }, ms("5s"))

        if(!mongoDBURL) return

        mongoose.connect(mongoDBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("✅ The client is now connected to the database.")
        }).catch(err => console.log(err))
    }
}