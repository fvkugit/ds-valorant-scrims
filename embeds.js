const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const config = require("./config.json");
const comandos = require("./comandos.js");
const bot = require("./bot.js")
const draw = require("./embeds.js")


//////////////////////////////////////////////////////////////////////

const userStatistics = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Estadisticas Faceit de ' + bot.args)
    .setAuthor('Valorant S & T — [ !fcstats ] ', 'https://i.imgur.com/NHO2tvb.png')
    //.setDescription('[ — Estadisticas Faceit '+args+' — ]')
    .setThumbnail(bot.avatar)
    .setURL('https://www.faceit.com/es/players/' + bot.args)
    .addField('Valorant ID', (valorantId), false)
    .addField('Partidas jugadas', (played), true)
    .addField('Partidas ganadas', (wins), true)
    .addField('Winrate', (parseInt(winrate) + '%'), true)
    .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

    .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
    .setTimestamp()


/*const error = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Estadisticas Faceit - Error')
    .setAuthor('Valorant S & T — [ !fcstats ] ', 'https://i.imgur.com/NHO2tvb.png')
    //.setDescription('[ — Estadisticas Faceit '+args+' — ]')
    .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
    .setDescription('La cuenta ' + args + ' no existe, o no tiene estadisticas en Valorant!')
    .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

    .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
    .setTimestamp()*/
