const name = "sample-command";
module.exports = {
  name: name,

  command: function (msg, args) {
    msg.reply("Sample message");
  },
  description: `Sample description`,

  usage: `${process.env.COMMANDSYMBOL}${name} sample command usage description`,
};
