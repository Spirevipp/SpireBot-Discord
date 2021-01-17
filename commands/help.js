const {
    MessageEmbed
} = require("discord.js");
module.exports = {

    command: function (msg, args, commands, features) {
        console.log(msg.author.username + " needs help ASAP");
        commandList = Object.keys(commands).join(", ");
        featureList = Object.keys(features).join(", ");
        //msg.reply("Current commands:");
        //msg.channel.send(commandList);
        const embed = new MessageEmbed()
            // Set the title of the field
            .setTitle('SpireBot Help')
            // Set the color of the embed
            .setColor(0xff0000)
            // Set the main content of the embed
            .setDescription('List of commands: ' + commandList + "\n" + "List of features: " + featureList)
            .addField("Help description", `${this.description}`, "false")
        // Send the embed to the same channel as the message
        msg.channel.send(embed);
    },
    embedDescription: function (msg, args, commands, features, t) {
        if (t == "command") {
            //console.log("command!", args[0], commands, commands[args[0]]["description"]);
            console.log(msg.author.username + " asked for help with command " + args[0]);
            msg.channel.send(commands[args[0]]["description"]);
        } else if (t == "feature") {
            //console.log("feature!", args[0], features[args[0]]["description"]);
            console.log(msg.author.username + " asked for help with feature " + args[0]);
            msg.channel.send(features[args[0]]["description"]);
        }
    },
    description: `Displays available commands, use ${process.env.COMMANDSYMBOL}help "command" or "feature" for a description of the command,\
    use ${process.env.COMMANDSYMBOL}help listFeatures for a list of enabled features`
}