const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "p!";
  let veri = await db.fetch(`rol1_${message.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${message.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${message.guild.id}`);
  let veri2 = await db.fetch(`rol2_${message.guild.id}`);

  if (!veri) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Herhangi Bir Rütbe Ayarlanmamış.`)
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
  }
  ///////////////////
  if (veri) {
    if (!veri2) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `1 - Rol: **${
            message.guild.roles.cache.get(veri).name
          }** - ${veri12} Davet!`
        )
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL());

      message.channel.send(embed);
      return;
    } else {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `1 - Rol: **${
            message.guild.roles.cache.get(veri).name
          }** - ${veri12} Davet!\n2 - Rol: **${
            message.guild.roles.cache.get(veri2).name
          }** - ${veri21} Davet!`
        )
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL());

      message.channel.send(embed);
      return;
    }
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};
exports.help = {
  name: "rütbe-liste",
  description: "rütbe-liste",
  usage: "rütbe-liste"
};