const { Client, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');


module.exports = {
    name: "announce",
    description: "announce any announcement",
    UserPerms: ["ManageGuild"],
    category: "Moderation",
        /**
         * @param {ChatInputCommandInteraction} interaction
         * @param {Client} client
         */

        async execute (interaction, client) {

            const {  } = interaction;

            const announceModal = new ModalBuilder()
			.setCustomId('announce-modal')
			.setTitle('Announcement');

		const messageInput = new TextInputBuilder()
			.setCustomId('message-input')
			.setLabel("Message")
			.setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Enter the announcement message')
            .setRequired(true);

		const row = new ActionRowBuilder().addComponents(messageInput);

		announceModal.addComponents(row);

		await interaction.showModal(announceModal);
	}};