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
let commandList = {};
let messageFeatureList = {};
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
    messageHandler(msg, commandList, messageFeatureList);
}

const setup = () => {
    //console.log(require.cache);
    //console.log(commandList);
    //console.log(messageFeatureList);
    //console.log(otherFeatureList);
    console.log(
        "\nCurrent amount of commands: " + Object.keys(commandList).length
    );
    if (Object.keys(commandList).length > 0) {
        for (let key of Object.keys(commandList)) {
            let tmpPath = require.resolve(`./commands/${key}`);
            //tmpPath = tmpPath.split("\\");
            //tmpPath = tmpPath.join("\\\\");
            console.log(tmpPath);
            delete require.cache[tmpPath];
        }
    }
    console.log(
        "\nCurrent amount of messageFeatures: " +
            Object.keys(messageFeatureList).length
    );
    if (Object.keys(messageFeatureList).length > 0) {
        for (let key of Object.keys(messageFeatureList)) {
            let tmpPath = require.resolve(`./messageFeatures/${key}`);
            //tmpPath = tmpPath.split("\\");
            //tmpPath = tmpPath.join("\\\\");
            console.log(tmpPath);
            delete require.cache[tmpPath];
        }
    }
    console.log(
        "\nCurrent amount of otherFeatures: " +
            Object.keys(otherFeatureList).length
    );
    if (Object.keys(otherFeatureList).length > 0) {
        for (let key of Object.keys(otherFeatureList)) {
            let tmpPath = require.resolve(`./otherFeatures/${key}`);
            //tmpPath = tmpPath.split("\\");
            //tmpPath = tmpPath.join("\\\\");
            console.log(tmpPath);
            delete require.cache[tmpPath];
        }
    }

    commandList = {}; // discards previous found files
    messageFeatureList = {}; // discards previous found files
    otherFeatureList = {}; // discards previous found files
    setupCommands();
    setupMessageFeatures();
    setupOtherFeatures();
};

function setupCommands() {
    // Find all command subfiles and add to commands object
    // Filename is the command keyword
    console.log("\nParsing commands in ./commands/");
    fs.readdirSync("./commands/").forEach((file) => {
        // for each file, create linked list and require each file
        file = file.substring(0, file.length - 3); // remove .js
        commandList[file] = require(`./commands/${file}`);
    });
    console.log("Found these commands: ", Object.keys(commandList));
}

function setupMessageFeatures() {
    // Find all feature subfiles and add to features object
    console.log("\nParsing features in ./messageFeatures/");
    fs.readdirSync("./messageFeatures/").forEach((file) => {
        // for each file, create linked list and require each file
        file = file.substring(0, file.length - 3); // remove .js
        messageFeatureList[file] = require(`./messageFeatures/${file}`);
    });
    console.log(
        "Found these message features: ",
        Object.keys(messageFeatureList)
    );
}

function setupOtherFeatures() {
    // Find all non-message feature subfiles and add to otherFeatures object
    console.log("\nParsing features in ./otherFeatures/");
    fs.readdirSync("./otherFeatures/").forEach((file) => {
        // for each file, create linked list and require each file
        file = file.substring(0, file.length - 3); // remove .js
        otherFeatureList[file] = require(`./otherFeatures/${file}`);
    });
    console.log(
        "Found these non-message features: ",
        Object.keys(otherFeatureList)
    );
}

const joinVoice = async function (channel) {
    await channel.join().catch(console.error);
};
exports.setup = setup;
exports.joinVoice = joinVoice;
