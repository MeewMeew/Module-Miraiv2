 module.exports.config = {
	name: "teach",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "MewMew",
	description: "Dạy bot (dùng cho lệnh sim)",
	commandCategory: "chatbot",
	usages: "teach in => out",
	cooldowns: 5,
	dependencies: ["axios"],
	info: [
		{
			key: 'In',
			prompt: 'Câu đầu vào',
			type: 'Văn Bản',
			example: 'Chào SpermLord'
		},
		{
			key: 'Out',
			prompt: 'Câu đầu ra',
			type: 'Văn Bản',
			example: 'Chào cái baise ta mère'
		}
	]
};

module.exports.run = async function({ api, event, args }) {
	let res = await require("axios")("https://simsimi.miraiproject.tk/teach", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: { teach: args.join(" ") }
	})
	let data = await res.data.success;
	return api.sendMessage(`${data}`, event.threadID, event.messageID)
}
