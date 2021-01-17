const commandHandler = require("./commandHandler");
const featureHandler = require("./featureHandler");

module.exports = function (msg, commands, features) {
    //if (!msg.author.bot) console.log("NEW MESSAGE"); console.log(msg);

    let handled = false;
    // Check if message is a command
    if (msg.content.charAt(0) === process.env.COMMANDSYMBOL) {
        // valid command symbol
        if (msg.author.bot) return; // if message was sent by a bot, ignore it
        commandHandler(msg, commands, features);
        handled = true;
    }

    // Check if message contains any features
    validFeatures = featureHandler["checkFeatures"](msg, features);
    // Execute feature(s)
    if (validFeatures != false) {
        featureHandler["execFeatures"](msg, validFeatures);
        handled = true;
    }
    if (handled) console.log("Handled message from " + msg.author.username);
}