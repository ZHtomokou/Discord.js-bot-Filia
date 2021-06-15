const Canvas = require('canvas');
const Discord = require('discord.js');

async function welcome(member) {
    member.send(`Welcome to **${member.guild.name}**,${member}!`);
    
    //Set a new canvas
    const canvas = Canvas.createCanvas(595, 324);
    //ctx will be used to modify a lot of the canvas
    const ctx = canvas.getContext('2d');

    //load image
    const background = await Canvas.loadImage('./asset/sonicSays.jpg');
    //Draw image
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //Select the color of the stroke
    ctx.strokeStyle = '#74037b';
    //Draw a rectangle
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    //Adding welcome celebrate
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Welcome to ${member.guild.name}`, 50, 100);

    //Adding member name
    //Select the font size and type
    ctx.font = '70px sans-serif';
    //Select the style
    ctx.fillStyle = '#ffffff';
    //Fill the text
    ctx.fillText(member.displayName, 50, 164);

    //Round the avatar
    ctx.beginPath();
    ctx.arc(82, 232, 32, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    //Load the avatar
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
    //Draw a shape onto the main canvas
    ctx.drawImage(avatar, 50, 200, 64, 64);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sonic-welcome-image.jpg');
    member.send(attachment);
}

module.exports = welcome;
