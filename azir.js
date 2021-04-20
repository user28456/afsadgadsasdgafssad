const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Az Önce Bot Ping yedi, Sorun önemli değil merak etme. Hatayı düzelttik.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk')
const { Client, Util } = require('discord.js');
const fs = require('fs');
require('./util/eventLoader.js')(client);
const db = require('quick.db');
const ms = require('ms');
const moment = require('moment');
const qdb = require('quick.db');
//////////////////////////////////////////////////
var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};
client.login(process.env.token);
//////////////////////////////////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`Toplamda ${files.length} Adet Komut Yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`${props.help.name} Adlı Komut Başarıyla Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
//////////////////////////////////////////////////
client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
//////////////////////////////////////////////////
/////-------------| KOMUTLAR |-------------\\\\\\

client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı <a:3593byeeeeeee:833976612374577183>! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucuya Katıldı <a:2750_Rainbow_Hyper_Tada:833976611849109505>! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});


/////////////////////////////////////
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.cache.get(d);
  const sasad = member.guild.members.cache.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user}\`\` **Adlı Kişi Aramızdan Ayrıldı.\n Kişiyi Davet Eden :** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL());
    client.channels.cache.get(kanal).send(`
╔═════════════════════════════════════
║ 💔 **${member.user.tag}** Adlı Kullanıcı Aramızdan Ayrıldı.
║  ⁉ Kullanıcıyı Davet Eden: **Bulunamadı!**
╚═════════════════════════════════════
`);
    return;
  } else {
    const aa = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL());
    client.channels.cache.get(kanal).send(`
╔═════════════════════════════════════
║ ✨**${member.user.tag}** Adlı Kullanıcı Aramızdan Ayrıldı.
║ ⚙ Kullanıcıyı Davet Eden:  **${sa.tag}**
╚═════════════════════════════════════
`);

    if (!veri) return;

    if (sasad.roles.cache.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.roles.remove(veri);
        return;
      }
    }
    if (sasad.roles.cache.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.roles.remove(veri2);
        return;
      }
    }
  }
});
client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.cache.get(invite.inviter.id);
    const davetçi = client.users.cache.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.id}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL());
    client.channels.cache.get(kanal).send(`
╔═════════════════════════════════════
║ ✅ **${member.user}** Adlı Kullanıcı Aramıza Katıldı.
║ ⚙  Kullanıcıyı Davet Eden: <@!${davetçi.id}> 
║ 📝 Toplam **${sayı2}** Daveti Oldu.!
╚═════════════════════════════════════
    `);

    if (!veri) return;

    if (!sasad.roles.cache.has(veri)) {
      if (sayı2 => veri12) {
        sasad.roles.add(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.roles.add(veri2);
        return;
      }
    }
  });
});
///
client.on("guildMemberAdd", member => {       
    var ronney = db.fetch(`otorolrolu_${member.guild.id}`);
  var rol = member.guild.roles.cache.get(ronney)
 if(!rol) return; //Eğer sunucudaki rol silinirse otorol ayarı silinir
   member.roles.add(rol.id)
//-----Rol(ÜST)Yazı(ALT)-----\\
var ales = db.fetch(`otorolkanali_${member.guild.id}`);
var kanal = member.guild.channels.cache.get(ales)
if(!kanal) return;
kanal.send(`<@${member.id}> kişisi sunucuya katıldı, ${rol} rolü verildi. Hoşgeldin ${member.user.username}!`)
});
/////////hgbb
client.on('guildMemberAdd', async (member) => {
  var teyitci = db.fetch(`teyitci_${member.guild.id}`)
  var rol = `<@&${teyitci}>`
  var gelen = `<@${member.id}>`
  var rolMesaj = `→ ${rol} Rolundekiler Senle En Kısa Zamanda İlgilenicek`
  if(!teyitci) {
  var rol = ""
  var gelen = ""
  var rolMesaj = "→ Sunucumuza Boost basarak özel avantajların sahibi olabilirsin!"
  }
  var kanal = db.fetch(`hgbbkanali_${member.guild.id}`)
  if(!kanal) return;
  var tag = db.fetch(`tag_${member.guild.id}`)
  var tagMesaj = `→ Ayrıca Tagımızı Alarak Bize Destek Olabilirsin "${tag}"`
  if(!tag){
    var tag = ""
    var tagMesaj = ""
  }
    let viruskanal = member.guild.channels.cache.get(kanal)
  let virususer = client.users.cache.get(member.id);
  let viruskullanıcı = client.users.cache.get(member.id)
  const virushesapkurulus = new Date().getTime()- viruskullanıcı.createdAt.getTime();
  let viruj;
  if (virushesapkurulus < 1296000000) viruj = ' Güvenilir Değil!'
  if (virushesapkurulus > 1296000000) viruj = ' Güvenilir!'
    const hgembed = new Discord.MessageEmbed()
    .setDescription(`
    
     → Aramıza Hoşgeldin **${virususer.username}** !
  
     → Seninle Birlikte **${member.guild.memberCount}** Kişiyiz
  
     ${rolMesaj}
     
     → İsmini Ve Yaşını Yazıp Kayıt Olmayı Bekleyebilirsin.

     → Hesabın Kuruluş Tarihi ${moment(member.user.createdAt).format("**DD MMMM YYYY hh:mm:ss**") }
  
     → Hesabın Güvenlik Durumu: **${viruj}**
    
     ${tagMesaj}
    
    `)
    .setColor("#2f3136")
    .setTitle("Aramıza Yeni Birisi Katıldı !")
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor(member.guild.name,member.guild.iconURL({dynamic:true}))
    .setFooter(`${member.guild.name} Kayıt Sistemi`)
    viruskanal.send(`${rol} ${gelen}`, hgembed) ;
  })
////
client.on('guildMemberRemove', async (member) => {
  var gelen = `<@${member.id}>`
  var kanal = db.fetch(`hgbbkanali_${member.guild.id}`)
  if(!kanal) return;
    var viruskanal = member.guild.channels.cache.get(kanal)
  let virususer = client.users.cache.get(member.id);
  let viruskullanıcı = client.users.cache.get(member.id)
  const virushesapkurulus = new Date().getTime()- viruskullanıcı.createdAt.getTime();
  let viruj;
  if (virushesapkurulus < 1296000000) viruj = ' Güvenilir Değildi...'
  if (virushesapkurulus > 1296000000) viruj = ' Güvenilirdi...'
    const hgembed = new Discord.MessageEmbed()
    .setDescription(`
    
     → **${virususer.username}** Aramızdan Ayrıldı :(
  
     → Sensiz **${member.guild.memberCount}** Kişiyiz

     → Hesabın Kuruluş Tarihi ${moment(member.user.createdAt).format("**DD MMMM YYYY hh:mm:ss**") }
  
     → Hesabın Güvenlik Durumu: **${viruj}**
    
    `)
    .setColor("#2f3136")
    .setTitle("Birisi aramızdan ayrıldı :(")
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor(member.guild.name,member.guild.iconURL({dynamic:true}))
    .setFooter(`${member.guild.name} Kayıt Sistemi`)
    viruskanal.send(hgembed) ;
  })