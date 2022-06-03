/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
	get config() {
		return {
			name: "teach",
			version: "2.0.8",
			hasPermssion: 0,
			credits: "MeewMeew",
			description: "Dạy bot (dùng cho lệnh sim)",
			commandCategory: "general",
			usages: "[câu hiện tại] -> [câu mong muốn]",
			cooldowns: 5,
			dependencies: {
				meewmeewapi: ""
			},
			envConfig: {
				APIKEY: ""
			}
		}
	}
	async run({ api, event, args }) {
		const { APIKEY } = global.configModule.teach;
		const MeewMeew = global.nodemodule["meewmeewapi"].default;
		const simsimi = new MeewMeew.Simsimi(APIKEY);
		var content = args.join(" ");
		var narrow = " -> ";
		var test = content.indexOf(narrow);
		if (test == -1) return api.sendMessage("Cách dùng: [câu hiện tại] -> [câu mong muốn]", event.threadID, event.messageID);
		content = content.split(narrow);
		var ask = content[0];
		var answer = content[1];
		if (ask == "" || answer == "") return api.sendMessage("Cách dùng: [câu hiện tại] -> [câu mong muốn]", event.threadID, event.messageID);
		var { error, msg } = await simsimi.teach(ask, answer);
		return api.sendMessage(error || msg, event.threadID, event.messageID);
	}
}

module.exports = new MeewMeewModule();