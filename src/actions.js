const {
    interpolate,
    replyError,
    parseTag
} = require('./utils/utils');

const actions = {

    async conditional(client, message, vars, object){
        const a = interpolate(object.a, vars);
        const b = interpolate(object.b, vars);

        return true;
    },

    async createInvite(client, message, vars, object) {
        const link = await client.generateInvite(['ADMINISTRATOR']);
        await message.reply(link).catch(replyError(message));
        return true;
    },

    async react(client, message, vars, object) {
        const emoji = interpolate(object.emoji, vars);
        await message.react(emoji);
        return true;
    },

    async message(client, message, vars, object) {

        const channelStr = interpolate(object.channel, vars);
        const content = interpolate(object.content, vars);
        const autoPurge = parseInt(interpolate(object.autoPurge, vars), 10);

        const channelId = parseTag(channelStr);
        let channel = message.guild.channels.find(c => c.id === channelId || c.name === channelStr);
        if (channel) {
            const msg = interpolate(object.content, vars);
            await channel.send(msg).catch(replyError(message)).then(m => {
                if (autoPurge) {
                    client.setTimeout(() => {
                        m.delete().catch(O_o => { });
                    }, autoPurge * 1000);
                }
            });
        } else {
            console.error('Channel not found', channel);
            await message.reply("Channel not found!").catch(replyError(message));
            return false;
        }
        return true;
    },

    async dm(client, message, vars, object) {
        const to = interpolate(object.to, vars);
        const id = parseTag(to);
        let member = message.guild.members.find(m => m.id === id || m.user.tag === to);
        if (member) {
            const msg = interpolate(object.content, vars);
            await member.send(msg).catch(replyError(message));
        } else {
            console.error('member not found', member);
            await message.reply("Member not found!").catch(replyError(message));
            return false;
        }
        return true;
    },

    async addRole(client, message, vars, object) {
        const toStr = interpolate(object.to, vars);
        const roleStr = interpolate(object.role, vars);

        const memberId = parseTag(toStr);
        const member = message.guild.members.find(m => m.id === memberId || m.user.tag === toStr);
        const role = message.guild.roles.find(r => r.name === roleStr);

        if (member) {
            if (role) {
                await member.addRole(role).catch(replyError(message));
            } else {
                console.error('role not found');
                await message.reply("Role not found!").catch(replyError(message));
                return false;
            }
        } else {
            console.error('member not found', member);
            await message.reply("Member not found!").catch(replyError(message));
            return false;
        }
        return true;
    },

    async removeRole(client, message, vars, object) {
        const toStr = interpolate(object.to, vars);
        const roleStr = interpolate(object.role, vars);

        const memberId = parseTag(toStr);
        const member = message.guild.members.find(m => m.id === memberId || m.user.tag === toStr);
        const role = message.guild.roles.find(r => r.name === roleStr);

        if (member) {
            if (role) {
                await member.removeRole(role).catch(replyError(message));
            } else {
                console.error('role not found');
                await message.reply("Role not found!").catch(replyError(message));
                return false
            }
        } else {
            console.error('member not found', member);
            await message.reply("Member not found!").catch(replyError(message));
            return false;
        }
        return true;
    },

    async kick(client, message, vars, object) {
        const whoStr = interpolate(object.who, vars);
        const reasonStr = interpolate(object.reason, vars);

        const memberId = parseTag(whoStr);
        const member = message.guild.members.find(m => m.id === memberId || m.user.tag === whoStr);


        if (member) {
            if (member.kickable) {

                if (!reasonStr) message.reply("Please provided a reason!").catch(replyError(message));

                // Now, time for a swift kick in the nuts!
                await member.kick(reasonStr)
                    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`)).catch(replyError(message));

            }
            else {
                await message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?").catch(replyError(message));
                return false;
            }

        } else {
            console.error('member not found', member);
            await message.reply("Member not found!").catch(replyError(message));
            return false;
        }
        return true;
    },

    async ban(client, message, vars, object) {
        const whoStr = interpolate(object.who, vars);
        const reasonStr = interpolate(object.reason, vars);

        const memberId = parseTag(whoStr);
        const member = message.guild.members.find(m => m.id === memberId || m.user.tag === whoStr);

        if (member) {
            if (member.kickable) {

                if (!reasonStr) message.reply("Please provided a reason!");

                // Now, time for a swift kick in the nuts!
                await member.ban(reasonStr)
                    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`)).catch(replyError(message));

            } else {
                await message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?").catch(replyError(message));
                return false;
            }

        } else {
            console.error('member not found', member);
            await message.reply("Member not found!").catch(replyError(message));
            return false;
        }
        return true;
    },


};


async function actionEngine(client, message, vars, actionList) {

    let result;

    for(let action of actionList) {
        const actionType = action.type;
        const fn = actions[actionType];

        if (fn) {
            result = await fn(client, message, vars, action);
            vars.result = result;
        } else {
            console.error('invalid action');
            message.reply("Invalid Action Type" + "\n```json\s" + JSON.stringify(action, null, 2) + "\n```");
        }
    }
}

module.exports = actionEngine;