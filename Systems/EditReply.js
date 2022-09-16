const { EmbedBuilder } = require("discord.js");

function Reply(interaction, description, type, emoji) {

    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`${description} ${emoji}`)
        ],
        ephemeral: type
    })
    
}
module.exports = Reply