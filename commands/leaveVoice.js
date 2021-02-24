const name = "leaveVoice";
module.exports = {
    name: name,

    command: function (msg, args) {
        //console.log(msg.member.voice.channel);
        msg.member.voice.channel.leave();
    },
    description: `bot leaves vocie`,

    usage: `${process.env.COMMANDSYMBOL}${name}`,
};
