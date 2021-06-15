function clientLog(client){
    client.once('ready', () => {
        console.log('Ready!');
        //Set activity
        client.user.setActivity('🐬', {type: 'WATCHING'}).catch(console.error);
    });
    client.once('reconnecting', () => {
        console.log('Reconnecting!');
    });
    client.once('disconnect', () => {
        console.log('Disconnect!');
    });
}

module.exports = clientLog;