const name = "sample-feature";
module.exports = {
    name: name,
    
    featureFunc: (msg) => {
        // selve funksjonen til featuren
        return;
    },
    criteria: (msg) => {
        // hva som skal til for at denne featuren skal kjøres
        return false;
    },
    description: `Sample description`,
    
    usage: `Sample feature usage description`
}