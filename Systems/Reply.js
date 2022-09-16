const { EmbedBuilder } = require("discord.js");

function Reply(interaction, description, type) {

    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setColor("Green")
            .setDescription(`${description}`)
        ],
        ephemeral: type
    })
    
}
module.exports = Reply