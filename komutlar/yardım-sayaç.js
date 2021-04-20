const Discord = require("discord.js");

exports.run = async (client, message) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("» **Azir Bot Sayaç Yardım Menüsü** « \n» **Prefix** : `a!`") // Başlık
    .setColor("#63a4fb")
    .setDescription(`
       ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
       <:2932dash:833858603130814485>\`a!sayaç-kanal-ayarla\` : **Sayaç Kanal Ayarlarsınız.
       <:2932dash:833858603130814485>\`a!sayaç-ayarla\` : **Sayaç ayarlarsınız.
       ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
       `)
    .setTimestamp();
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sayaç-y", "sayaçy"],
  permLevel: 0
};

exports.help = {
  name: "yardım-sayaç",
  description: "sayaç-yardım",
  usage: "yardım-sayaç"
};
