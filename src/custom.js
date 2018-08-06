module.exports = {

    prefix: ";",

    commands: {
        ";invite":{
            enabled:true,
            ignoreBot: true,
            actions: [{
                type: 'createInvite',
            }]
        },
        ";r":{
            enabled:true,
            ignoreBot: true,
            actions: [{
                type: 'react',
                emoji: '🆗'
            }]
        },

        ";messagechannel":{
            enabled: true,
            ignoreBot: true,
            actions: [{
                type: 'message',
                channel: '{1}',
                content: '{2n}'
            }]
        },

        ";say": {
            type: 'custom',
            enabled: true,
            deleteCall: false,
            ignoreBot: true,

            actions: [{
                type: 'message',
                channel: '{channel}',
                content: '{1n}',
                autoPurge: 3
            }]
        },

        "foo": {
            type: 'custom',
            enabled: true,
            reply: "Hello {author} this is a test reply from {server} {channel}",
            replyDm: "Hello {author} this is a test reply (via dm) from {server} {channel}",
            deleteCall: false,
            ignoreBot: true,

            require: ['role1'],

            actions: [{
                type: 'dm',
                to: 'jake1#1623',
                content: "Hi this is a test action (DM) from {server} {channel}, invoked by {author}.",
            }]
        },

        ";dm": {
            type: 'custom',
            enabled: true,
            // reply: "Hello {author} this is a test reply from {server} {channel}",
            // replyDm: "Hello {author} this is a test reply (via dm) from {server} {channel}",

            deleteCall: false,
            ignoreBot: true,

            require: ['role1'],

            actions: [{
                type: 'dm',
                to: '{mention}',
                content: "Hi this is a test action (DM) from {server} {channel}, invoked by {author}.\n\nMessage: {2n}",
            },
            {
                type: 'react',
                emoji: '🆗'
            }]
        },

        ";mute": {
            type: 'custom',
            enabled: true,
            // reply: "Hello {author} this is a test reply from {server} {channel}",
            // replyDm: "Hello {author} this is a test reply (via dm) from {server} {channel}",

            deleteCall: false,
            ignoreBot: true,

            require: ['role1'],

            actions: [{
                type: 'addRole',
                to: '{mention}',
                role: 'Muted',
            },
            {
                type: 'react',
                emoji: '🆗'
            }]
        },

        ";unmute": {
            type: 'custom',
            enabled: true,
            // reply: "Hello {author} this is a test reply from {server} {channel}",
            // replyDm: "Hello {author} this is a test reply (via dm) from {server} {channel}",

            deleteCall: false,
            ignoreBot: true,

            require: ['role1'],

            actions: [{
                type: 'removeRole',
                to: '{mention}',
                role: 'Muted',
            },
            {
                type: 'react',
                emoji: '🆗'
            }]
        },

        ";addrole": {
            type: 'custom',
            enabled: true,
            // reply: "Hello {author} this is a test reply from {server} {channel}",
            // replyDm: "Hello {author} this is a test reply (via dm) from {server} {channel}",

            deleteCall: false,
            ignoreBot: true,

            require: ['role1'],

            actions: [{
                type: 'addRole',
                to: '{args.1}',
                role: '{args.2}',
            },
            {
                type: 'react',
                emoji: '🆗'
            }]
        },

        ";removerole": {
            type: 'custom',
            enabled: true,
            // reply: "Hello {author} this is a test reply from {server} {channel}",
            // replyDm: "Hello {author} this is a test reply (via dm) from {server} {channel}",

            deleteCall: false,
            ignoreBot: true,

            require: ['role1'],

            actions: [{
                type: 'removeRole',
                to: '{args.1}',
                role: '{args.2}',
            },
            {
                type: 'react',
                emoji: '🆗'
            }]
        },


        ";kick": {
            type: 'custom',
            enabled: true,
            // reply: "Hello {author} this is a test reply from {server} {channel}",
            // replyDm: "Hello {author} this is a test reply (via dm) from {server} {channel}",

            deleteCall: false,
            ignoreBot: true,

            require: ['role1'],

            actions: [{
                type: 'kick',
                who: '{mention}',
                reason: '{2n}',
            },
            {
                type: 'react',
                emoji: '🆗'
            }]
        },

    }
};