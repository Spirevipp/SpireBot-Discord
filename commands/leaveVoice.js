const name = "leaveVoice";
module.exports = {
    name: name,

    /**
     * - Forces bot to leave its current voice channel (currently only if user is in the same voice channel)
     *
     * @todo - make it work regardless if user who used command is in voice channel
     * - does not do anything if bot is not in a voice channel
     * - possibly breaks if bot is in a different voice channel than user
     * @param {Discord.Message} msg
     * @param {array} args
     *
     */
    command: function (msg, args) {
        //console.log(msg.member.voice.channel);
        if (msg.member.voice.channelID === null) {
            console.log("User is not in a channel, i cant do anything!!!");
            return;
        }
        msg.member.voice.channel.leave();
    },
    description: `bot leaves vocie`,

    usage: `${process.env.COMMANDSYMBOL}${name}`,
};
