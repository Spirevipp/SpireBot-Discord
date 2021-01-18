const summonReplies = [
  "🤖 BEEP BOOP 🤖",
  "🤖🤖🤖🤖",
  "🤖 REPORTING FOR DUTY 🤖",
  "🤖 NO THANK YOU 🤖",
];
const name = "test";
module.exports = {
  name: name,

  command: function (msg, args) {
    console.log("SUMMONED");
    const r = Math.floor(Math.random() * summonReplies.length);
    msg.channel.send(summonReplies[r]);
  },
  description: `test`,

  usage: `${process.env.COMMANDSYMBOL}${name}`,
};
