const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "p!";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const rolls = new Discord.MessageEmbed()
      .setDescription(
        "``Davet Kanalı Sıfırlama Komutu İçin Yeterli Yetkin Yok.``"
      )
      .setFooter(bot.user.username, bot.user.avatarURL())
      .setColor("BLACK");

    message.channel.send(rolls);
    return;
  }

  let kanal = await db.fetch(`davetkanal_${message.guild.id}`);

  if (!kanal) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "Davet kanalı zaten ayarlanmamış! :warning: "
        )
        .setFooter(bot.user.username, bot.user.avatarURL())
        .setColor("BLACK")
    );
  }
  db.delete(`davetkanal_${message.guild.id}`);
  const rolls = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setFooter(bot.user.username, bot.user.avatarURL())
    .setDescription(
      `Davet kanalı başarıyla sıfırlandı! <a:781157554973704214:833983183295873064> `
    );
  message.channel.send(rolls);
  return;
};

module.exports.conf = {
  aliases: ["davetkanalsıfırla"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-kanal-sıfırla",
  description: "davet-kanal-sıfırla",
  usage: "davet-kanal-sıfırla"
};