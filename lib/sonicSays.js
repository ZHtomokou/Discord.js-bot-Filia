const Discord = require('discord.js');
const Canvas = require('canvas');

async function sonicSays(message) {
    let args = message.content.split(" ");
    if(args[1] == undefined) {
        return message.channel.send("Please enter content.");
    } else {
        args.shift();
        args = JSON.stringify(args);
        args = args.replace(/,/g, " ").replace(/"/g, "");
        args = args.substring(1, args.length - 1);
    }

    const canvas = Canvas.createCanvas(595, 324);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('./asset/sonicSays.jpg');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#74037b';
    ctx.stroke(0, 0, canvas.width, canvas.height);
    ctx.font = '70px sans-serif'
    ctx.fillStyle = '#ffffff';
    ctx.fillText(args, canvas.width / 10, canvas.height / 1.8);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sonicSays.jpg');
    message.channel.send(attachment);
}

module.exports = sonicSays;
