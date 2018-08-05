// Load up the discord.js library
const Discord = require("discord.js");
const _ = require("lodash");


// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
// const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

const token = process.env.token;

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

require('./format');
const custom = require('./custom');

function replyError(message){
  return function(err){
    console.error(err);
    message.reply('\n**ERROR**\n```'+err.name+' - '+err.message+'```');
  }
}

function parseTag(str){
  return (String(str).match(/^<[#@!]+(\d+)>$/)||[])[1];
}

function actionEngine(message, actions, vars) {
  const methods = {

    async dm(object) {
      const to = interpolate(object.to, vars);
      const id = parseTag(to);
      let member = message.guild.members.find(m => m.id === id || m.user.tag === to);
      if (member) {
        const msg = interpolate(object.content, vars);
        member.send(msg);
      } else {
        console.error('member not found', member);
        message.reply("Member not found!");
      }
    },

    async addRole(object) {
      const toStr = interpolate(object.to, vars);
      const roleStr = interpolate(object.role, vars);

      const memberId = parseTag(toStr);
      const member = message.guild.members.find(m => m.id === memberId || m.user.tag === toStr);
      const role = message.guild.roles.find(r => r.name === roleStr);

      if (member) {
        if (role) {
          member.addRole(role).catch(replyError(message));
        } else {
          console.error('role not found');
          message.reply("Role not found!");
        }
      } else {
        console.error('member not found', member);
        message.reply("Member not found!");
      }
    },

    async removeRole(object) {
      const toStr = interpolate(object.to, vars);
      const roleStr = interpolate(object.role, vars);

      const memberId = parseTag(toStr);
      const member = message.guild.members.find(m => m.id === memberId || m.user.tag === toStr);
      const role = message.guild.roles.find(r => r.name === roleStr);

      if (member) {
        if (role) {
          member.removeRole(role).catch(replyError(message));
        } else {
          console.error('role not found');
          message.reply("Role not found!");
        }
      } else {
        console.error('member not found', member);
        message.reply("Member not found!");
      }
    }
  }

  actions.forEach((action) => {
    const actionType = action.type;
    if (methods[actionType]) {
      methods[actionType](action);
    } else {
      console.error('invalid action');
      message.reply("Invalid Action Type"+"\n```json\s"+JSON.stringify(action, null, 2)+"\n```");
    }
  });
}


function interpolate(str, variables) {
  return String(str).format(variables);
}

function getVariables(message) {
  return {
    channelType: message.channel.type, //dm,text,group
    channelName: message.channel.name,
    username: message.author.username, //Victor
    tag: message.author.tag, //Victor#1234

    server: message.guild.name,
    channel: message.channel.toString(),
    author: message.author.toString(),

    args: message.content.split(' '),

    mention: message.mentions.members.first()
  };
}



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

    //remove command invokation message
    if (cmd.deleteCall) {
      message.delete().catch(O_o => {});
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

    // //dmMention
    // let member = message.mentions.members.first() || message.guild.members.get(vars.args[0]);
    // if (cmd.dmMention) {
    //   const msg = String(cmd.dmMention).format(vars);
    //   member.send(msg);
    // }

    if (cmd.actions)
      actionEngine(message, cmd.actions, vars);

  }

}

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  await commandEngine(message);

});

client.login(token);






