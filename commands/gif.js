const fetch = require("node-fetch");
const name = "gif";
module.exports = {
    name: name,

    command: async function (msg, args) {
        // if (msg.channel.id !== process.env.BOTCHANNEL) return;
        let keywords = "beep boop";
        if (args.length >= 2 && args.pop() === "SUDO!!") {
            keywords = args.join(" ");
            let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORAPIKEY}&contentfilter=off&limit=4`;
            let response = await fetch(url);
            let json = await response.json();
            console.log(`Searched for GIF with: ${keywords} and sent all 4 results! So much spam :(`);
            msg.channel.send("🤖 THE BEEPEST BOOP 🤖");
            json.results.forEach(element => {
                msg.channel.send(element.url);
            });
            return;
        }
        if (args.length > 0) {
            keywords = args.join(" ");
        }
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORAPIKEY}&contentfilter=off&limit=20`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        console.log(`Searched for GIF with: ${keywords}`);
        msg.channel.send("🤖 BEEP BOOP 🤖");
        msg.channel.send(json.results[index].url);

    },
    description: `Searches Tenor for gifs with provided keywords`,

    usage: `${process.env.COMMANDSYMBOL}${name}`
}