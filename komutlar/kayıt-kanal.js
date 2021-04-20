const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => {
var kanal = message.mentions.channels.first();
if(!kanal) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(`${client.user.username} Kayıt Sistemi`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`:warning: Bir kanal belirtin!`)
    .setFooter(`${message.author.tag} istedi.`, message.author.displayAvatarURL({dynamic: true}))
    )
db.set(`kayıtkanalı_${message.guild.id}`, kanal.id)
return message.channel.send(
    new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(`${client.user.username} Kayıt Sistemi`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`:white_check_mark: Kayıt Kanalı <#${kanal.id}> olarak ayarlandı!`)
    .setFooter(`${message.author.tag} istedi.`, message.author.displayAvatarURL({dynamic: true}))
    )
};
exports.conf = {
    aliases: ['kayıt-kanal'],
    permLevel: 3
};
exports.help = {
    name: "kayıt-kanal-ayarla"
}