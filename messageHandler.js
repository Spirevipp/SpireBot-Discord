const commandHandler = require("./commandHandler");
const featureHandler = require("./featureHandler");

function isPM(msg) {
  //console.log(msg.channel["type"]);
  if (msg.channel["type"] === "dm") return true;
  else return false;
}

module.exports = function (msg, commands, features) {
  // if (!msg.author.bot) console.log("NEW MESSAGE"); console.log(msg);
  //console.log(process.env.RESPONDTOPM, isPM(msg));
  if (process.env.RESPONDTOPM === "yes" && isPM(msg)) {
    console.log("Private message!");
  } else if (process.env.RESPONDTOPM === "no" && isPM(msg)) {
    console.log("Got a PM, but PMs are disabled in .env file!");
    return;
  } else if (
    process.env.ENABLEDCHANNELS !== "all" &&
    msg.channel.id !== process.env.BOTCHANNEL
  ) {
    console.log("Message filtered out by all .env variables");
    return;
  }

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
};
