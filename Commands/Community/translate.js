const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
  
  const translate = require("translate-google");
  const ISO6391 = require("iso-639-1");
  
  module.exports = {
    name: "translate",
    description: "translate a message",
    category: "Community",
    options: [
        {
            name: "text",
            description: "Select the text you want to translate.",
            type: "3",
            required: true
        },
        {
            name: "language",
            description: "Select a language you want to translate.",
            type: "3",
            required: true
        }
    ],
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * 
     */
    async execute(interaction) {

        const { options, user, guild } = interaction;


      const text = options.getString("text");
      const language = options.getString("language");
      translate(text, { to: language })
        .then((result) => {
          const languageName = ISO6391.getName(language) || language;
          const Embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Translated to ${languageName} language`)
            .addFields(
              {
                name: `Your text:`,
                value: `${text}`,
              },
              {
                name: `Translated text:`,
                value: `${result}`,
              }
            )
            .setFooter({
              text: `Language list here:\nhttps://cloud.google.com/translate/docs/languages `,
              iconURL:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/2048px-Google_Translate_logo.svg.png",
            });
          interaction.reply({ embeds: [Embed] });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  };
  