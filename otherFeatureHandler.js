/**
 *
 *
 * @param {(object|Discord.VoiceState)} triggerObject - One of several possible discord.js triggerobjects passed from client.on() event
 * Only listed types are supported
 * - {@link https://discord.js.org/#/docs/main/stable/class/VoiceState VoiceState}
 * @param {array} otherFeatureList - Array of all loaded otherFeature sub-modules
 */
module.exports = function (triggerObj, otherFeatureList) {
    let supportedTrigger = checkValidTriggerType(triggerObj);
    if (supportedTrigger == false) {
        console.log("Unsupported trigger: " + triggerObj);
        return;
    }
    let validTriggers = checkFeatures(triggerObj, otherFeatureList);
    if (validTriggers != false) {
        execFeatures(triggerObj, validTriggers);
    }
};

/**
 * Checks if incoming trigger type is supported
 *
 * @param {(object|Discord.VoiceState)} triggerObject - One of several possible discord.js triggerobjects passed from client.on() event
 * Only listed types are supported
 * - {@link https://discord.js.org/#/docs/main/stable/class/VoiceState VoiceState}
 * @return {(string|boolean)} - Returns the triggertype as string or boolean false
 */
function checkValidTriggerType(triggerObject) {
    let currentTriggerType = triggerObject.constructor.name;
    for (let index = 0; index < triggerObject.length; index++) {
        const element = triggerObject[index];
        if (currentTriggerType == element) {
            return element;
        }
    }
    return false;
}
/**
 *
 *
 * @param {(object|Discord.VoiceState)} triggerObject - One of several possible discord.js triggerobjects passed from client.on() event
 * Only listed types are supported
 * - {@link https://discord.js.org/#/docs/main/stable/class/VoiceState VoiceState}
 * @param {array} otherFeatureList - Array of all loaded otherFeature sub-modules
 * @return {(array|boolean)} - Array of any features which are valid
 * - false if no valid features are found
 */
function checkFeatures(triggerObject, otherFeatureList) {
    let validFeatures = {};
    for (let key of Object.keys(otherFeatureList)) {
        if (otherFeatureList[key]["criteria"](triggerObject)) {
            // If msg meats feature criteria
            validFeatures[key] = otherFeatureList[key];
        }
    }
    //console.log(validFeatures);
    if (Object.keys(validFeatures).length === 0) return false;
    else return validFeatures;
}
/**
 *  - Executes valid features from checkFeatures function
 *
 * @param {(object|Discord.VoiceState)} triggerObject - One of several possible discord.js triggerobjects passed from client.on() event
 * Only listed types are supported
 * - {@link https://discord.js.org/#/docs/main/stable/class/VoiceState VoiceState}
 * @param {array} validFeatures - Array of valid features from checkFeatures function
 */
function execFeatures(triggerObject, validFeatures) {
    for (let key of Object.keys(validFeatures)) {
        //console.log(key);
        validFeatures[key]["featureFunc"](triggerObject);
        console.log(`Handled feature ${key}`);
    }
}
/** @type {array} */
const validFeatureTypes = ["VoiceState"];
