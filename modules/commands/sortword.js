/**
 * @author MeewMeew
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "sortword",
    version: "1.1.3",
    hasPermssion: 0,
    credits: "MeewMeew",
    description: "S\u1EAFp x\u1EBFp l\u1EA1i 1 t\u1EEB ti\u1EBFng anh b\u1ECB x\xE1o tr\u1ED9n",
    commandCategory: "game-sp",
    usages: "",
    cooldowns: 5,
    dependencies: {
        axios: ""
    },
    envConfig: {
        APIKEY: ""
    }
}
module.exports.onLoad = function() {
    "undefined" == typeof global.meewmeew && (global.meewmeew = {}), "undefined" == typeof global.meewmeew.sortword && (global.meewmeew.sortword = [])
}
module.exports.handleEvent = function({ api: a, event: b }) {
    if ("undefined" == typeof global.meewmeew.sortword) return;
    const { threadID: c, body: d, senderID: f, messageID: e } = b;
    if (global.meewmeew.sortword.some((a) => a.user == f)) {
        var g = global.meewmeew.sortword.find((a) => a.user == f),
            h = global.meewmeew.sortword.findIndex((a) => a.user == f);
        if (g.user == f && g.thread == c && d.toLowerCase() == g.correct.toLowerCase()) return a.sendMessage("B\u1EA1n \u0111\xE3 s\u1EAFp x\u1EBFp ch\xEDnh x\xE1c.", c, () => {
            global.meewmeew.sortword.splice(h, 1)
        }, e);
        if (g.user == f && g.thread == c && d.toLowerCase() != g.correct.toLowerCase()) return a.sendMessage("B\u1EA1n s\u1EAFp x\u1EBFp sai r\u1ED3i!\n\u0110\xE1p \xE1n \u0111\xFAng l\xE0: " + g.correct, c, () => {
            global.meewmeew.sortword.splice(h, 1)
        }, e)
    }
}
module.exports.run = async function({ api: a, event: b, args: c }) {
    const { APIKEY } = global.configModule.sortword;
    "undefined" == !typeof global.meewmeew.sortword && (global.meewmeew.sortword = []);
    const d = global.nodemodule.axios, { threadID: e, senderID: f, messageID: g } = b;
    var h, i;
    switch (c[0]) {
        case "easy":
            h = "easy", i = 10;
            break;
        case "medium":
            h = "medium", i = 15;
            break;
        case "hard":
            h = "hard", i = 20;
            break;
        case "extreme":
            h = "extreme", i = 25;
            break;
        default:
            h = "random", i = 10;
    }
    var { data: j } = await d.get("https://meewmeew.info/word/rw?level=" + h + "&apikey=" + APIKEY);
    a.sendMessage(`Bạn đã chọn level ${h} với thời gian ${i}s.`, e, async () => {
        return a.sendMessage("Chu\u1EA9n b\u1ECB.", e),
        await new Promise((a) => setTimeout(a, 2e3)),
        a.sendMessage(j.random.join(", "), e, async () => {
            if (global.meewmeew.sortword.push({ user: f, thread: e, correct: j.correct }),
                await new Promise((a) => setTimeout(a, 1e3 * i)),
                global.meewmeew.sortword.some((a) => a.user == f)) {
                var b = global.meewmeew.sortword.findIndex((a) => a.user == f);
                a.sendMessage("\u0110\xE3 h\u1EBFt th\u1EDDi gian quy \u0111\u1ECBnh!", e, () => global.meewmeew.sortword.splice(b, 1), g)
            }
        })
    }, g)
};