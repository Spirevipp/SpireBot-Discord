helpHandler = require("./helpHandler");
// Gets arg msg from callback function, commands is object with command.js files in ./commands/ folder
module.exports = async function (msg, commands, features) {
    let tokens = msg.content.split(" ");
    let command = tokens.shift();

    command = command.substring(1);
    console.log("Incoming command: " + command);
    if (!commands[command]) {
        console.log("invalid command " + command);
        return
    }
    if (command == "help") helpHandler(msg, tokens, commands, features); // Specific handler for help command
    else commands[command]["command"](msg, tokens);
}