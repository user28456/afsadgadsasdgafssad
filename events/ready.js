const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

(module.exports = client => {
  client.user.setActivity(`a!yardım | ${client.users.cache.size} Kullanıcı | ${client.guilds.cache.size} Sunucu`, {
    type: "STREAMING",
    url: "https://www.twitch.tv/"
  });
}),
  console.log(`Azir Bot başarıyla giriş yaptı.`);
