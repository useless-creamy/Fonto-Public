const { EmbedBuilder } = require("discord.js");

function EditReply(interaction, description, emoji) {

    interaction.editReply({
        embeds: [
            new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`${description} ${emoji}`)
        ],
        ephemeral: true
    })
    
}
module.exports = EditReply