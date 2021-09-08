const config = require("./config.json");
const Discord = require('discord.js');
const bot = require("./bot.js");
const axios = require('axios');
const faceit_api_key = "d96be389-a55c-49f2-b6c6-79216a9b8d48";


function getId(nickname, callback) {
    //let players = [];
    let playerId;
    if (nickname == "") { return callback('noUser') }
    axios
        .get(`https://open.faceit.com/data/v4/players?nickname=${nickname}`, {
            headers: { Authorization: `Bearer ${faceit_api_key}` },
        })
        .then((result) => {
            //  players.push({playerId: result.data.player_id });
            playerId = result.data.player_id;
            avatar = result.data.avatar;
            if (!result.data.games.valorant) { return callback('noID'); }
            valorantId = result.data.games.valorant.game_player_id
            faceitURL = result.data.faceit_url;

            stats(playerId, function (resultado) {
                resultado.push({
                    'playerId': playerId,
                    'avatar': avatar,
                    'valorantId': valorantId,
                })
                return callback(resultado);
            });
        })
        .catch((err) => {
            return callback('404')
        });
}


function stats(playerId, callback) {
    let partidas;
    let estadisticas = [];
    axios
        .get(`https://open.faceit.com/data/v4/players/${playerId}/stats/csgo`, {
            headers: { Authorization: `Bearer ${faceit_api_key}` },
        })
        .then((result) => {
            estadisticas.push({
                'partidas': result.data.lifetime.Matches,
                'victorias': result.data.lifetime.Wins
            })
            return callback(estadisticas);
        })
        .catch((err) => {
            return err;
        });
}

function getLobbys(nickname, callback) {
    let lobbys;
    axios
        .get(`https://open.faceit.com/data/v4/hubs/8d0ae53a-8572-404c-b28d-1d208817e26a/matches?type=ongoing&offset=0&limit=20`, {
            headers: { Authorization: `Bearer ${faceit_api_key}` },
        })
        .then((result) => {
            lobbys = result.data.items;
            return callback(lobbys);
        })
        .catch((err) => {
            return callback(err);
        });
}

function getMatch(num, callback) {
    let match;
    let matchData = [];
    num = parseInt(num) - 1
    if (isNaN(num) || num < 0) {
        return callback('noNumber')
    }
    axios
        .get(`https://open.faceit.com/data/v4/hubs/aabc318e-cae3-4330-b063-6722217aadc3/matches?type=ongoing&offset=0&limit=20`, {
            headers: { Authorization: `Bearer ${faceit_api_key}` },
        })
        .then((result) => {
            

            matchesData = result.data.items
            roster1 = [];
            roster2 = [];
            roster1val = [];
            roster2val = [];


            
            if (num+1 > (matchesData.length)) {
                return callback('noMatch')
            }

            for (i = 0; i < 5; i++){
                roster1[i] = matchesData[num].teams.faction1.roster[i].nickname;
                roster2[i] = matchesData[num].teams.faction2.roster[i].nickname;
                roster1val[i] = matchesData[num].teams.faction1.roster[i].game_player_id;
                roster2val[i] = matchesData[num].teams.faction2.roster[i].game_player_id;
            }
            
            mapa = matchesData[num].voting.map.pick
            mapa = (mapa[0].charAt(0).toUpperCase() + mapa[0].slice(1)) 

            mapa;
            switch(mapa){
                case 'Bind' : (mapaURL = 'https://i.imgur.com/SnOMgx7.jpg'); break;
                case 'Split' : (mapaURL = 'https://i.imgur.com/Ixu8l9G.jpg'); break;
                case 'Haven' : (mapaURL = 'https://i.imgur.com/lEYNvuL.jpg'); break;
                case 'Ascent' : (mapaURL = 'https://i.imgur.com/ASW7MH1.jpg'); break;
            }
            
            matchData.push({
            'team1name' : matchesData[num].teams.faction1.name,
            'team2name' : matchesData[num].teams.faction2.name,
            'mapa': mapa, 
            'mapaURL' : mapaURL,
            'roster1' : roster1,
            'roster2' : roster2,
            'roster1val' : roster1val,
            'roster2val' : roster2val,
            'roomURL' : 'https://www.faceit.com/es/valorant/room/'+matchesData[num].match_id
            })

            return callback(matchData);
        })
        .catch((err) => {
            return callback(err);
        });



}



module.exports = { getId, getLobbys, getMatch };

