const {
    Client,
    ChatInputCommandInteraction,
    ApplicationCommandOptionType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType
} = require("discord.js");
const ms = require("ms");
const EditReply = require("../../Systems/EditReply");


module.exports = {
    name: "kicks",
    description: "Kick's a user.",
    UserPerms: ["KickMembers"],
    BotPerms: ["KickMembers"],
    category: "Moderation",
    options: [
        {
            name: "user",
            description: "Select a user",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "Reason for kick.",
            type: 3,
            required: false
        },
    ],
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

       await interaction.deferReply({ ephemeral: true })

       const { options, user, guild } = interaction;


       const member = options.getMember("user")
       const reason = options.getString("reason") || "No reason provided."

       if(member.id === user.id) return EditReply(interaction, "⛔", "You cannot kick yourself.");
       if(guild.ownerid === member.id) return EditReply(interaction, "⛔", "You cannot kick a higher rank then you.");
       if(guild.members.me.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "⛔", "You cannot kick a staff user that is the same level as you or higher rank then you.");
       if(interaction.member.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "⛔", "You cannot kick a user the same level as Fonto.");

       const Embed = new EmbedBuilder()
       .setColor("Blurple")

       const row = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId("kick-yes")
        .setLabel("Yes"),

        new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("kick-no")
        .setLabel("No")
       )

       const Page = await interaction.editReply({

        embeds: [
            Embed.setDescription(`Do you want to kick this user?`)
        ],
        components: [row]
    })

    const col = await Page.createMessageComponentCollector({
        ComponentType: ComponentType.Button,
        time: ms("15s")
    });

    col.on("collect", i => {

        if(i.user.id !== user.id) return;

        switch(i.customId) {

            case "kick-yes": {

                member.kick({reason})
                interaction.editReply({
                    embeds: [
                        Embed.setDescription(`✅ ${member} has been kicked | **${reason}**`)
                    ],
                    components: []
                });

                member.send({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("Yellow")
                        .setAuthor("Fonto Kick System")
                        .setDescription(`You've been kicked from **${guild.name}**`)
                        .addField("Reason", `${reason}`)
                    ]
                }).catch(err => {

                    if(err.code !== 50007) return console.log(err)
                });
            } ;
                break;

                case "kick-no": {
                    interaction.editReply({
                        embeds: [
                            Embed.setDescription(`Kick has been cancelled.`)
                        ],
                        components: []
                    });
    
                };
                break;
        };
      });
      col.on("end", (collected) => {

        if(collected.size > 0) return
        interaction.editReply({
            embeds: [
                Embed.setDescription(`You didn't provide a response.`)
            ],
            components: []
        });

      })
    },

};