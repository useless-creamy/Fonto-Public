const {
    EmbedBuilder,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
  } = require("discord.js");
  const moment = require("moment");
  
  const emoji = [
    { name: "Staff", emoji: `PASTE_YOUR_EMOJI_HERE!` },
    { name: "CertifiedModerator", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "Partner", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "Hypesquard", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "HypeSquadOnlineHouse1", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "HypeSquadOnlineHouse2", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "HypeSquadOnlineHouse3", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "BugHunterLevel1", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "BugHunterLevel2", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "EarlyVerifiedDeveloper", emoji: `PASTE_YOUR_EMOJI_HERE` },
    { name: "PremiumEarlySupporter", emoji: `PASTE_YOUR_EMOJI_HERE` },
  ];
  
  // https://discords.com/emoji-list
  
  module.exports = {
    name: "user",
    description: "user-infomration",
    category: "Community",
    options: [
        {
            name: "target",
            description: "Select an user",
            type: "3",
            required: false
        }
    ],
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { options, user, guild } = interaction;

      const target = options.getUser("target") || interaction.user;
      await target.fetch();
  
      const Flags = target.flags.toArray();
      if (Flags) {
        const flags = Flags.filter((b) => !!emoji[b]);
  
        emoji.forEach((e) => {
          if (Flags.includes(e.name)) flags.push(e.emoji);
        });
  
        const getData2 = new EmbedBuilder()
          .setColor("Blurple")
          .setTitle(`${target.tag}'s Data`)
          .addFields({
            name: "USER DATA:",
            value: `
              > **USERNAME**: ${target.tag}
              > **DISCRIMINATOR**: #${target.discriminator}
              > **ID**: ${target.id}
              > **FLAGS**: ${flags.join(" ") ? flags.join(" ") : "None"}
              > **BOT ACCOUNT**: ${target.bot ? "True" : "False"}
              > **ACCOUNT CREATED**: ${moment(target.createdAt).format(
                "MMM Do YYYY"
              )}
              `,
          })
          .setFooter({
            text: `Requested By: ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          });
        interaction.reply({ embeds: [getData2], ephemeral: true });
      }
    },
  };
  