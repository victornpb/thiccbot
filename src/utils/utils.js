module.exports = {
    replyError(message) {
        return function (err) {
            console.error(err);
            message.reply('\n**ERROR**\n```' + err.name + ' - ' + err.message + '```');
        }
    },

    parseTag(str) {
        return (String(str).match(/^<[#@!]+(\d+)>$/) || [])[1];
    },

    interpolate(str, variables) {
        return String(str).format(variables);
    },

    getVariables(message) {
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
    },
};