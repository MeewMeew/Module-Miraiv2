module.exports = function({ api }) {
    const react = "";
	return function({ event }) {
        const { senderID, reaction, messageID } = event;
        if (senderID == api.getCurrentUserID()) {
            if (react === "" || react === reaction) return api.unsendMessage(messageID);
        }
	};
};