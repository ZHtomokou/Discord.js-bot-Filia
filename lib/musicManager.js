const Inspect = require('./Inspect.js');
const ytdl = require('ytdl-core');

async function play(message, musicQueue) {
    console.log("Ready play music");
    const URL = message.content.split(" ")[1];
    const serverQueue = musicQueue.get(message.guild.id);
    const voiceChannel = message.member.voice.channel;
    //Check
    if(!voiceChannel) return message.channel.send('Please enter a voice channel');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send('Error! Please check permissions');
    }
    
    //Song info
    const songInfo = await ytdl.getInfo(URL);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };
    if(!serverQueue) {
        const queueConstrut = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 3,
            playing: true,
        };

        //Push
        musicQueue.set(message.guild.id, queueConstrut);
        queueConstrut.songs.push(song);
        message.channel.send(`${song.title} now playing!`);

        try {
            var connection = await voiceChannel.join();
            queueConstrut.connection = connection;
            execute(message.guild, queueConstrut.songs[0], musicQueue);
        }catch(err) {
            musicQueue.delete(message.guild.id);
            console.log(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} has been added to the queue!`);
    }
}

function execute(guild, song, musicQueue) {
    const serverQueue = musicQueue.get(guild.id);
    if(!song) {
        serverQueue.voiceChannel.leave();
        musicQueue.delete(guild.id);
        return;
    }
    
    const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('end', () => {
        console.log('Music ended!');
        serverQueue.songs.shift();
        execute(guild, serverQueue.songs[0], musicQueue);
    })
    .on('error', error => {
        console.log(error);
    });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

function skip(message, musicQueue) {
    if(!message.member.voice.channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const serverQueue = musicQueue.get(message.guild.id);
    if(!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
    serverQueue.connection.dispatcher.end();
}

function stop(message, musicQueue) {
    if(!message.member.voice.channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const serverQueue = musicQueue.get(message.guild.id);
    if(!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end('Stop command has been used!');
}

function pause(message, musicQueue) {
    const serverQueue = musicQueue.get(message.guild.id);
    if(serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('⏸ Paused the music for you!');
    }
    return message.channel.send('There is nothing playing.');
}

function resume(message, musicQueue) {
    const serverQueue = musicQueue.get(message.guild.id);
    if(serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send('▶ Resumed the music for you!');
    }
    return message.channel.send('There is nothing playing.');
}

function queue(message, musicQueue) {
    const serverQueue = musicQueue.get(message.guild.id);
    if(!serverQueue) return message.channel.send('There is nothing playing');

    return message.channel.send(`
__**Song queue:**__
	
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
	
**Now playing:** ${serverQueue.songs[0].title}
		`);
}

function volume(message, musicQueue) {
    const { voiceChannel } = message.member
    if(!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const serverQueue = musicQueue.get(message.guild.id);
    if(!serverQueue) return message.channel.send('There is nothing playing.');

    const args = message.content.split(" ")[1];
    if(!args) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    serverQueue.volume = args;
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args / 5);
    return message.channel.send(`I set the volume to: **${args[0]}**`);
}

function np(message, musicQueue) {
    const serverQueue = musicQueue.get(message.guild.id);
    if(!serverQueue) return message.channel.send('There is nothing playing.');
    return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
}

module.exports.play = play;
module.exports.skip = skip;
module.exports.stop = stop;
module.exports.pause = pause;
module.exports.resume = resume;
module.exports.queue = queue;
module.exports.volume = volume;
module.exports.np = np;
