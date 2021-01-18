module.exports = {
  checkFeatures: (msg, features) => {
    let validFeatures = {};
    for (let key of Object.keys(features)) {
      if (features[key]["criteria"](msg)) {
        // If msg meats feature criteria
        validFeatures[key] = features[key];
      }
    }
    //console.log(validFeatures);
    if (Object.keys(validFeatures).length === 0) return false;
    else return validFeatures;
  },
  execFeatures: (msg, validFeatures) => {
    for (let key of Object.keys(validFeatures)) {
      //console.log(key);
      validFeatures[key]["featureFunc"](msg);
    }
  },
};
