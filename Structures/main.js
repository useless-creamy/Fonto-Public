const { Client, Partials, Collection } = require("discord.js");
const ms = require("ms");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table")
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;
require("dotenv").config()


const client = new Client({
    intents: 123871,
    partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent ],
    allowedMentions: { parse: ["everyone", "roles", "users"] },
    rest: { timeout: ms("1m")}
});


client.events = new Collection();
client.commands = new Collection();


const Handlers = ["Events", "Commands", "Errors", "EventsStack"]

Handlers.forEach(Handler => {

    require(`./Handlers/${Handler}`)(client, PG, Ascii);
});



module.exports = client;

client.login(process.env.TOKEN)