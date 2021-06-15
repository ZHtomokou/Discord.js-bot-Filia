//Import dependencies
const Discord = require('discord.js');
const https = require('https');
const xml2js = require('xml2js');
const fs = require('fs');
//My lib
libPath = './lib/';
const clientLog = require(libPath+'clientLog.js');
const welcome = require(libPath+'welcome.js');
const memberjoin = require(libPath+'memberjoin.js');
const reactEmit = require(libPath+'reactEmit.js');
const teamManager = require(libPath+'teamManager.js');
const musicManager = require(libPath+'musicManager.js');
const sonicsays = require(libPath+'sonicSays.js');
const booruManager = require(libPath+'booruManager.js');
const inspect = require(libPath+'Inspect.js');
const myJS = require(libPath+'myJS.js');
const partialReactEmit = require(libPath+'partialReactEmit');
const spock = require(libPath+'spock.js');
//JSON
const {
    PREFIX,
    TOKEN
} = require('./config/Filia.json');
const filesPath = './files/';

const react2role = require(filesPath+'react2role.json');
var AssignRoleMessageID = react2role.white_or_black_id;



//Login
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login(TOKEN);
//Console.log
clientLog(client);

//Queue
const musicQueue = new Map();

//Raw
client.on('raw', event => {
    const eventName = event.t;
});

client.on('messageReactionAdd',async (messageReaction, user) => {
    if(user.bot) return;
    console.log("A reaction added!");
    if(messageReaction.partial) {
        console.log("messageReaction is partial");
        await partialReactEmit(messageReaction);
    }
});

client.on('messageReactionRemove',async (messageReaction, user) => {
    if(user.bot) return;
    console.log("A reaction removed!");
    if(messageReaction.partial) {
        console.log("messageReaction is partial");
        await partialReactEmit(messageReaction);
    }
});

//MemberAdd
client.on('guildMemberAdd', async member => {
    welcome(member);
    console.log("A member add!");
});

var test = new Array();

client.on('message', async message => {
    if(message.partial) {
        console.log('A message added. The message is partial.');
    }
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.react('🏳️');
            break;
        case 'pong':
            if(test[0]) console.log("true"); else console.log("false");
            break;
        case 'ck':
            console.log("-----checkpoint-----");
            break;
        case 'listeners':
            console.log(client.listeners('messageReactionAdd').toString());
            break;
        case 'mr':
            message.channel.messages.fetch(AssignRoleMessageID)
            .then(async message => {
                await message.react('🏳️');
                await message.react('🏴');
            })
            .catch(console.error);
            break;
        case 'mj':
            message.channel.send("A member join");
            memberjoin(client, message);
            break;
        case 'p':
        case 'play':
            musicManager.play(message, musicQueue);
            break;
        case 'skip':
            musicManager.skip(message, musicQueue);
            break;
        case 'stop':
            musicManager.stop(message, musicQueue);
            break;
        case 'queue':
            musicManager.queue(message, musicQueue);
            break;
        case 'pause':
            musicManager.pause(message, musicQueue);
            break;
        case 'resume':
            musicManager.resume(message, musicQueue);
            break;
        case 'volume':
            musicManager.volume(message, musicQueue);
            break;
        case 'np':
            musicManager.np(message, musicQueue);
            break;
        case 'rule34':
            booruManager.rule34(message);
            break;
        case 'ss':
        case 'sonicsays':
            sonicsays(message);
            break;
        case 'clear':
            if(!args[1]) return console.log("no args[1]");
            message.channel.bulkDelete(args[1]);
            break;
        case 'spock':
            spock(client, message);
            break;
    }
});


