const name = "send";
module.exports = {
    name: name,

    command: function (msg, args) {
        msg.channel.send(args.join(" "));
    },
    description: `Sends whatever you give as parameter in the same channel`,

    usage: `${process.env.COMMANDSYMBOL}${name} + whaterver you want bot to send`,
};
