const {
    Client,
    ChatInputCommandInteraction,
    ApplicationCommandOptionType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    AttachmentBuilder
} = require("discord.js");
const Reply = require("../../Systems/Reply");
const levelDB = require("../../Structures/Schema/Level");
const Canvacord = require("canvacord");

module.exports = {
    name: "rank",
    description: "show level",
    category: "Community",
    options: [
        {
            name: "user",
            description: "Select a user",
            type: 6,
            required: false
        },
 
     ],
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const { options, user, guild } = interaction;

        const Member = options.getMember("user") || user;
        const member = guild.members.cache.get(Member.id);

        const Data = await levelDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { });
        if(!Data) return Reply(interaction, `${member} didn't send any messages and didn't gain any XP!`)

        await interaction.deferReply()

        const Required = Data.Level * Data.Level * 100 + 100

        const rank = new Canvacord.Rank()
        .setAvatar(member.displayAvatarURL({ forceStatic: true }))
        .setBackground("IMAGE", "https://th.bing.com/th/id/OIP.LJPPQ6-m1_NOA-DVxcjQEAHaEK?w=318&h=180&c=7&r=0&o=5&pid=1.7")
        .setCurrentXP(Data.XP)
        .setRequiredXP(Required)
        .setRank(1, "Rank", false)
        .setLevel(Data.Level, "Level")
        .setProgressBar("#ffffff", "COLOR")
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)


        const Card = await rank.build().catch(err => console.log(err));

        const attachement = new AttachmentBuilder(Card, { name: "rank.png"})

        const Embed = new EmbedBuilder()
        .setImage("attachment://rank.png")


        interaction.editReply({ embeds: [Embed], files: [attachement] })
    }
}