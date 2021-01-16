const gif = require("./commands/gif");
const summon = require("./commands/summon");
const pp = require("./commands/pp");

const commands = {
    gif,
    summon,
    pp
}

module.exports = async function (msg) {
    /*
    console.log("");
    console.log("NEW MESSAGE");
    console.log(msg);
    */
    if (msg.author.bot) return;
    let tokens = msg.content.split(" ");
    let command = tokens.shift();
    if (command.charAt(0) === process.env.COMMANDSYMBOL) {
        // valid command
        command = command.substring(1);
        commands[command](msg, tokens);
    }
}