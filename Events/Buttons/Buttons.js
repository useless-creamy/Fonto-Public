const { Client, MessageComponentInteraction, EmbedBuilder, InteractionType } = require("discord.js");
const DB = require("../../Structures/Schema/VerificationDB");
const EditReply = require("../../Systems/EditReply");

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {MessageComponentInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const { guild, customId, member, type } = interaction;

        if(type !== InteractionType.MessageComponent) return;

        const CustomId = ("verify")
        if(!CustomId.includes(customId)) return;

        await interaction.deferReply({ ephemeral: true });

        const Data = await DB.findOne({ Guild: guild.id }).catch(err => { })
        if(!Data) return EditReply(interaction, "This is strange, i can't find teh correct data.")

        const Role = guild.roles.cache.get(Data.Role);

        if(member.roles.cache.has(Role.id)) return EditReply(interaction, "Sorry Mate, you've been already verified.");

        await member.roles.add(Role)

        EditReply(interaction, "✅", "You've been verified! From Fonto verification system. This server is protected by the Fonto verification system.")
    }
}