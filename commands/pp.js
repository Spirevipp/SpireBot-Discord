const name = "pp";
module.exports = {
    name: name,

    command: function (msg, args) {
        console.log("PP");
        msg.channel.send("P P", {
            tts: true
        });
    },
    description: `pp`,
    
    usage: `${process.env.COMMANDSYMBOL}${name}`
}