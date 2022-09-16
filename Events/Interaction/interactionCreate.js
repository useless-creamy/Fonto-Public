const { Client, ChatInputCommandInteraction, InteractionType } = require("discord.js");
const { ApplicationCommand } = InteractionType;

const Reply = require("../../Systems/Reply");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute (interaction, client) { 

        

        const { user, guild, commandName, member, type } = interaction;

        if(!guild || user.bot) return;
        if (type !== ApplicationCommand) return;

        const command = client.commands.get(commandName);


        if(!command) return Reply(interaction, "An error occured while executing this command.", true) && client.command.delete(commandName);
        if(command.UserPerms && command.UserPerms.length !== 0) if (!member.permissions.has(command.UserPerms)) return EditReply(interaction, `You need \`${command.UserPerms.join(", ")}\` permissions(s) to execute this command.`, true);
        if(command.BotPerms && command.BotPerms.length !== 0) if (!member.permissions.has(command.BotPerms)) return EditReply(interaction, `Fonto needs \`${command.BotPerms.join(", ")}\` permission(s) to exeucte this command.`);

        command.execute(interaction, client);

      
    },
};