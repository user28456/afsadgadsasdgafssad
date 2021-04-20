const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "s!";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const rolls = new Discord.MessageEmbed()
      .setDescription(
        "``Davet Kanal Komutunu Kullanmak İçin Yeterli Yetkin Yok.``"
      )
      .setFooter(bot.user.username, bot.user.avatarURL())
      .setColor("BLACK");

    message.channel.send(rolls);
    return;
  }

  let kanal = message.mentions.channels.first();

  if (!kanal) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("**Lütfen bir kanal belirtiniz!**")
        .setFooter(bot.user.username, bot.user.avatarURL())
        .setColor("BLACK")
    );
  }
  const rolls = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setFooter(bot.user.username, bot.user.avatarURL())
    .setDescription(
      `Davet kanalı; ${kanal} olarak ayarlandı! <a:781157554973704214:833983183295873064>`
    );
  message.channel.send(rolls);

  db.set(`davetkanal_${message.guild.id}`, kanal.id);
};

module.exports.conf = {
  aliases: ["davetkanalayarla"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-kanal-ayarla",
  description: "davet-kanal-ayarla",
  usage: "davet-kanal-ayarla"
};