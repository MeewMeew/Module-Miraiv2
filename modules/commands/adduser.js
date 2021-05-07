module.exports.config = {
	name: "adduser",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thùy",
	description: "thêm người dùng vào nhóm bằng link hoặc uid",
	commandCategory: "group",
	usages: "adduser [args]",
	cooldowns: 5,
	info: [
		{
			key: 'uid',
			prompt: '',
			type: 'uid',
			example: '4'
		},
		{
			key: 'url',
			prompt: '',
			type: 'liên kết',
			example: 'https://www.facebook.com/zuck'
		}
	]
};

module.exports.run = async function({ api, event, args, client }) {
    const axios = require("axios");
    let { threadID, senderID, messageID } = event;
    const out = (msg) => api.sendMessage(msg, threadID, messageID);
    var threadInfo = client.threadInfo.get(threadID) || await api.getThreadInfo(threadID);
    var participantIDs = threadInfo.participantIDs.map(e => parseInt(e))
    var success = true;
    async function adduser(id, name) {
    	if (participantIDs.includes(id)) return out(`${name ? name : "Thành viên"} đã có mặt trong nhóm.`);
    	else {
	    	var admins = threadInfo.adminIDs.map(e => parseInt(e.id));
	        try {
	            await api.addUserToGroup(id, threadID);
	        } catch (e) {
	            success = false;
	            return out(e.errorSummary);
	        }
	        if (success) {
	            if (threadInfo.approvalMode == true && !admins.includes(api.getCurrentUserID())) return out(`Đã thêm ${name != null ? name : "thành viên"} vào nhóm, hãy yêu cầu quản trị viên phê duyệt !`);
	            else return out(`Đã thêm ${name != null ? name : "thành viên"} vào nhóm !`);        	
	        }
    	}
    }
    if (!args[0]) return out("Vui lòng nhập 1 link profile user cần add");
    if (!isNaN(args[0])) return adduser(args[0], null);
    else {
        var data = (await axios.get("https://api.meewmeew.ml/fbid?url=" + encodeURIComponent(args[0]))).data;
        if (data.success == false) {
            if (data.error == "invalid url") return out("url không hợp lệ");
            else return out(JSON.stringify(data.error));
        } else return adduser(data.data.id, data.data.name);
    }
}
