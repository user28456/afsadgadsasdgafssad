const Discord = require("discord.js");

exports.run = async (client, message) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("» **Azir Bot Yardım Menüsü** « \n» **Prefix** : `a!`") // Başlık
    .setDescription(`\`a!yardım-sayaç\` : **Sayaç Menüsünü Açar.** `)
    .setColor("#63a4fb")
    .setTimestamp();

  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "yardım",
  usage: "yardım"
};
