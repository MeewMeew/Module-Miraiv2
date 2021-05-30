module.exports.config = {
    name: "alime",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MewMew-recode",
    description: "alime sfw và cả alime nsfw :)",
    commandCategory: "random-img",
    usages: "alime tag",
    cooldowns: 5
};

module.exports.onLoad = async function () {
    const { existsSync, writeFileSync } = require("fs-extra");
    const axios = require('axios');
    const dir = __dirname + "/cache/alime.json";
    if (!existsSync(dir)) {
        const { data } = await axios.get('https://raw.githubusercontent.com/ProCoderMew/Module-Miraiv2/main/data/alime.json');
        writeFileSync(dir, JSON.stringify(data, null, 4));
    }
};

module.exports.run = async function ({ event, api, args }) {
    const { threadID, messageID } = event;
    const { writeFileSync, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
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
        var url = apiData.data.response.url;
        var ext = url.split(".")[url.split(".").length - 1];
        const { data } = await axios.get(url, { responseType: 'arraybuffer' });
        const dir = __dirname + `/cache/alime.${ext}`;
        writeFileSync(dir, Buffer.from(data, 'utf-8'));
        return out({ attachment: createReadStream(dir) }, () => unlinkSync(dir));
    }
};