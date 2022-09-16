const {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder
} = require("discord.js");

const axios = require("axios");

module.exports = {
    name: "animals",
    description: "Facts and photos of various animals.",
    options: [
        {
            name: "animal",
            description: "Select the animal you want to see photos and facts about.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: "birds", value: "birb" },
                { name: "cats", value: "cat" },
                { name: "dogs", value: "dog" },
                { name: "foxes", value: "fox" },
                { name: "pandas", value: "panda" },
                { name: "koalas", value: "koala" },
                { name: "kangaroos", value: "kangaroo" },
                { name: "raccoons", value: "raccoon" },
                { name: "red pandas", value: "red_panda" },
            ]
        }
    ],
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
     async execute(interaction) {
        const animal = interaction.options.getString("animal");
        const embed  = new EmbedBuilder().setColor("Red");                       
        const emojis = {
            birb: "🐦", // Intentional spelling mistake. That's what they named the endpoint on the API.
            cat: "🐱",
            dog: "🐶",
            fox: "🦊",
            panda: "🐼",
            koala: "🐨",
            kangaroo: "🦘",
            raccoon: "🦝",
            red_panda: "🐾"
        };

        try {
            const response = await axios.get(`https://some-random-api.ml/animal/${animal}`);

            embed.setTitle(`${emojis[animal]} Facts about ${Object.values(this.options[0].choices).find(obj => obj.value === animal).name}`)
                .setColor("Random")
                .setDescription(response?.data?.fact)
                .setImage(response?.data?.image);

            interaction.reply({embeds: [embed]});
        } catch(err) {
            embed.setTitle("🐶 Unable to retrieve animal")
                .setDescription("Unable to establish a connection to the API. Please try again later.");

            if (err?.response?.data?.error)
                embed.setTitle("🐱 Too many requests")
                    .setDescription(err.response.data.error);

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}
