const {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder
} = require("discord.js");

const axios = require("axios");

module.exports = {
    name: "reddit",
    description: "Request random content from Reddit via subreddits.",
    options: [
        { name: "subreddit", description: "Provide a subreddit to request content from.", type: ApplicationCommandOptionType.String }
    ],
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const subreddit = interaction.options.getString("subreddit") || "";
        const embed     = new EmbedBuilder().setColor("Red");
        const reactions = ["😂", "🤨"];
            
        try {
            const response = await axios.get(`https://meme-api.herokuapp.com/gimme/${encodeURIComponent(subreddit)}`);

            if (response.data.nsfw && !interaction.channel.nsfw) {
                embed.setTitle("🔞 NSFW content")
                    .setDescription("No **Age-Restricted** content allowed in this channel. Go to a channel where **NSFW** is *enabled*.");
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
            
            embed.setColor("Random")
                .setDescription(`by [${response.data.author}](https://reddit.com/user/${response.data.author}) in [r/${response.data.subreddit}](https://reddit.com/r/${response.data.subreddit})`)
                .setTitle(response.data.title)
                .setImage(response.data.url)
                .setURL(response.data.postLink)
                .setFooter({ text: `${response.data.ups} upvotes` });

            const reply = await interaction.reply({ embeds: [embed], fetchReply: true });
            reactions.forEach(reaction => reply.react(reaction).catch(() => {}));
        } catch (error) {
            if (error.response?.data?.message) {
                embed.setTitle("🔍 Unable to find content or subreddit")
                    .setDescription(error.response.data.message);
                return interaction.reply({embeds: [embed], ephemeral: true});
            }

            embed.setTitle("🔍 Unable to reach API")
                .setDescription(`A connection to the API could not be established.`);
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}