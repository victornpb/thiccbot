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

const db = require('./db/db');

// This is your client. Some people call it `bot`, some people call it `self`, 
const client = new Discord.Client();

const defaultConfig = require('./defaultConfig');

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // you should ignore your own bot messages unless u like infinity loops XD
  if (message.author.id === client.user.id) return;
  
  const guildId = message.guild.id;

  try {
    let guildConfig = await db.fetchGuildConfig(guildId);

    if (!guildConfig) {
      console.log('No config found for this guild, creating default config', guildId);
      guildConfig = await db.saveGuildConfig(guildId, defaultConfig);
    }
    await commandEngine(client, guildConfig.config, message);
  }
  catch (err) {
    console.error(err);
    message.author.send('EXCEPTION ```\n' + err + '```');
  }

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

  db.saveGuildConfig(guild.id, {});
});


client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`${client.guilds.size} servers`, {
    type: "WATCHING",
  }).then(console.log)
    .catch(console.error);
});



client.on("error", r => {
  console.error('error event', r);
});

client.on("reconnecting", e => {
  console.error('reconnecting event', e);
});

client.on("disconnect", d => {
  console.warn('disconnect event', d);
  client.login(token);
});


(async () => {

  await db.connect();
  client.login(token);

})();