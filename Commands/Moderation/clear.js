const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    name: "clear",
    description: "clear amount of messages",
    category: "Moderation",
    UserPerms: ["ManageMessages"],
    options: [
        {
            name: "messages",
            description: "amount of messages you want to delete.",
            type: 10,
            required: true
        },
        {
            name: "target",
            description: "choose a target",
            type: 6,
            required: false
        },
    ],

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser("target");

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Succesfully deleted ${messages.size} messages from ${target}.`);
                interaction.reply({embeds: [res]}); // you can use ephemeral if you desire
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Succesfully deleted ${messages.size} messages from the channel.`);
                interaction.reply({embeds: [res]});
            });
        }
    }
}