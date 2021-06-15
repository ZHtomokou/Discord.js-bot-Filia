const inspect = require('./Inspect.js');

function add(client, event){
    var reactionChannel = client.channels.cache.get(event.d.channel_id);
    
    if(reactionChannel.messages.cache.get(event.d.message_id)){
        return;
    }else{
        reactionChannel.messages.fetch(event.d.message_id)
        .then(msg => {
            var msgReaction;
            if(event.d.emoji.id){
                msgReaction = msg.reactions.cache.get(event.d.emoji.id);
            }else{
                msgReaction = msg.reactions.cache.get(event.d.emoji.name);
            }
            var user = client.users.cache.get(event.d.user_id);
            client.emit('messageReactionAdd', msgReaction, user);
        })
        .catch(console.error);
    }
}

function remove(client, event) {
    var reactionChannel = client.channels.cache.get(event.d.channel_id);

    if(reactionChannel.messages.cache.get(event.d.message_id)) {
        return;
    }else{
        reactionChannel.messages.fetch(event.d.message_id)
        .then(msg => {
            var msgReaction;
            if(event.d.emoji.id) {
                msgReaction = msg.reactions.cache.get(event.d.emoji.id);
            }else{
                msgReaction = msg.reactions.cache.get(event.d.emoji.name);
            }
            var user = client.users.cache.get(event.d.user_id);
            client.emit('messageReactionRemove', msgReaction, user);
        })
        .catch(console.error);
    }
}

module.exports.add = add;
module.exports.remove = remove;
