const name = "sendNdelet";
module.exports = {
    name: name,

    command: function (msg, args) {
        msg.delete();
        msg.channel.send(args.join(" "));
    },
    description: `Sends whatever you give as parameter in the same channel like a ninja`,

    usage: `${process.env.COMMANDSYMBOL}${name} + whaterver you want bot to send`,
};
