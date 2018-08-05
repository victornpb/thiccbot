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

        const args = message.content.split(' ');

        return {
            server: message.guild.name,
            channel: message.channel,
            author: message.author,
            mention: message.mentions.members.first(),

            //plain text
            channelType: message.channel.type, //dm,text,group
            channelName: message.channel.name,
            authorName: message.author.username, //Victor
            authorTag: message.author.tag, //Victor#1234

            //arguments
            args: args,

            '0': args[0],
            '1': args[1],
            '2': args[2],
            '3': args[3],
            '4': args[4],
            '5': args[5],
            '6': args[6],
            '7': args[7],
            '8': args[8],
            '9': args[9],

            '0n': args.slice(0).join(' '),
            '1n': args.slice(1).join(' '),
            '2n': args.slice(2).join(' '),
            '3n': args.slice(3).join(' '),
            '4n': args.slice(4).join(' '),
            '5n': args.slice(5).join(' '),
            '6n': args.slice(6).join(' '),
            '7n': args.slice(7).join(' '),
            '8n': args.slice(8).join(' '),
            '9n': args.slice(9).join(' '),


        };
    },
};