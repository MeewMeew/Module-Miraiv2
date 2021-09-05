/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "reactToRemoveMsg",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Gỡ tin nhắn bằng cách thả cảm được chỉ định hoặc bất kỳ.",
    commandCategory: "other",
    usages: "",
    cooldowns: 5,
    envConfig: {
        react: ""
    }
};

module.exports.handleEvent = function ({ api, event }) {
    try {
        const { senderID, type, reaction, messageID } = event;
        const { react } = global.configModule.reactToRemoveMsg;
        if (type === "message_reaction" && senderID == api.getCurrentUserID()) {
            if (reaction && (react === "" || react === reaction)) return api.unsendMessage(messageID);
        }
        return;        
    } catch (e) {
        console.log(e)
    }
}
module.exports.run = () => !0;