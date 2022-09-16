const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");

module.exports = {
    name: "ping",
    description: "return the bot's latency",
    category: "Community", // only allowed for admin users
    execute(interaction) {
        interaction.reply({content: "Pong", ephemeral: true})
    },
};