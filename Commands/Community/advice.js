const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const axios = require('axios').default;
module.exports = {
    name: "advice",
    description: "life advice, yes.",
    category: "Community",
              /**
         * @param {ChatInputCommandInteraction} interaction
         */
        execute(interaction) {
            axios.get("https://api.adviceslip.com/advice").then((response) => {
                interaction.reply({ content: response.data.slip.advice });
            }).catch(() => {
                    interaction.reply({ content: "An error occurred" });
            });
        }
}