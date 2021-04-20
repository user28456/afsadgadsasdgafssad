const Discord = require("discord.js");

exports.run = async (client, message) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("» **Azir Bot Otorol Yardım Menüsü** « \n» **Prefix** : `a!`") // Başlık
    .setColor("#63a4fb")
    .setDescription(`
       ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
       <:2932dash:833858603130814485>\`a!otorol ayarla kanal #kanal\` : **Otorol Kanalı Ayarlarsınız.**
       <:2932dash:833858603130814485>\`a!otorol ayarla rol @rol\` : **Otorol Ayarlarsınız.**
       <:2932dash:833858603130814485>\`a!otorol sıfırla\` : **Otorol Veritabanını Sıfırlar.**
       ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
       `)
    .setTimestamp();        
        message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yardım-otorol",
  description: "otorol-yardım",
  usage: "yardım-otorol"
};
