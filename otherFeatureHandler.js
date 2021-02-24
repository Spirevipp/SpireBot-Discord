module.exports = function (triggerObj, otherFeatureList) {
    let validTriggers = checkFeatures(triggerObj, otherFeatureList);
    if (validTriggers != false) {
        execFeatures(triggerObj, validTriggers);
    }
};
function checkTriggerType(triggerObj) {
    return triggerObj.constructor.name;
}
function checkFeatures(triggerObject, allOtherFeatures) {
    let validFeatures = {};
    for (let key of Object.keys(allOtherFeatures)) {
        if (allOtherFeatures[key]["criteria"](triggerObject)) {
            // If msg meats feature criteria
            validFeatures[key] = allOtherFeatures[key];
        }
    }
    //console.log(validFeatures);
    if (Object.keys(validFeatures).length === 0) return false;
    else return validFeatures;
}
function execFeatures(triggerObject, validFeatures) {
    for (let key of Object.keys(validFeatures)) {
        //console.log(key);
        validFeatures[key]["featureFunc"](triggerObject);
        console.log(`Handled feature ${key}`);
    }
}
