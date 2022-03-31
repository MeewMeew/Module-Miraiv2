/**
* @author MeewMeew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
	name: "teach",
	version: "2.0.7",
	hasPermssion: 0,
	credits: "MeewMeew",
	description: "Dạy bot (dùng cho lệnh sim)",
	commandCategory: "general",
	usages: "hello => goodbye",
	cooldowns: 5,
	dependencies: {
		"axios": ""
	},
    envConfig: {
        APIKEY: ""
    }
};

module.exports.run = async function({ api, event, args }) {
	const { APIKEY } = global.configModule.teach;
	const axios = global.nodemodule["axios"];
	const { data } = await axios("https://meewmeew.info/simsimi/teach?apikey=" + APIKEY, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: { teach: args.join(" ") }
	});
	if (data.success == false) return api.sendMessage(`${data.error}`, event.threadID, event.messageID);
	return api.sendMessage(`${data.msg}`, event.threadID, event.messageID);
}
