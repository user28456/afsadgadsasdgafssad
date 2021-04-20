const Discord = require('discord.js');
const qdb = require('quick.db');
let prefix = "a!"
exports.run = async(client, message, args) => {
if(!args[0]) return message.reply('Yanlış Komut Kullandınız. Yardım Komutuna Bakın **a!hgbb yardım**')
if(args[0] === "ayarla" || args[0] === "aç") {
if(!args[1]) return message.reply('Yanlış Komut Kullandınız. Yardım Komutuna Bakın **a!hgbb yardım**')
if(args[1] === "kanal") {
var kanal = message.mentions.channels.first();
if(!kanal) return message.reply('Bir kanal belirtiniz!')
qdb.set(`hgbbkanali_${message.guild.id}`, kanal.id)
return message.reply('Giriş kanalı başarıyla ayarlandı!')}
if(args[0] === "kapat" || args[0] === "sıfırla"){
if(!args[1]) return message.reply('Yanlış Komut Kullandınız. Yardım Komutuna Bakın **a!hgbb yardım**')
if(args[1] === "kanal") {
qdb.delete(`hgbbkanali_${message.guild.id}`)
return message.reply('Giriş kanalı veritabanı sıfırlandı!')}
if(args[0] === "yardım" || args[0] === "help"){
const embedimsi = new Discord.MessageEmbed()
.setColor('BLACK')
.setTitle(`${client.user.username} Giriş-Çıkış Komutları`)
.addField(`${prefix}yardım`,'Yardım Menüsü')
.addField(`${prefix}ayarla kanal #kanal`,'Giriş çıkış kanalını ayarlar.')
.addField(`${prefix}sıfırla kanal`,'Giriş çıkış kanalını sıfırlar.')
.setFooter(message.author.username + ' kullandı!')
message.channel.send(embedimsi)}}
}}
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hgbb"],
  permLevel: 0
};

exports.help = {
  name: "hgbb",
  description: "hgbb",
  usage: "hgbb"
};