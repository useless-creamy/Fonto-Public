 const { Client, Message, EmbedBuilder} = require("discord.js");
 const LevelDB = require("../../Structures/Schema/Level");
 const ChannelDB = require("../../Structures/Schema/LevelUpChannel");

 module.exports = {
    name: "messageCreate",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */

    async execute(message, client) {


        const { author, guild } = message;

        if(!guild || author.bot) return;

        LevelDB.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {

            if(err) throw err

            if(!data) {

                LevelDB.create({
                    Guild: guild.id,
                    User: author.id,
                    XP: 0,
                    Level: 0
                })
            }
        })

        const ChannelData = await ChannelDB.findOne({ Guild: guild.id }).catch(err => { });


        const give = Math.floor(Math.random() * 29) + 1

        const data = await LevelDB.findOne({ Guild: guild.id, User: author.id }).catch(err => { });
        if(!data) return;

        const requiredXP = data.Level * data.Level * 75 + 45


        if(data.XP + give >= requiredXP) {

            data.XP += give
            data.Level += 1
            await data.save()

            if(ChannelData) {

                const Channel = guild.channels.cache.get(ChannelData.Channel)
                if (!Channel) return;

                Channel.send({
                    content: `${author}`,
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Blurple')
                            .setDescription(`<a:gawrgura:1018764490449371166> | ${message.author}, You've reached level ${data.Level}`)
                    ]
                })
            };

        } else {

            data.XP += give
            await data.save()
        };
    },
};