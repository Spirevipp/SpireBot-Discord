// Setup
// Node modules
require("dotenv").config();
const fs = require("file-system");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");

// Message handler which decides what to do with the incoming message
const messageHandler = require("./messageHandler");
const otherFeatureHandler = require("./otherFeatureHandler");

/**
 * @description Object to contain require reference to loaded command modules
 * Initialized by setupCommands
 * @type {Object}
 */
let commandList = {};
/**
 * Object to contain require reference to loaded message feature modules
 * Initialized by setupMessageFeatures
 * @type {Object}
 */
let messageFeatureList = {};
/**
 * Object to contain require reference to loaded other feature modules
 * Initialized by setupOtherFeatures
 * @type {Object}
 */
let otherFeatureList = {};

// Actual running code
console.log("Beep boop! 🤖");
// Init Discord client class
const client = new Discord.Client();
// Connect to Discord API
client.login(process.env.BOTTOKEN).catch(console.error);

// Events
// Setup when connected to discord servers
client.on("ready", () => {
    // Callback func on login
    setup(true);
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
client.on("message", (msg) => {
    messageHandler(msg, commandList, messageFeatureList);
});
// Do stuff when user joins voice channel
client.on("voiceStateUpdate", (voiceState) => {
    // console.log(voiceState);
    console.log(voiceState.constructor.name);
    otherFeatureHandler(voiceState);
});

// Other functions
/**
 * - Uninitialized setup function for module export
 * - If skipReset == true then it skips resetFiles function
 * @param {boolean} [skipReset] - Skips reset if true, Optional
 */
const setup = (skipReset) => {
    if (skipReset) {
        findFiles();
    } else {
        resetFiles();
        findFiles();
    }
};
/**
 *  - Finds all sub-modules
 *
 */
function findFiles() {
    setupCommands();
    setupMessageFeatures();
    setupOtherFeatures();
}

/**
 * - Removes all sub-modules from require cache
 * - Re-initiates sub-module lists
 */
function resetFiles() {
    console.log(
        "\nCurrent amount of commands: " + Object.keys(commandList).length
    );
    console.log(
        "\nCurrent amount of messageFeatures: " +
            Object.keys(messageFeatureList).length
    );
    console.log(
        "\nCurrent amount of otherFeatures: " +
            Object.keys(otherFeatureList).length
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
    if (Object.keys(messageFeatureList).length > 0) {
        for (let key of Object.keys(messageFeatureList)) {
            let tmpPath = require.resolve(`./messageFeatures/${key}`);
            //tmpPath = tmpPath.split("\\");
            //tmpPath = tmpPath.join("\\\\");
            console.log(tmpPath);
            delete require.cache[tmpPath];
        }
    }
    if (Object.keys(otherFeatureList).length > 0) {
        for (let key of Object.keys(otherFeatureList)) {
            let tmpPath = require.resolve(`./otherFeatures/${key}`);
            //tmpPath = tmpPath.split("\\");
            //tmpPath = tmpPath.join("\\\\");
            console.log(tmpPath);
            delete require.cache[tmpPath];
        }
    }
    // discard previous found files from list
    commandList = {};
    messageFeatureList = {};
    otherFeatureList = {};
}

/**
 * - Find all command subfiles and add to commands object
 * - Filename is the command keyword
 */
function setupCommands() {
    console.log("\nParsing commands in ./commands/");
    fs.readdirSync("./commands/").forEach((file) => {
        // for each file, create linked list and require each file, remove .js from name
        file = file.substring(0, file.length - 3);
        commandList[file] = require(`./commands/${file}`);
    });
    console.log("Found these commands: ", Object.keys(commandList));
}

/**
 * - Find all feature subfiles and add to features object
 *
 */
function setupMessageFeatures() {
    console.log("\nParsing features in ./messageFeatures/");
    fs.readdirSync("./messageFeatures/").forEach((file) => {
        // for each file, create linked list and require each file, remove .js from name
        file = file.substring(0, file.length - 3);
        messageFeatureList[file] = require(`./messageFeatures/${file}`);
    });
    console.log(
        "Found these message features: ",
        Object.keys(messageFeatureList)
    );
}

/**
 * - Find all non-message feature subfiles and add to otherFeatures object
 *
 */
function setupOtherFeatures() {
    console.log("\nParsing features in ./otherFeatures/");
    fs.readdirSync("./otherFeatures/").forEach((file) => {
        // for each file, create linked list and require each file, remove .js from name
        file = file.substring(0, file.length - 3);
        otherFeatureList[file] = require(`./otherFeatures/${file}`);
    });
    console.log(
        "Found these non-message features: ",
        Object.keys(otherFeatureList)
    );
}
/**
 * - Joins voicechannel in global scope, should allow further processing
 * - accepts {@link https://discord.js.org/#/docs/main/stable/class/VoiceChannel discord.js VoiceChannel}
 * @todo add more functionality, currently only connects to voice
 * @param {Discord.VoiceChannel} channel
 */
const joinVoice = async function (voiceChannel) {
    await voiceChannel.join().catch(console.error);
};

exports.setup = setup;
exports.joinVoice = joinVoice;
