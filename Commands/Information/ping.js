const {
    Client,
    ChatInputCommandInteraction,
} = require("discord.js");
const Reply = require("../../Systems/Reply");

module.exports = {
    name: "ping",
    description: "Return Bot's latency",
    category: "Information",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        return Reply(interaction, `Current Websocket Latency : \`${client.ws.ping}\``, false);
    }

};