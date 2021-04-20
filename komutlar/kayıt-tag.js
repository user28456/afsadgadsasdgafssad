const Discord = require('discord.js');
const qdb = require('quick.db');
exports.run = async(client, message, args) => {
var text = args.slice(0).join(' ')
if(!text) return message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription("Bir Tag Belirtin!"))
qdb.set(`kayıttag_${message.guild.id}`, text)
return message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription("Tag ayarlandı!"))
};
exports.conf = {
    aliases: ['kayıt-tag'],
    permLevel: 3
};
exports.help = {
    name: "kayıt-tag-ayarla"
}