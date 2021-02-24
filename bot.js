// Node modules
require("dotenv").config();
const fs = require("file-system");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");

console.log("Beep boop! 🤖");

// Message handler which decides what to do with the incoming message
const messageHandler = require("./messageHandler");
const otherFeatureHandler = require("./otherFeatureHandler");

// Vars
let commands = {};
let messageFeatures = {};
let otherFeatureList = {};

// Init Discord client class
const client = new Discord.Client();

// Connect to Discord API
client.login(process.env.BOTTOKEN).catch(console.error);
client.on("ready", () => {
    // Callback func on login
    setup();
    // find commands and features
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Ready to beep! 🤖");
    // Set status message
    client.user
        .setPresence({
            activity: {
                type: "WATCHING",
                name: "🤖 BEEP BOOP 🤖",
                details: "🤖 BEEP BOOP 🤖",
            },
            status: "online",
        })
        .catch(console.error);
});

// Do stuff when we get new msg
client.on("message", gotMessage);

// Do stuff when user joins voice channel
client.on("voiceStateUpdate", (voiceState) => {
    // console.log(voiceState);
    console.log(voiceState.constructor.name);
    otherFeatureHandler(voiceState);
    /*
    if (voiceState.id === "234395307759108106") {
        // GROOVY sin user id
        if (voiceState.channelID != null) {
            voiceState.channel.leave();
        }
    }*/
});

// msg is from client.on() function
function gotMessage(msg) {
    messageHandler(msg, commands, messageFeatures);
}

const setup = () => {
    setupCommands();
    setupMessageFeatures();
    setupOtherFeatures();
};

function setupCommands() {
    // Find all command subfiles and add to commands object
    // Filename is the command keyword
    console.log("Parsing commands in ./commands/");
    commands = {}; // discards previous found files
    fs.readdirSync("./commands/").forEach((file) => {
        // for each file, create linked list and require each file
        file = file.substring(0, file.length - 3); // remove .js
        commands[file] = require(`./commands/${file}`);
    });
    console.log("Found these commands: ", Object.keys(commands));
}

function setupMessageFeatures() {
    // Find all feature subfiles and add to features object
    console.log("Parsing features in ./messageFeatures/");
    messageFeatures = {}; // discards previous found files
    fs.readdirSync("./messageFeatures/").forEach((file) => {
        // for each file, create linked list and require each file
        file = file.substring(0, file.length - 3); // remove .js
        messageFeatures[file] = require(`./messageFeatures/${file}`);
    });
    console.log("Found these message features: ", Object.keys(messageFeatures));
}

function setupOtherFeatures() {
    // Find all non-message feature subfiles and add to otherFeatures object
    console.log("Parsing features in ./otherFeatures/");
    otherFeatures = {}; // discards previous found files
    fs.readdirSync("./otherFeatures/").forEach((file) => {
        // for each file, create linked list and require each file
        file = file.substring(0, file.length - 3); // remove .js
        otherFeatures[file] = require(`./otherFeatures/${file}`);
    });
    console.log(
        "Found these non-message features: ",
        Object.keys(otherFeatures)
    );
}

const joinVoice = async function (channel) {
    await channel.join().catch(console.error);
};
exports.setup = setup;
exports.joinVoice = joinVoice;
