const {
    interpolate,
    replyError,
    parseTag,
    getVariables,
} = require('./utils/utils');

const actionEngine = require('./actions');

// const custom = require('./custom');

async function commandEngine(client, custom, message) {

    if(!custom) return console.log('No config for this guild!');

    console.log(message);

    // you should ignore your own bot messages unless u like infinity loops XD
    if (message.author.id === client.user.id) return;

    const commandStr = (String(message.content).match(/^([^\s+]+)/) || [''])[0];

    const cmd = custom.commands[commandStr];
    if (cmd && cmd.enabled) {

        // ignore bots
        if (message.author.bot && cmd.ignoreBot) return;

        // verify required roles
        if (cmd.require && !message.member.roles.some(role => cmd.require.includes(role.name))) {
            return message.reply("Sorry, you don't have permissions to use this command!").catch(replyError(message));
        }

        // get variables
        const vars = getVariables(message);

        //execute actions
        if (cmd.actions) {
            actionEngine(client, message, vars, cmd.actions);
        }

        //reply
        if (cmd.reply) {
            const msg = String(cmd.reply).format(vars);
            message.channel.send(msg).catch(replyError(message));
        }

        //replayDm
        if (cmd.replyDm) {
            const msg = String(cmd.replyDm).format(vars);
            message.author.send(msg).catch(replyError(message));
        }

        //remove command invokation message
        if (cmd.deleteCall) {
            message.delete().catch(O_o => {});
        }
    }
}

module.exports = commandEngine;