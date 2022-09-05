const { Client, GuildMember, EmbedBuilder } = require("discord.js");
const DB = require("../../Structures/Schemas/Welcome");

module.exports = {
   name: "guildMemberAdd"
  
  /**
  * @param {GuildMember} member
  * @param {Client} client

  */
  async execute(member, client) {
  
    const { user, guild } = member
    
    const Data = await DB.findOne({ Guild: guild.id }).catch(err => { })
    if(!Data) return;
    
    const Message = new EmbedBuilder()
    .setAuthor(`Hey! Welcome to **${guild.name}**`, iconURL:  user.displayAvatarURL({ dynamic: true }))
    .setColor("Blurple")
    .setFooter({ text: "Fonto Welcome System"})
    .setTimestamp();
    
    
    if(Data.channel !== null){
      
      const Channel = guild.channels.cache.get(Data.Channel)
      if(!Channel) return EditReply(interaction, ("Hey, i thihk you forgot to mention a channel"))
      
      const Embed = new EmbecBuilder()
      .setColor("Blurple")
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setDescription(`Welcome ${member}!\n\nAccount Created: <t:${user.createdTimestamp}:R>\nMember Count: \`${guild.memberCount}\``)
      .setThumbnail(user.displayAvatarURL())
      .setFooter({ text: "Fonto Welcome System"})
      .setTimestamp();
      
      Channel.send({ embeds: [Embed], embeds: [Message] })
      
     } 
  }
  }
