module.exports.config = {
    name: "linkword",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Chơi nối từ với bot hoặc thành viên trong nhóm",
    commandCategory: "game",
    usages: "linkword",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};
module.exports.event = async function({ api, event }) {
    if (!global.hasOwnProperty('procodermew')) return;
    if (!global.procodermew.hasOwnProperty('linkword')) global.procodermew.linkword = new Map();
    const axios = global.nodemodule["axios"];
    const { body: content, threadID, messageID } = event;
    if (global.procodermew.linkword.has(threadID)) {
        if (content && content.split(" ").length == 2) {
            var data = (await axios.get("https://simsimi.miraiproject.tk/api/linkword?ask=" + encodeURIComponent(content))).data;
            if (data.text == "You Lose!") {
                global.linkword.delete(threadID);
                return api.sendMessage(data.text, threadID, messageID);
            }
            else return api.sendMessage(data.text, threadID, messageID);
        }
    }
}
module.exports.run = function({ api, event }) {
    if (!global.hasOwnProperty('procodermew')) global.procodermew = {};
    if (!global.procodermew.hasOwnProperty('linkword')) global.procodermew.linkword = new Map();
    const { threadID, messageID } = event;
    if (!global.procodermew.linkword.has(threadID)) {
        global.procodermew.linkword.set(threadID);
        return api.sendMessage("Đã bật linkword", threadID, messageID);
    } else {
        global.procodermew.linkword.delete(threadID);
        return api.sendMessage("Đã tắt linkword", threadID, messageID);
    }
}