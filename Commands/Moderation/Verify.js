const {
    Client,
    ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder
} = require("discord.js");
const DB = require("../../Structures/Schema/VerificationDB");
const EditReply = require("../../Systems/EditReply");

module.exports = {
    name: "verify",
    description: "Return Bot's latency",
    UserPerms: ["ManageGuild"],
    category: "Information",
    options: [
        {
            name: "role",
            description: "Select your member's role",
            type: 8,
            required: true
        },
        {
            name: "channel",
            description: "Choose your verification channel",
            type: 7,
            required: true
        },
    ],
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

       await interaction.deferReply({ ephemeral: true })

       const { options, guild, channel } = interaction;

       const role = options.getRole("role");
       const Channel = options.getChannel("channel") || channel;

       let Data = await DB.findOne({ Guild: guild.id }).catch(err => { })

       if(!Data) {

        Data = new DB({
            Guild: guild.id,
            Role: role.id
        })

        await Data.save();
       } else {

        Data.Role = role.id
        await Data.save();

       };
       Channel.send({
        embeds: [
        new EmbedBuilder()
        .setColor("Green")
        .setTitle("Verification")
        .setDescription("Click the button below to verify! This server uses Fonto Verification system, which protects your discord server.")
        .setTimestamp()
        ],
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("verify")
                .setLabel("Verify")
                .setStyle(ButtonStyle.Success)
            )
        ]
      })

      return EditReply(interaction, "✅", `sent the verification information to ${Channel}.`)
    },

};