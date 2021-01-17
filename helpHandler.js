let type;

function isCommand(cmd, commands) {
    for (let key of Object.keys(commands)) {
        //console.log(key, cmd);
        if (key == cmd) {
            type = "command";
            return true;
        }
    }
    return false;
}

function isFeature(ft, features) {
    for (let key of Object.keys(features)) {
        //console.log(key, ft);
        if (key == ft) {
            type = "feature";
            return true;
        }
    }
    return false;
}

module.exports = function (msg, args, commands, features) {
    //console.log(args);
    // If only help command
    if (args.length === 0) {
        commands["help"]["command"](msg, args, commands, features);
        return;
    }
    // If help command + 1 keyword or more
    if (args.length >= 1) {
        //console.log(args);
        if (isCommand(args[0], commands) || isFeature(args[0], features)) commands["help"]["embedDescription"](msg, args, commands, features, type);
        else {
            console.log(args[0] + " is not a valid command or feature");
            msg.reply(args[0] + " is not a valid command or feature");
        }
        return;
    }
}