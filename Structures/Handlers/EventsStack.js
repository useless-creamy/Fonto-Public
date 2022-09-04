const { Client,  } = require("discord.js");
const { execute } = require("../../Events/Client/Ready");

/**
 * @param {Client} client
 */
module.exports = async(client, PG, Ascii) => {

    const EventFiles = await PG(`${process.cwd()}/EventsStack/*.js`);
    EventFiles.map(value => require(value))
}