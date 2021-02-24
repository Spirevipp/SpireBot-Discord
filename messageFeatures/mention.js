const name = "mention";
module.exports = {
    name: name,

    featureFunc: (msg) => {
        // selve funksjonen til featuren
        msg.reply("Whatchu want?");
        console.log(
            "I was mentioned by " +
                msg.author.username +
                ", i will ask what it wants"
        );
    },
    criteria: (msg) => {
        // hva som skal til for at denne featuren skal kjøres
        //console.log("MENTIONS ===========================")
        //console.log(msg.mentions);
        if (
            msg.mentions.users.findKey(
                (user) => user.username === "SpireBot"
            ) == "799734031846473768"
        )
            return true;
        else return false;
    },
    description: `I reply when mentioned`,

    usage: `@SpireBot`,
};
