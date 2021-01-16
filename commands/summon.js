const summonReplies = [
    "🤖 BEEP BOOP 🤖",
    "🤖🤖🤖🤖",
    "🤖 REPORTING FOR DUTY 🤖",
    "🤖 NO THANK YOU 🤖"
]
module.exports = function (msg, args) {
    console.log("SUMMONED");
    const r = Math.floor(Math.random() * summonReplies.length);
    msg.channel.send(summonReplies[r]);
    
}