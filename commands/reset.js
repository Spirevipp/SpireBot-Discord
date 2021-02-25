const name = "reset";
const bot = require("../bot");
module.exports = {
    name: name,

    command: function (msg, args) {
        console.log("Resetting all loaded commands and functions...");
        bot.setup();
        msg.reply("I was resettered");
    },
    description: `Resets current commands and features`,

    usage: `${process.env.COMMANDSYMBOL}${name}`,
};
