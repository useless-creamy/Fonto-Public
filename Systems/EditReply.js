const { EmbedBuilder } = require("discord.js");

function EditReply(interaction, description, emoji) {

    interaction.editReply({
        embeds: [
            new EmbedBuilder()
            .setColor("Random")
            .setDescription(`${description} ${emoji}`)
        ],
        ephemeral: true
    })
    
}
module.exports = EditReply
