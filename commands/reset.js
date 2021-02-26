const name = "reset";
const mainFile = require("../bot");
module.exports = {
    name: name,

    /**
     * @desc Command function
     *
     * @param {Discord.Message} message - Incoming message object to be handled
     * @param {array} args - Pre-split array of words in message object text content
     */
    command: function (msg, args) {
        console.log("Resetting all loaded commands and functions...");
        mainFile.setup(false);
        msg.reply("I was resettered");
    },
    description: `Resets current commands and features`,

    usage: `${process.env.COMMANDSYMBOL}${name}`,
};
