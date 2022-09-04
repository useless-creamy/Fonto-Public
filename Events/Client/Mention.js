const { Client, Message, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, GuildAuditLogsEntry } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */

    async execute(message, client) {

        /**
         * @param {Message} message
         * @param {Client} client
         */
        const { author, guild, content } = message;
        const { user } = client;

        if(!guild || author.bot) return
        if(content.includes("@here") || content.includes("@everyone")) return;
        if(!content.includes(user.id)) return;


        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("Blurple")
                .setAuthor({ name: user.username, iconURL:user.displayAvatarURL() })
                .setDescription(`Hi! According to my calculations you called me right? Anyways, type \`/\` to view my commands! Don't see my commands? Press on my logo when you type \`/\`!`)
                .setFooter({text: "You mentioned me!"})
                .setTimestamp()
            ],

            components: [
                new ActionRowBuilder().addComponents(

                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=775592015248359447&permissions=8&scope=bot%20applications.commands")
                    .setLabel("Invite me")
                )
            ]
        }).catch(err => console.log(err))
    },
};