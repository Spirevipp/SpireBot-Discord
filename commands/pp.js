module.exports = {
    command: function (msg, args) {
        console.log("PP");
        msg.channel.send("P P", {
            tts: true
        });
    },
    description: "pp"
}