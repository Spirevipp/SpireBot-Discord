/**
 * @typedef {Object} discordjsMessage
 * @property {string}
 * Documentation: {@link https://discord.js.org/#/docs/main/stable/class/Message|Discord.Message}
 */
const name = "sample-feature";
module.exports = {
    name: name,
    /**
     * @desc The feature's actual function
     *
     * @param {discordjsMessage} msg - Incoming message object
     */
    featureFunc: (msg) => {
        return;
    },
    /**
     * @desc Criteria to resolve for valid feature
     *
     * @param {discordjsMessage} msg - Incoming message object
     * @return {boolean} - true if valid, false if invalid
     */
    criteria: (msg) => {
        return false;
    },
    description: `Sample description`,

    usage: `Sample feature usage description`,
};
