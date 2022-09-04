const { Client, EmbedBuilder } = require("discord.js");
const channelID = process.env.LOGS

/**
 * @param {Client} client
 */
    module.exports = async (client) => {

        const Embed = new EmbedBuilder()
        .setColor("Red")
        .setTimestamp()
        .setFooter({text: "Anti-crash system"})
        .setTitle("Error Encountered")

        process.on('unhandledRejection', (reason, p) => {

            console.log(reason, p)

            const Channel = client.channels.cache.get(channelID);
            if(!Channel) return;

            Channel.send({
                embeds: [
                    Embed
                    .setDescription("**Unhandled Rejection/Catch:\n\n** ```"+ reason + "```")
                ]
            })
        });

        process.on('uncaughtException', (err, origin) => {

            console.log(err, origin)

            const Channel = client.channels.cache.get(channelID);
            if(!Channel) return;

            Channel.send({
                embeds: [
                    Embed
                    .setDescription("**Unhandled Exception/Catch (MONITOR):\n\n** ```"+ err + "\n\n" + origin.toString() + "```")
                ]
            })
        });
    }