

    const { SlashCommandBuilder, ChatInputCommandInteraction, CommandInteraction, PermissionFlagsBits } = require('discord.js');
    require("dotenv").config()

    module.exports = {

        data: new SlashCommandBuilder()

        .setName('reboot')

        .setDescription('Reboot the bot (DANGEROUS)'),

        /**

         * @param {ChatInputCommandInteraction} interaction

         */

        async execute(interaction) {

            if(interaction.member.id === devID) {

                interaction.reply({

                    content: 'Restarting . . .', ephemeral: true,

                  }).then(() => {

                    process.on('exit', () => {

                      require('child_process').spawn(process.argv.shift(), process.argv, {

                        cwd: process.cwd(),

                        detached: true,

                        stdio: 'inherit'

                      })

                    })

                    process.exit()

                  })

            } else {

                EditReply(interaction, ("You cannot use the Reboot Command, only developers."))

            }

        }

    }
