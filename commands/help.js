const { MessageEmbed } = require("discord.js");
const name = "help";
module.exports = {
  name: name,

  command: function (msg, args, commands, features) {
    console.log(msg.author.username + " needs help ASAP");
    commandList = Object.keys(commands).join(", ");
    featureList = Object.keys(features).join(", ");
    //msg.reply("Current commands:");
    //msg.channel.send(commandList);
    const embed = new MessageEmbed()
      .setColor(0xffad00)
      .setTitle("SpireBot Help")
      .setDescription(`${this.description}`)
      .addField("Usage", `${this.usage}`, false)
      .addField("Available commands:", commandList, true)
      .addField("Available features:", featureList, true);
    msg.channel.send(embed);
  },
  embedDescription: function (msg, args, commands, features, type) {
    let helpTarget;
    if (type == "command") helpTarget = commands[args[0]];
    else if (type == "feature") helpTarget = features[args[0]];
    let displayName;
    if (type == "command")
      displayName = `${process.env.COMMANDSYMBOL}${helpTarget["name"]} command`;
    else if (type == "feature") displayName = `${helpTarget["name"]} feature`;

    const embed = new MessageEmbed()
      .setColor(0xffad00)
      .setTitle(`SpireBot Help - ${displayName}`)
      .addField("Description", helpTarget["description"], false)
      .addField("Usage", helpTarget["usage"], false);

    console.log(
      msg.author.username + ` asked for help with ${type} ` + args[0]
    );
    msg.channel.send(embed);
  },
  description: `Displays available commands and features, can also show detailed info for the different commands / features and how to use them`,

  usage: `${process.env.COMMANDSYMBOL}${name} to use command. \n${process.env.COMMANDSYMBOL}${name} + "command" or "feature" for a description of the command`,
};
