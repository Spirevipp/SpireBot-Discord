/** @type {string} - Name for the command, gets used with help command */
const name = "sample-command";
// const mainFile = require("../bot");
module.exports = {
    name: name,
    /**
     * @desc Command function
     *
     * @param {Discord.Message} message - Incoming message object to be handled
     * @param {array} args - Pre-split array of words in message object text content
     */
    command: function (msg, args) {
        msg.reply("Sample message");
    },
    description: `Sample description`,

    usage: `${process.env.COMMANDSYMBOL}${name} sample command usage description`,
};
