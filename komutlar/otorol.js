const alescnm = require('discord.js');
const roldb = require('quick.db');
exports.run = async(client, message, args) => {
    if(!args[0]) return message.reply ("Bir seçenek belirtiniz. Eğer kullanımı bilmiyorsanız `yardım-otorol`")
    if(args[0] == "ayarla" || args[0] == "aç") {
        if(args[1] == "kanal" ||args[1] == "channel") {
        var ales = message.mentions.channels.first() || message.guild.channel.cache.get(args[2]);
    if(!ales) return message.reply('Bir kanal belirtiniz.')
    roldb.set(`otorolkanali_${message.guild.id}`, ales.id)
    return message.reply('Otorol kanalı başarı ile ayarlandı.')}
    if(args[1] == "rol" || args[1] == "role") {
        var ronney = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if(!ronney) return message.reply("Lütfen bir rol belirtiniz")
        roldb.set(`otorolrolu_${message.guild.id}`, ronney.id)
        return message.reply('Otorol rolü başarıyla ayarlandı.')}}
    if(args[0] == "sıfırla" || args[0] == "kapat") {
        roldb.delete(`otorolkanali_${message.guild.id}`)
        roldb.delete(`otorolrolu_${message.guild.id}`)
        message.channel.send('Veritabanı sıfırlandı. Oto-Rol kapatıldı')}
    
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorol"],
  permLevel: 0
};

exports.help = {
  name: "otorol",
  description: "otorol",
  usage: "otorol"
};
