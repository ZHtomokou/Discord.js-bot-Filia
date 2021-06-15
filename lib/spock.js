const Canvas = require('canvas');
const Discord = require('discord.js');
//
const getRandomInt = require('./getRandomInt.js');
const teamManager = require('./teamManager.js');
//
var easterEgg = false;
var spockMessage;
var teamArray = new Array();
var client;
var spock_ing = false;

function check(Client, message) {
    if(!spock_ing) {
        spock_ing = true;
        client = Client;
        initial(message);
    } else {
        message.channel.send("有正在進行的spock game");
    }
}

function initial(message) {
    var explain;
    if(getRandomInt(10) != 0) {
        explain = '請選擇隊伍，按下白旗加入白隊，按下黑旗加入黑隊';
    } else {
        explain = '請選擇隊伍，按下白旗加入白隊，按下黑旗成為刺客';
        easterEgg = true;
    }
    message.channel.send(explain)
    .then(async message => {
        await message.react('🏳️');
        await message.react('🏴');
        spockMessage = message;
        client.on('messageReactionAdd',addTeam);
        client.on('messageReactionRemove',removeTeam);
    })
}

const addTeam = (messageReaction, user) => {
    if(user.bot) return;
    if(messageReaction.message === spockMessage) {
        teamManager.add(teamArray, messageReaction, user);
    }
    if(teamArray[0]&&teamArray[1]) {
        client.off('messageReactionAdd',addTeam);
        client.off('messageReactionRemove',removeTeam);
        console.log("Spock starto!");
        versus(spockMessage.channel);
        spockMessage = undefined;
    }
}

const removeTeam = (messageReaction, user) => {
    if(user.bot) return;
    if(messageReaction.message === spockMessage) {
        teamManager.remove(teamArray, messageReaction, user);
    }
}

async function versus(channel) {
    const canvas = Canvas.createCanvas(920, 915);
    const ctx = canvas.getContext('2d');
    var bg;
    if(easterEgg) bg = './asset/ACBF.jpg'; else bg = './asset/spock-bg.jpg';
    const background = await Canvas.loadImage(bg);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //Draw player 1 avatar
    var r = 96, x = 120, y = 700;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.clip();
    const avatar_1 = await Canvas.loadImage(teamArray[0].displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
    ctx.drawImage(avatar_1, x - r, y - r, r * 2, r * 2);
    ctx.restore();
    //player 2
    x = 770, y = 700;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.clip();
    const avatar_2 = await Canvas.loadImage(teamArray[1].displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
    ctx.drawImage(avatar_2, x - r, y - r, r * 2, r * 2);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './asset/Spock-bg.png');
    channel.send(`スタート！`, attachment)
    .then(async message => {
        await message.react('✊');
        await message.react('🖐️');
        await message.react('✌️');
        await message.react('🖖');
        await message.react('🦎');
        spockMessage = message;
        client.on('messageReactionAdd',final);
    });
}

const final = (messageReaction, user) => {
    //teamArray[0] is white team. teamArray[1] is black team.
    //teamArray[1x] is teamArray[x]'s final hand
    if(user === teamArray[0]) {
        teamArray[10] = messageReaction;
    } else if (user === teamArray[1]) {
        teamArray[11] = messageReaction;
    }
    if(teamArray[10]&&teamArray[11]) {
        switch(teamArray[10].emoji.name){
            case '✊':
                switch(teamArray[11].emoji.name){
                    case '✊':
                        decisionOfSpock(spockMessage,1);
                        break;
                    case '🖐️':
                        decisionOfSpock(spockMessage,0);
                        break;
                    case '✌️':
                        decisionOfSpock(spockMessage,2);
                        break;
                    case '🖖':
                        decisionOfSpock(spockMessage,0);
                        break;
                    case '🦎':
                        decisionOfSpock(spockMessage,2);
                        break;
                }
                break;
            case '🖐️':
                switch(teamArray[11].emoji.name){
                    case '✊':
                        decisionOfSpock(spockMessage,2);
                        break;
                    case '🖐️':
                        decisionOfSpock(spockMessage,1);
                        break;
                    case '✌️':
                        decisionOfSpock(spockMessage,0);
                        break;
                    case '🖖':
                        decisionOfSpock(spockMessage,2);
                        break;
                    case '🦎':
                        decisionOfSpock(spockMessage,0);
                        break;
                }
                break;
            case '✌️':
                switch(teamArray[11].emoji.name){
                    case '✊':
                        decisionOfSpock(spockMessage,0);
                        break;
                    case '🖐️':
                        decisionOfSpock(spockMessage,2);
                        break;
                    case '✌️':
                        decisionOfSpock(spockMessage,1);
                        break;
                    case '🖖':
                        decisionOfSpock(spockMessage,0);
                        break;
                    case '🦎':
                        decisionOfSpock(spockMessage,2);
                        break;
                }
                break;
            case '🖖':
                switch(teamArray[11].emoji.name){
                    case '✊':
                        decisionOfSpock(spockMessage,2);
                        break;
                    case '🖐️':
                        decisionOfSpock(spockMessage,0);
                        break;
                    case '✌️':
                        decisionOfSpock(spockMessage,2);
                        break;
                    case '🖖':
                        decisionOfSpock(spockMessage,1);
                        break;
                    case '🦎':
                        decisionOfSpock(spockMessage,0);
                        break;
                }
                break;
            case '🦎':
                switch(teamArray[11].emoji.name){
                    case '✊':
                        decisionOfSpock(spockMessage,0);
                        break;
                    case '🖐️':
                        decisionOfSpock(spockMessage,2);
                        break;
                    case '✌️':
                        decisionOfSpock(spockMessage,0);
                        break;
                    case '🖖':
                        decisionOfSpock(spockMessage,2);
                        break;
                    case '🦎':
                        decisionOfSpock(spockMessage,1);
                        break;
                }
                break;
        }
        //
        teamArray = new Array();
    }
}

function decisionOfSpock(message, r) {
    if(r==0) {
        message.channel.send(`**${teamArray[1].username}** win !`);
    }else if(r==2){
        message.channel.send(`**${teamArray[0].username}** win !`);
    }else if(r==1){
        message.channel.send("**DRAW**");
    }
    spockMessage.delete();
    spockMessage = undefined;
    spock_ing = false;
    client.off('messageReactionAdd',final);
}

module.exports = check;
