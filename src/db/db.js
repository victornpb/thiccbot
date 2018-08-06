
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guild: String,
    config: Object,
    created: { 
        type: Date,
        default: Date.now
    }
});

var Guild = mongoose.model('Guild', guildSchema);

async function connect(){
    return await mongoose.connect('mongodb://localhost/discordbot');
}

async function fetchGuildConfig(guild) {
    const config = await Guild.findOne({
        guild
    });

    console.log('fetchGuildConfig', guild, config);
    return config;
}

async function saveGuildConfig(guild, config) {
    var query = {
        guild
    },
    update = {
        guild: guild,
        config: config,
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    const g = await Guild.findOneAndUpdate(query, update, options);

    console.log('saveGuildConfig', g);
    return g;
}


module.exports = {
    connect,
    saveGuildConfig,
    fetchGuildConfig,
};
