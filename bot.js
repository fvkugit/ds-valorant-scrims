const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const config = require("./config.json");
const FACEIT_KEY = "d96be389-a55c-49f2-b6c6-79216a9b8d48";
const comandos = require("./comandos.js");


client.on('ready', () => {
    console.log(`BOT INICIADO ${client.user.tag}!`);
    client.user.setActivity("Utiliza —> !ayuda", { type: 'WATCHING' })
});



client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ /);
    const comando = args.shift().toLowerCase();


    switch (comando) {
        case "ayuda":
            /////////////////////////////////////////////////////////////////////////////
            const help = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Lista de Comandos')
                .setAuthor('Valorant PRO Scrims [OPEN] — [ !ayuda ] ', 'https://i.imgur.com/NHO2tvb.png')

                .setThumbnail('https://ih1.redbubble.net/image.1090333920.7381/st,small,845x845-pad,1000x1000,f8f8f8.jpg')
                .addField('– Mostrar lista de comandos', '[ !ayuda ]', false)
                .addField('– Ver estadisticas de un jugador (Faceit)', '[ !fcstats ( UsuarioFaceit ) ]  (Desactivado)', false)
                .addField('– Ver partidas en curso (Hub Faceit)', '[ !fclobbys ]', false)
                .addField('– Ver detalles de una partida', '[ !fclobby (Numero) ]', false)
                .addField('– Solicitar fin de una partida', '[ !fcterminar (Numero) ]', false)
                .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                .setTimestamp()
            //////////////////////////////////////////////////////////////////////////////
            message.channel.send(help)
            break;

        case "fcstats":
            const args = message.content.slice(9).trim().split(/ /);


            comandos.getId(args[0], function (results) {
                for (var key in results) {
                }

                if (results == 'noUser') {
                    ////////////////////////////////////////////////////////////////////////////
                    const error = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Estadisticas Faceit - Error')
                        .setAuthor('Valorant PRO Scrims [OPEN] — [ !fcstats ] ', 'https://i.imgur.com/NHO2tvb.png')
                        .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
                        .setDescription('Debes utilizar [!fcstats] y luego colocar el usuario de faceit')
                        .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                        .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                        .setTimestamp()
                    //////////////////////////////////////////////////////////////////////////////
                    message.channel.send(error);
                }
                else if (results == 'noID' || results == '404') {
                    /////////////////////////////////////////////////////////////////////////////
                    const error = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Estadisticas Faceit - Error')
                        .setAuthor('Valorant PRO Scrims [OPEN] — [ !fcstats ] ', 'https://i.imgur.com/NHO2tvb.png')
                        .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
                        .setDescription('La cuenta ' + args + ' no existe, o no tiene estadisticas en Valorant!')
                        .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                        .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                        .setTimestamp()
                    //////////////////////////////////////////////////////////////////////////////
                    message.channel.send(error)
                } else {
                    winrate = (results[0].victorias / results[0].partidas) * 100
                    //////////////////////////////////////////////////////////////////////
                    const userStatistics = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Estadisticas Faceit de ' + args)
                        .setAuthor('Valorant PRO Scrims [OPEN] — [ !fcstats ] ', 'https://i.imgur.com/NHO2tvb.png')
                        //.setDescription('[ — Estadisticas Faceit '+args+' — ]')
                        .setThumbnail(results[1].avatar)
                        .setURL('https://www.faceit.com/es/players/' + args)
                        .addField('Valorant ID', (results[1].valorantId), false)
                        .addField('Partidas jugadas', (+results[0].partidas), true)
                        .addField('Partidas ganadas', (+results[0].victorias), true)
                        .addField('Winrate', (parseInt(winrate) + '%'), true)
                        .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                        .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                        .setTimestamp()
                    /////////////////////////////////////////////////////////////////////////////
                    message.channel.send(userStatistics);
                }

            });

            break;

        case "fclobbys":
            const lobbys = message.content.slice(9).trim().split(/ /);

            comandos.getLobbys(lobbys[0], function (results) {
                let resultado = results;
                let nameTeam1 = [];
                let nameTeam2 = [];
                let matches = [];
                ongoing = (resultado.length); // Partidas en juego
                /*
                /////////////////////////////////////////////////////////////////////////////
                const equipo = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Ver equipo: 9z')
                    .setAuthor('Valorant — [ !verequipo ] ', 'https://i.imgur.com/NHO2tvb.png')
                    .setThumbnail('https://d26lpennugtm8s.cloudfront.net/stores/967/206/themes/common/logo-1142839826-1567467852-db92870e28104c9c7df427c934c142231567467852.png?0')
                    .setDescription('La cuenta ' + args + ' no existe, o no tiene estadisticas en Valorant!')
                    .addField('Integrantes', 'Beast\nCapi\nbnjssj\nkymmefps\nAr4n', true)
                    .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                    .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                    .setTimestamp()
                //////////////////////////////////////////////////////////////////////////////

                message.channel.send(equipo);
                */

                for (var i = 0; i < ongoing; i++) {
                    matches[i] = (resultado[i].match_id)
                }

                //message.channel.send(matches);

                for (var i = 0; i < matches.length; i++) {

                    nameTeam1[i] = (resultado[i].teams.faction1.name)
                    nameTeam2[i] = (resultado[i].teams.faction2.name)

                }
                ////////////////////////////////////////////////////////////////////////////
                const ongoingEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Estadisticas Faceit - Partidas en curso')
                    .setAuthor('Valorant PRO Scrims [OPEN] — [ !fclobbys ] ', 'https://i.imgur.com/NHO2tvb.png')
                    .setDescription('[ — Hay un total de ' + ongoing + ' partidas en curso — ]')
                    .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
                for (i = 0; i < matches.length; i++) {
                    ongoingEmbed.addField('Partida ' + (i + 1), nameTeam1[i] + ' vs ' + nameTeam2[i], false)
                }
                ongoingEmbed.addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)
                ongoingEmbed.setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                ongoingEmbed.setTimestamp()

                //////////////////////////////////////////////////////////////////////////////
                message.channel.send(ongoingEmbed)

            });
            break;

        case 'fclobby':
            const lobby = message.content.slice(9).trim().split(/ /);
            lobby;

            comandos.getMatch(lobby[0], function (results) {
                consulta = results;

                switch (results) {
                    case 'noMatch':
                        /////////////////////////////////////////////////////////////////////////////
                        const noMatch = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Estadisticas Faceit - Error')
                            .setAuthor('Valorant PRO Scrims [OPEN] — [ !fclobby ] ', 'https://i.imgur.com/NHO2tvb.png')
                            .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
                            .setDescription('No se ha encontrado la partida\nUsa [ !fclobbys ] para ver la lista')
                            .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                            .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                            .setTimestamp()
                        //////////////////////////////////////////////////////////////////////////////
                        message.channel.send(noMatch)
                        break;

                    case 'noNumber':
                        /////////////////////////////////////////////////////////////////////////////
                        const noNumber = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Estadisticas Faceit - Error')
                            .setAuthor('Valorant PRO Scrims [OPEN] — [ !fclobby ] ', 'https://i.imgur.com/NHO2tvb.png')
                            .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
                            .setDescription('Debes introducir un numero de partida\nUsa [ !fclobbys ] para ver la lista')
                            .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                            .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                            .setTimestamp()
                        //////////////////////////////////////////////////////////////////////////////
                        message.channel.send(noNumber)
                        break;

                    default:
                        mapImg = consulta[0].mapaURL;
                        ////////////////////////////////////////////////////////////////////////////
                        const matchDetails = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Estadisticas Faceit - Informacion Partida ' + (lobby))
                            .setURL(consulta[0].roomURL)
                            .setAuthor('Valorant PRO Scrims [OPEN] — [ !fclobby ] ', 'https://i.imgur.com/NHO2tvb.png')
                            .setDescription('[ — Información de partida en curso — ]')
                            .setThumbnail(mapImg)
                            .addField(consulta[0].team1name, consulta[0].roster1[0] + '\n' + consulta[0].roster1[1] + '\n' + consulta[0].roster1[2] + '\n' + consulta[0].roster1[3] + '\n' + consulta[0].roster1[4], true)
                            .addField(consulta[0].team2name, consulta[0].roster2[0] + '\n' + consulta[0].roster2[1] + '\n' + consulta[0].roster2[2] + '\n' + consulta[0].roster2[3] + '\n' + consulta[0].roster2[4], true)
                            .addField('Mapa:', consulta[0].mapa, true)
                            .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)
                            .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                            .setTimestamp()

                        //////////////////////////////////////////////////////////////////////////////
                        message.channel.send(matchDetails);
                        break;

                }
            });

            break;

        case 'fcterminar':
            const room = message.content.slice(11).trim().split(/ /);
            room;
            sender = ('<@' + message.author.id + '>')

            comandos.getMatch(room[0], function (results) {
                consulta = results;
                if (message.attachments.size <= 0) {
                    results = 'noProof'
                } else { proof = message.attachments.array()[0].url }

                switch (results) {

                    case 'noProof':
                        /////////////////////////////////////////////////////////////////////////////
                        const noProof = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Estadisticas Faceit - Error')
                            .setAuthor('Valorant PRO Scrims [OPEN] — [ !fcterminar ] ', 'https://i.imgur.com/NHO2tvb.png')
                            .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
                            .setDescription('Debes adjuntar una screenshot de la partida para solicitar su finalización')
                            .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                            .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                            .setTimestamp()
                        //////////////////////////////////////////////////////////////////////////////
                        message.channel.send(noProof)
                        break;


                    case 'noMatch':
                        /////////////////////////////////////////////////////////////////////////////
                        const noMatch = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Estadisticas Faceit - Error')
                            .setAuthor('Valorant PRO Scrims [OPEN] — [ !fcterminar ] ', 'https://i.imgur.com/NHO2tvb.png')
                            .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
                            .setDescription('No se ha encontrado la partida\nUsa [ !fclobbys ] para ver la lista')
                            .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                            .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                            .setTimestamp()
                        //////////////////////////////////////////////////////////////////////////////
                        message.channel.send(noMatch)
                        break;

                    case 'noNumber':
                        /////////////////////////////////////////////////////////////////////////////
                        const noNumber = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Estadisticas Faceit - Error')
                            .setAuthor('Valorant PRO Scrims [OPEN] — [ !fcterminar ] ', 'https://i.imgur.com/NHO2tvb.png')
                            .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')
                            .setDescription('Debes introducir un numero de partida\nUsa [ !fclobbys ] para ver la lista')
                            .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)

                            .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                            .setTimestamp()
                        //////////////////////////////////////////////////////////////////////////////
                        message.channel.send(noNumber)
                        break;

                    default:
                        mapImg = consulta[0].mapaURL;
                        console.log(message.attachments)

                        //message.attachments.first(asd)

                        ////////////////////////////////////////////////////////////////////////////
                        const receipt = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Estadisticas Faceit - Solicitar Fin de Partida')
                            .setURL(consulta[0].roomURL)
                            .setAuthor('Valorant PRO Scrims [OPEN] — [ !fcterminar ] ', 'https://i.imgur.com/NHO2tvb.png')
                            .setDescription('[ — Se ha enviado tu solicitud para finalizar la partida ' + room + ' — ]')
                            .setThumbnail(mapImg)
                            .addField('Equipos:', consulta[0].team1name + ' vs ' + consulta[0].team2name)
                            .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)
                            .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                            .setTimestamp()

                        //////////////////////////////////////////////////////////////////////////////
                        message.channel.send(receipt)
                        ////////////////////////////////////////////////////////////////////////////
                        const matchDetailsFin = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Estadisticas Faceit - Solicitar Fin Partida ' + (room))
                            .setURL(consulta[0].roomURL)
                            .setAuthor('Valorant PRO Scrims [OPEN] — [ !fcterminar ] ', 'https://i.imgur.com/NHO2tvb.png')
                            .setDescription('[ — ' + sender + ' ha solicitado la finalización de la partida ' + room + ' — ]')
                            .setThumbnail(proof)
                            .addField('Equipos:', consulta[0].team1name + ' vs ' + consulta[0].team2name)
                            .addField(consulta[0].team1name, consulta[0].roster1val[0] + '\n' + consulta[0].roster1val[1] + '\n' + consulta[0].roster1val[2] + '\n' + consulta[0].roster1val[3] + '\n' + consulta[0].roster1val[4], true)
                            .addField(consulta[0].team2name, consulta[0].roster2val[0] + '\n' + consulta[0].roster2val[1] + '\n' + consulta[0].roster2val[2] + '\n' + consulta[0].roster2val[3] + '\n' + consulta[0].roster2val[4], true)
                            .addField('Mapa:', consulta[0].mapa, true)
                            .addField('\u200b', '[ Utiliza !ayuda para conocer más comandos | Buena suerte! ]', false)
                            .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                            .setTimestamp()
                        //////////////////////////////////////////////////////////////////////////////
                        client.channels.cache.find(ch => ch.name === 'logs-opens').send(matchDetailsFin);
                        break;

                }

            });

            break;

            
    }
});









client.login(' TOKEN ');
