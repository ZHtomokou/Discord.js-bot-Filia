function memberjoin(client, message){
    client.emit('guildMemberAdd', message.member);
}

module.exports = memberjoin;