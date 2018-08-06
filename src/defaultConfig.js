module.exports = {
    // "prefix": ";",
    "commands": {

        ";help": {
            "type": "custom",
            "enabled": true,
            "deleteCall": true,
            "ignoreBot": true,
            "actions": [
                {
                    "type": "message",
                    "channel": "{channel}",
                    "content": "Hello world!",
                    "autoPurge": false
                },
                {
                    "type": "react",
                    "emoji": "🆗"
                }
            ]
        },

        ";invite": {
            "enabled": true,
            "ignoreBot": true,
            "actions": [
                {
                    "type": "createInvite"
                }
            ]
        },
        
        ";say": {
            "type": "custom",
            "enabled": true,
            "deleteCall": true,
            "ignoreBot": true,
            "actions": [
                {
                    "type": "message",
                    "channel": "{channel}",
                    "content": "{1n}",
                    "autoPurge": 5
                }
            ]
        },   
    }
};