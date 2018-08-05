const {
    interpolate,
    replyError,
    parseTag
} = require('./utils/utils');

const actions = {

    async dm(client, message, vars, object) {
        const to = interpolate(object.to, vars);
        const id = parseTag(to);
        let member = message.guild.members.find(m => m.id === id || m.user.tag === to);
        if (member) {
            const msg = interpolate(object.content, vars);
            member.send(msg).catch(replyError(message));
        } else {
            console.error('member not found', member);
            message.reply("Member not found!").catch(replyError(message));
        }
    },

    async addRole(client, message, vars, object) {
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
                message.reply("Role not found!").catch(replyError(message));
            }
        } else {
            console.error('member not found', member);
            message.reply("Member not found!").catch(replyError(message));
        }
    },

    async removeRole(client, message, vars, object) {
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
                message.reply("Role not found!").catch(replyError(message));
            }
        } else {
            console.error('member not found', member);
            message.reply("Member not found!").catch(replyError(message));
        }
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
            else{
                return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?").catch(replyError(message));
            }


        } else {
            console.error('member not found', member);
            message.reply("Member not found!").catch(replyError(message));
        }
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
                return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?").catch(replyError(message));
            }


        } else {
            console.error('member not found', member);
            message.reply("Member not found!").catch(replyError(message));
        }
    },


};


function actionEngine(client, message, vars, actionList) {

    actionList.forEach((action) => {
        const actionType = action.type;
        const fn = actions
        [actionType];

        if (fn) {
            fn(client, message, vars, action);
        } else {
            console.error('invalid action');
            message.reply("Invalid Action Type" + "\n```json\s" + JSON.stringify(action, null, 2) + "\n```");
        }
    });
}

module.exports = actionEngine;