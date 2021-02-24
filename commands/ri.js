const name = "ri";
const bot = require("../bot.js");
module.exports = {
    name: name,

    command: function (msg, args) {
        console.log(args);
        if (args.length > 0 && args[0] == "hardt") {
            bot.joinVoice(msg.member.voice.channel);
            msg.channel.send(
                "-play https://www.youtube.com/watch?v=dzLkhZXF1Q8"
            );
        } else {
            msg.reply("https://www.youtube.com/watch?v=dzLkhZXF1Q8");
        }
    },
    description: `Jæ ska ut å ri`,

    usage: `${process.env.COMMANDSYMBOL}${name}`,
};
