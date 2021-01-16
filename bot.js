require("dotenv").config();
commandHandler = require("./command");
const Discord = require("discord.js");
console.log("Beep boop! 🤖");

// Init Discord client class
const client = new Discord.Client();

// Connect to Discord API
client.login(process.env.BOTTOKEN)
    .catch(console.error);
client.on("ready", () => {
    // Callback func on login
    console.log("Ready to beep!");
    // Set status message
    client.user.setPresence({ activity: {
        type: "WATCHING", 
        name: "🤖 BEEP BOOP 🤖", 
        details: "🤖 BEEP BOOP 🤖" }, 
        status: "online"
        })
        //.then(console.log)
        .catch(console.error);
});

client.on("message", commandHandler)
    .catch(console.error);

