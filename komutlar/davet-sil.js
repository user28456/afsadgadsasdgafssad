const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "p!";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const rolls = new Discord.MessageEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLACK")
      .setFooter(bot.user.username, bot.user.avatarURL());
    message.channel.send(rolls);
    return;
  }

  let u = message.mentions.users.first();
  let m = args.slice(1).join(" ");
  if (!u) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Lütfen daveti silinecek kişiyi etiketleyiniz!")
        .setColor("BLACK")
        .setFooter(bot.user.username, bot.user.avatarURL())
    );
  }
  if (!m) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Lütfen silinecek davet sayısını giriniz.")
        .setColor("BLACK")
        .setFooter(bot.user.username, bot.user.avatarURL())
    );
  }
  const rolls = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(
      `${u} Adlı Kişiden ${m} davet silindi! <a:781157554973704214:833983183295873064> `
    )
    .setFooter(bot.user.username, bot.user.avatarURL());
  message.channel.send(rolls);

  db.add(`davet_${message.author.id}_${message.guild.id}`, -m);
};

module.exports.conf = {
  aliases: ["davetsil"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-sil",
  description: "davet-sil",
  usage: "davet-sil"
};
