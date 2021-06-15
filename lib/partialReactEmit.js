
async function emit(messageReaction) {
    try {
        await messageReaction.fetch();
    } catch (error) {
        console.log('Something went wrong when fetching the message: ', error);
        return;
    }
}

module.exports = emit;
