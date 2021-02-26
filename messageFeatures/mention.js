/** @type {string} */
const name = "mention";
module.exports = {
    name: name,

    /**
     * @desc The feature's actual function
     *
     * @param {Discord.Message} msg - Incoming message object
     */
    featureFunc: (msg) => {
        msg.reply("Whatchu want?");
        console.log(
            "I was mentioned by " +
                msg.author.username +
                ", i will ask what it wants"
        );
    },
    /**
     * @desc Criteria to resolve for valid feature
     *
     * @param {Discord.Message} msg - Incoming message object
     * @return {boolean} - true if valid, false if invalid
     */
    criteria: (msg) => {
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
