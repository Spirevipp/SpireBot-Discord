const name = "ttsMessageOOF";
module.exports = {
  name: name,

  featureFunc: (msg) => {
    // selve funksjonen til featuren
    msg.reply("OOF my ears hurts :(");
    console.log(msg.author.username + " used TTS! OUCH my ears hurts!");
  },
  criteria: (msg) => {
    // hva som skal til for at denne featuren skal kjøres
    if (msg.tts && !msg.author.bot) return true;
    else return false;
  },
  description: `I OOFS when someone uses TTS`,

  usage: `Be a dick and use /tts`,
};
