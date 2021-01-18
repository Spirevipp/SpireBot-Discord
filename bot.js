// Node modules
require("dotenv").config();
const fs = require("file-system");
const Discord = require("discord.js");
console.log("Beep boop! 🤖");

// Message handler which decides what to do with the incoming message
const messageHandler = require("./messageHandler");

// Init Discord client class
const client = new Discord.Client();

// Find all command subfiles and add to commands object
// Filename is the command keyword
let commands = {};
console.log("Parsing commands in ./commands/");
fs.readdirSync("./commands/").forEach((file) => {
  // for each file, create linked list and require each file
  file = file.substring(0, file.length - 3); // remove .js
  commands[file] = require(`./commands/${file}`);
});
console.log("Found these commands: ", Object.keys(commands));

// Find all feature subfiles and add to features object
let features = {};
console.log("Parsing features in ./features/");
fs.readdirSync("./features/").forEach((file) => {
  // for each file, create linked list and require each file
  file = file.substring(0, file.length - 3); // remove .js
  features[file] = require(`./features/${file}`);
});
console.log("Found these features: ", Object.keys(features));

// Connect to Discord API
client.login(process.env.BOTTOKEN).catch(console.error);
client.on("ready", () => {
  // Callback func on login
  console.log("Ready to beep!");
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
// commandHandler require additional args, must be passed through proxy function
// msg is from client.on() function
function gotMessage(msg) {
  messageHandler(msg, commands, features);
}
