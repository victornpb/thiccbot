module.exports = {

    prefix: ";",

    commands: {

        "echo": {
            type: 'custom',
            enabled: true,
            reply: "echo\n{1n}",
            // replyDm: "Hello {author} this is a test reply (via dm) from {server} {channel}",
            deleteCall: false,
            ignoreBot: true,

            // require: ['role1'],

            // actions: [{
            //     type: 'dm',
            //     to: 'jake1#1623',
            //     content: "Hi this is a test action (DM) from {server} {channel}, invoked by {author}.",
            // }]
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
            }]
        },

    }
};