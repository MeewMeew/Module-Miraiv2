module.exports.config = {
    name: "alime",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "alime sfw và cả alime nsfw :)",
    commandCategory: "random-img",
    usages: "tag",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": ""
    }
};

module.exports.onLoad = async function () {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, readFileSync } = global.nodemodule["fs-extra"];

    const path = resolve(__dirname, 'cache', 'alime.json');
    const url = "https://raw.githubusercontent.com/ProCoderMew/Module-Miraiv2/main/data/alime.json";

    try {
        if (!existsSync(path)) await global.client.utils.downloadFile(url, path);
        const data = JSON.parse(readFileSync(path));
        if (data.length == 0) await global.client.utils.downloadFile(url, path);
        return;
    } catch { await global.client.utils.downloadFile(url, path) };
};

module.exports.run = async function ({ event, api, args }) {
    const { writeFileSync, createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const { threadID, messageID } = event;

    const out = (msg, callback = function () { }) => api.sendMessage(msg, threadID, callback, messageID);    
    const { sfw, nsfw } = require("./cache/alime.json");
    var apiUrl;

    if (!sfw.hasOwnProperty(args[0]) && !nsfw.hasOwnProperty(args[0])) {
        var nsfwData = Object.keys(nsfw).join(", ");
        var sfwData = Object.keys(sfw).join(", ");
        return out("=== Sfw Tag ===\n" + sfwData + "\n\n=== Nsfw Tag ===\n" + nsfwData);
    } else {
        if (sfw.hasOwnProperty(args[0])) apiUrl = sfw[args[0]];
        else if (nsfw.hasOwnProperty(args[0])) apiUrl = nsfw[args[0]];
        const { data: apiData } = await axios.get(apiUrl);
        const url = apiData.data.response.url;
        const ext = url.split(".")[url.split(".").length - 1];
        const path = resolve(__dirname, 'cache', `${threadID}_${senderID}.${ext}`);
        
        await global.client.utils.downloadFile(url, path);

        return out({
            attachment: createReadStream(path)
        },  function () { return unlinkSync(path) });        
    }
};