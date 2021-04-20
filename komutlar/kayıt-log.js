const Discord = require('discord.js');
const qdb = require('quick.db');
exports.run = async(client, message, args) => {
var kanal = message.mentions.channels.first();
if(!kanal) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(`${client.user.username} Kayıt Sistemi`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`:warning: Bir kanal belirtin!`)
    .setFooter(`${message.author.tag} istedi.`, message.author.displayAvatarURL({dynamic: true}))
    )
qdb.set(`kayıtlog_${message.guild.id}`, kanal.id)
return message.channel.send(
    new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(`${client.user.username} Kayıt Sistemi`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`:white_check_mark: Kayıt Log Kanalı <#${kanal.id}> olarak ayarlandı!`)
    .setFooter(`${message.author.tag} istedi.`, message.author.displayAvatarURL({dynamic: true}))
    )
};
exports.conf = {
    aliases: ['kayıt-log'],
    permLevel: 3
};
exports.help = {
    name: "kayıt-log-ayarla"
}