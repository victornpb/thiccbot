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
            member.send(msg);
        } else {
            console.error('member not found', member);
            message.reply("Member not found!");
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
                message.reply("Role not found!");
            }
        } else {
            console.error('member not found', member);
            message.reply("Member not found!");
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
                message.reply("Role not found!");
            }
        } else {
            console.error('member not found', member);
            message.reply("Member not found!");
        }
    }
};


function actionEngine(client, message, vars, actionList) {

    actionList.forEach((action) => {
        const actionType = action.type;
        const fn = actions[actionType];

        if (fn) {
            fn(client, message, vars, action);
        } else {
            console.error('invalid action');
            message.reply("Invalid Action Type" + "\n```json\s" + JSON.stringify(action, null, 2) + "\n```");
        }
    });
}

module.exports = actionEngine;