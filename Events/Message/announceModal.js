const { Client, ModalSubmitInteraction, EmbedBuilder, InteractionType } = require('discord.js');

module.exports = {

    name: 'interactionCreate',

    /**
     * @param {ModalSubmitInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {

        const { type, customId, channel, guild, user, fields } = interaction;

        if (!guild || user.bot) return;

        if (customId !== 'announce-modal') return;

        await interaction.deferReply({ ephemeral: true })

        const messageInput = fields.getTextInputValue('message-input')

        const announceEmbed = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('New Announcement')
            .setDescription(messageInput)
            .setTimestamp()

        interaction.editReply({ content: `📢 | New Announcement has been posted in ${channel}` })

        channel.send({ content: `@everyone`, embeds: [announceEmbed] }).then(async msg => {

        })

    }
}