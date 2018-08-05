// Load up the discord.js library
const Discord = require("discord.js");
const _ = require("lodash");
require('./utils/format');

const token = process.env.token;

const custom = require('./custom');




const {
  interpolate,
  replyError,
  parseTag,
  getVariables,
} = require('./utils/utils');


const actionEngine = require('./actions');

async function commandEngine(message) {

  console.log(message);

  // you should ignore your own bot messages unless u like infinity loops XD
  if (message.author.id === client.user.id) return;

  const commandStr = (String(message.content).match(/^([^\s+]+)/) || [''])[0];

  const cmd = custom.commands[commandStr];
  if (cmd && cmd.enabled) {

    if (cmd.require && !message.member.roles.some(role => cmd.require.includes(role.name))) {
      return message.reply("Sorry, you don't have permissions to use this!");
    }

    const vars = getVariables(message);

    if (message.author.bot && cmd.ignoreBot) return;

    //execute actions
    if (cmd.actions) {
      actionEngine(client, message, vars, cmd.actions);
    }

    //reply
    if (cmd.reply) {
      const msg = String(cmd.reply).format(vars);
      message.channel.send(msg);
    }

    //replayDm
    if (cmd.replyDm) {
      const msg = String(cmd.replyDm).format(vars);
      message.author.send(msg);
    }


    //remove command invokation message
    if (cmd.deleteCall) {
      message.delete().catch(O_o => {});
    }


  }

}


// This is your client. Some people call it `bot`, some people call it `self`, 
const client = new Discord.Client();

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  await commandEngine(message);

});


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.login(token);