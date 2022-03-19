/**
 * @author MeewMeew
 * @warn Do not edit code or edit credits
 * @apikey Reg key tại: https://meewmeew.info/site
 */
module.exports.config = {
    name: "sim",
    version: "4.3.8",
    hasPermssion: 0,
    credits: "MeewMeew",
    description: "Chat c\xF9ng con sim m\u1EA5t d\u1EA1y nh\u1EA5t",
    commandCategory: "General",
    usages: "[args]",
    cooldowns: 5,
    dependencies: {
        axios: ""
    },
    envConfig: {
        APIKEY: ""
    }
}


module.exports.simsimi = function (ask) {
    return new Promise(async resolve => {
        const axios = require('axios');
        const {APIKEY} = global.configModule.sim;
        try {
            const { data } = await axios.get(`https://meewmeew.info/simsimi/api?ask=${encodeURIComponent(ask)}&apikey=${APIKEY}`);
            resolve({ data, error: false });
        } catch {
            resolve({ data: null, error: true });
        }
    });
}
module.exports.onLoad = () => ("undefined" == typeof global.meewmeew && (global.meewmeew = {}), "undefined" == typeof global.meewmeew.simsimi && (global.meewmeew.simsimi = new Map));
module.exports.handleEvent = async function ({ api: b, event: a }) {
    const { threadID: c, messageID: d, senderID: e, body: f } = a, g = (e) => b.sendMessage(e, c, d);
    if (global.meewmeew.simsimi.has(c)) {
        if (e == b.getCurrentUserID() || "" == f || d == global.meewmeew.simsimi.get(c)) return;
        var { data: h, error: i } = await this.simsimi(f);
        return !0 == i ? void 0 : !1 == h.success ? g(h.error) : g(h.msg)
    }
}
module.exports.run = async function ({ api: b, event: a, args: c }) {
    const { threadID: d, messageID: e } = a, f = (c) => b.sendMessage(c, d, e);
    if (0 == c.length) return f("B\u1EA1n ch\u01B0a nh\u1EADp tin nh\u1EAFn");
    switch (c[0]) {
        case "on":
            return global.meewmeew.simsimi.has(d) ? f("B\u1EA1n ch\u01B0a t\u1EAFt sim.") : (global.meewmeew.simsimi.set(d, e), f("\u0110\xE3 b\u1EADt sim th\xE0nh c\xF4ng."));
        case "off":
            return global.meewmeew.simsimi.has(d) ? (global.meewmeew.simsimi.delete(d), f("\u0110\xE3 t\u1EAFt sim th\xE0nh c\xF4ng.")) : f("B\u1EA1n ch\u01B0a b\u1EADt sim.");
        default:
            var { data: g, error: h } = await this.simsimi(c.join(" "));
            return !0 == h ? void 0 : !1 == g.success ? f(g.error) : f(g.msg);
    }
};
