const fetch = require("node-fetch");

module.exports = {
    command: async function (msg, args) {
        // if (msg.channel.id !== process.env.BOTCHANNEL) return;
        let keywords = "beep boop";
        if (args.length > 0) {
            keywords = args.join(" ");
        }
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORAPIKEY}&limit=8`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        console.log("Searched for GIF with: " + keywords);
        msg.channel.send("🤖 BEEP BOOP 🤖");
        msg.channel.send(json.results[index].url);

    },
    description: "gif"
}