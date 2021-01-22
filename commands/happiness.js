const fetch = require("node-fetch");

const name = "happiness";
module.exports = {
    name: name,

    command: async function (msg, args) {
        let url = `https://explosm.net/comics/random`;
        let response = await fetch(url);
        //console.log(response.url);
        msg.channel.send(response.url);
    },
    description: `Sends a random Cyanide & Happines comic`,

    usage: `${process.env.COMMANDSYMBOL}${name}`,
};
