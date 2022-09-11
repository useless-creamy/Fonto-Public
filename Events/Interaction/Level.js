const { Client, Message, EmbedBuilder } = require("discord.js");
const levelDB = require("../../Structures/Schema/Level");
const ChannelDB = require("../../Structures/Schema/LevelUpChannel");


module.exports = {
name: "messageCreate",
  
  /**
  * @param {Message}message
  * @param {Client} client
  */
  async execute(message, client) {
  
  const { guild, author } = message
  
  if(!guild || author.bot) return;
    
    levelDB.findOne({ Guild: guild.id, User: author.id}, async (err, data) => {
    
    if(err) throw err
      
      if(!data) {
      
        
        levelDB.create({
        Guild: guild.id,
          User: author.id,
          XP: 0,
          Level: 0
        })
      }
    
    })
  }
}
