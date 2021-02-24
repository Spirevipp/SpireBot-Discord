const name = "reset";
const bot = require("../bot");
module.exports = {
    name: name,

    command: function (msg, args) {
        bot.setup();
        msg.reply("I was resettered");
    },
    description: `Resets current commands and features`,

    usage: `${process.env.COMMANDSYMBOL}${name}`,
};
