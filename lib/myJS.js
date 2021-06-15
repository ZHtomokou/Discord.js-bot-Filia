const Discord = require('discord.js');

const {
    PREFIX,
    TOKEN
} = require('../config/Alina.json');

var easteregg = 0;

function ce(client) {
    client.on('message',message=>JSA(message));
}

function cce(client) {
    client.on('message',JSC);
}

function pe(client) {
    console.log(client.listeners('message').toString());
}

function re(client) {
    client.removeListener('message',JSC);
}

module.exports.ce = cce;
module.exports.pe = pe;
module.exports.re = re;

function JSA(message) {
    console.log("A,"+message.content);
}

//error
function JSB(message) {
    message => {
        console.log("B,"+message.content);
    }
}

const spockreact = (messageReaction, user) => {
    console.log(messageReaction.message.content);
}

const spockreact_2 = (messageReaction, user) => {
    
}

const JSC = message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'bang':
            console.log("bang三小");
            break;
        case 'beng':
            const attachment = new Discord.MessageAttachment('./asset/sonicSays.jpg');
            message.channel.send(attachment);
            break;
        case 'bong':
            atc(message);
            break;
        case 'fight':
            message.client.on('messageReactionAdd',spockreact);
            break;
    }

}

function atc(message){
    /*
    const attachment = new Discord.MessageAttachment('./asset/sonicSays.jpg');
    message.channel.send(attachment);*/
    const welcome = require('../lib/myJS.js');
    console.log("BOOM");
}
