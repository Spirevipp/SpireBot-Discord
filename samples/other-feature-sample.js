const name = "other-feature-sample";
const triggerType = false; // VoiceState, Message, etc
module.exports = {
    name: name,

    featureFunc: (trigger) => {
        // selve funksjonen til featuren
        return;
    },
    criteria: (trigger) => {
        if (trigger.constructor.name !== triggerType) {
            return false;
        }
        if (true == false) {
            // hva som skal til for at denne featuren skal kjøres
            return true;
        } else {
            return false;
        }
    },
    description: `Sample description`,

    usage: `Sample feature usage description`,
};
