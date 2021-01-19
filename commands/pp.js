const name = "pp";
module.exports = {
    name: name,

    command: function (msg, args) {
        console.log("PP");
        msg.channel.send("P P", {
            tts: true,
        });
    },
    description: `Sends /tts P P to same channel`,

    usage: `${process.env.COMMANDSYMBOL}${name}`,
};
