const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
exports.run = function(client, message) {
  let prefix = ayarlar.prefix;

  const help = new Discord.MessageEmbed()
    .setColor("#108f8f")
    .setAuthor(
      `Azir`,
      "https://cdn.discordapp.com/avatars/806081200137175060/6f198dc58540c7ca24b6b8572410743a.webp"
    )
   .setTitle("» **Azir Bot Davet Yardım Menüsü** « \n» **Prefix** : `a!`") // Başlık
     
    .setDescription(`
   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    <:2932dash:833858603130814485>\`a!davet-kanal-ayarla\` : **Davet Kanal Ayarlarsınız.**
    <:2932dash:833858603130814485>\`a!davet-kanal-sıfırla\` : **Ayarlanan Davet Kanalını Sıfırlarsınız.**
    <:2932dash:833858603130814485>\`a!davet-oluştur\` : **Davet Linki Oluşturur.**
    <:2932dash:833858603130814485>\`a!davet-ekle\` : **Etiketlediğiniz Kisiye Belirttiğiniz Kadar Davet Sayısı Eklersiniz.**
    <:2932dash:833858603130814485>\`a!davet-sil\` : **Etiketlediğiniz Kişinin Belirttiğiniz Kadar Davet Sayısını Silersiniz.**
    <:2932dash:833858603130814485>\`a!davet-sıfırla\` : **Etiketlediğiniz Kişinin Davetlerini Tamamen Silersiniz.**
    <:2932dash:833858603130814485>\`a!davetlerim\` : **Davet Sayınıza Bakarsınız.**
    <:2932dash:833858603130814485>\`a!davet-rütbe-ekle\` : **RÜtbe Eklersiniz.**
    <:2932dash:833858603130814485>\`a!davet-rütbe-liste\` : **Rütbe Listesini Açar.**
    <:2932dash:833858603130814485>\`a!davet-rütbe-sil\` : **Eklediğiniz Rütbeyi Silersiniz.**
   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   `)

    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setFooter(
      ` Azir |  ${message.author.username} Tarafından istendi.`,
      "https://cdn.discordapp.com/avatars/806081200137175060/6f198dc58540c7ca24b6b8572410743a.webp"
    );

  message.channel.send(help);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım-davet"],
  permLevel: 3
};

exports.help = {
  name: "yardım-davet",
  description: "Open the help menu.",
  usage: "yardim-davet"
};
