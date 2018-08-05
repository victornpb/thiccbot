// Load up the discord.js library
const Discord = require("discord.js");
const _ = require("lodash");
require('./utils/format');

const token = process.env.token;

const commandEngine = require('./commandEngine');




const {
  interpolate,
  replyError,
  parseTag,
  getVariables,
} = require('./utils/utils');





// This is your client. Some people call it `bot`, some people call it `self`, 
const client = new Discord.Client();

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  await commandEngine(client, message);

});


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`${client.guilds.size} servers`, {
      type: "WATCHING",
    }).then(console.log)
    .catch(console.error);

  // Set the client user's status
  client.user.setStatus('dnd')
    .then(console.log)
    .catch(console.error);
});


client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`${client.guilds.size} servers`, {
      type: "WATCHING",
    }).then(console.log)
    .catch(console.error);
});


client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`${client.guilds.size} servers`, {
      type: "WATCHING",
    }).then(console.log)
    .catch(console.error);
});


client.login(token);