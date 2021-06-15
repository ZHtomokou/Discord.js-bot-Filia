function add(teamArray, messageReaction, user){
    if(user.bot) return;
    var emojiName = messageReaction.emoji.name;
    switch(emojiName){
        case '🏳️':
            if(!teamArray[0] && (teamArray[1] != user)){
                teamArray[0] = user;
                console.log("A member added white team");
            }else messageReaction.users.remove(user.id);
            break;
        case '🏴':
            if(!teamArray[1] && (teamArray[0] != user)){
                teamArray[1] = user;
                console.log("A member added black team");
            }else messageReaction.users.remove(user.id);
            break;
        default:
            messageReaction.users.remove(user.id);
    }
}

function remove(teamArray, messageReaction, user){
    if(user.bot) return;
    var emojiName = messageReaction.emoji.name;
    switch(emojiName){
        case '🏳️':
            if(teamArray[0] === undefined) return;
            teamArray[0] = undefined;
            console.log("A member left white team");
            break;
        case '🏴':
            if(teamArray[1] === undefined) return;
            teamArray[1] = undefined;
            console.log("A member left black team");
            break;
    }
}

module.exports.add = add;
module.exports.remove = remove;
