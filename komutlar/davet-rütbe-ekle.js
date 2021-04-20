const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "p!";
  let veri = await db.fetch(`rol1_${message.guild.id}`);
  let veri2 = await db.fetch(`rol2_${message.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${message.guild.id}`);
  if (veri2) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Zaten En Yüksek Rütbedesin!`)
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    return;
  }
  if (!veri) {
    let rollsıv = args[1];
    let rolls = message.mentions.roles.first();
    if (!rolls) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `Lütfen Bir Rol Etiketleyin. \nÖrnek: ${prefix}rütbe-ekle @rolls 5`
        )
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL());

      message.channel.send(embed);
      return;
    }
    if (!rollsıv) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `Lütfen Bir Davet Sayısı Belirtin. \nÖrnek: ${prefix}rütbe-ekle @rolls 5`
        )
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL());

      message.channel.send(embed);
      return;
    }
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Başarılı Bir Şekilde ${rolls} Rolü ${rollsıv} Davet Karşılığında Alınabilecek.`
      )
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    await db.set(`rol1_${message.guild.id}`, rolls.id);
    await db.set(`roldavet1_${message.guild.id}`, rollsıv);
    return;
  }
  ///////////////////
  else {
    let rollsıv = args[1];
    let rolls = message.mentions.roles.first();
    if (!rolls) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `Lütfen Bir Rol Etiketleyiniz. \nÖrnek: ${prefix}rütbe-ekle @rolls 5`
        )
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL());

      message.channel.send(embed);
      return;
    }
    if (!rollsıv) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `Lütfen Bir Davet Sayısı Belirtin. \nÖrnek: ${prefix}rütbe-ekle @rolls 5`
        )
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL());

      message.channel.send(embed);
      return;
    }
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Başarılı Bir Şekilde ${rolls} Rolü ${rollsıv} Davet Karşılığında Alınabilecek.`
      )
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    if (rollsıv < veri12) {
      let hhh = await db.fetch(`rol1_${message.guild.id}`);
      let sss = await db.fetch(`roldavet1_${message.guild.id}`);
      await db.set(`rol1_${message.guild.id}`, rolls.id);
      await db.set(`roldavet1_${message.guild.id}`, rollsıv);
      await db.set(`rol2_${message.guild.id}`, hhh);
      await db.set(`roldavet2_${message.guild.id}`, sss);

      return;
    } else {
      await db.set(`rol2_${message.guild.id}`, rolls.id);
      await db.set(`roldavet2_${message.guild.id}`, rollsıv);
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
  name: "davet-rütbe-ekle",
  description: "davet-rütbe-ekle",
  usage: "davet-rütbe-ekle"
};
