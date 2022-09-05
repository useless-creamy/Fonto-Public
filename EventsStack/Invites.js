const { Client, EmbedBuilder } = require("discord.js");
const client = require("../Structures/main");
const invites = new Map();
const LogDB = require("../Structures/Schema/LogsChannel");
const wait = require("timers/promises").setTimeout
const { Discord } = require("discord-id");
