const Discord = require('discord.js');
const qdb = require('quick.db');
module.exports.run = async(client, message, args) => {
qdb.delete(`kayıtyetkilisi_${message.guild.id}`)
qdb.delete(`erkekrolü_${message.guild.id}`)
qdb.delete(`alınacakrol_${message.guild.id}`)
qdb.delete(`kayıtkanalı_${message.guild.id}`)
qdb.delete(`kayıtlog_${message.guild.id}`)
qdb.delete(`kayıttag_${message.guild.id}`)
qdb.delete(`kızrolü_${message.guild.id}`)
return message.channel.send(
    new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(`${client.user.username} Kayıt Sistemi`, client.user.displayAvatarURL({dynamic: true, format: "png"}))
    .setTitle(":white_check_mark: Başarılı!")
    .setDescription(`Bot'un bütün kayıt veritabanı sıfırlandı!`)
    .setFooter(`${message.author.tag} istedi.`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
    )
};
module.exports.conf = {aliases: [], permLevel: 3};
module.exports.help = {name: "kayıt-sıfırla"};