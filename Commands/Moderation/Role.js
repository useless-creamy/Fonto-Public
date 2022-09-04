const { Client, ChatInputCommandInteraction } = require("discord.js");
const EditReply = require("../../Systems/EditReply");

module.exports = {
    name: "role",
    description: "Add or remove role",
    UserPerms: ["ManageRoles"],
    BotPerms: ["ManageRoles"],
    category: "Moderation",
    options: [
        {
            name: "settings",
            description: "settings",
            type: 3,
            required: true,
            choices: [
                {
                    name: "give",
                    value: "give"
                },
                {
                    name: "remove",
                    value: "give"
                },
            ]
        },
        {
            name: "role",
            description: "Select any role",
            type: 8,
            required: true
        },
        {
            name: "user",
            description: "Select any user",
            type: 6,
            required: true
        },
    ],

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        const { options, guild } = interaction;

        const Options = options.getString("settings");
        const Role = options.getRole("role");
        const Target = options.getMember("user");

        if(guild.members.me.roles.highest.position <= Role.position) return EditReply(interaction, "Fonto can't give that role to that user, it's because this role is higher then Fonto!");

        switch(Options) {
            case "give": {

                if(guild.members.me.roles.highest.position <= Target.roles.highest.position) return EditReply(interaction, "This user that your're givivng the role to, is higher then Fonto!");

                if(Target.roles.cache.find(r => r.id === Role.id)) return EditReply(interaction, `${Target} already has that role...`);

                await Target.roles.add(Role)

                 EditReply(interaction, `${Target}, now has been assigned the ${Role.name}`)

                }
                break;

                case "remove": {

                    if(guild.members.me.roles.highest.position <= Target.roles.highest.position) return EditReply(interaction, "This user that your're givivng the role to, is higher then Fonto!");
    
                    if(!Target.roles.cache.find(r => r.id === Role.id)) return EditReply(interaction, `${Target} doesn't have that role. Use \`/add\``);
    
                    await Target.roles.add(Role)
    
                     EditReply(interaction, `${Target}, removed role ${Role.name}`);
           }
           break;
        }
    }
}