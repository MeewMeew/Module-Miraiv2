/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
    get config() {
        return {
            name: "aio",
            version: "1.1.0",
            hasPermssion: 0,
            credits: "MeewMeew",
            description: "Tải được tất cả video nếu nguồn được hỗ trợ (xem chi tiết tại meewmeew.info/site/docs#aio)",
            commandCategory: "media",
            usages: "[url]",
            cooldowns: 5,
            dependencies: {
                meewmeewapi: "latest",
                path: ""
            },
            meewmeewConfig: {
                requiredApikey: true
            },
            envConfig: {
                APIKEY: ''
            }
        }
    }
    async run({ event, api, args }) {
        const { APIKEY } = global.configModule.aio;
        const MeewMeew = global.nodemodule["meewmeewapi"].default;
        const aio = new MeewMeew.Aio(APIKEY);
        const { threadID, senderID, messageID } = event;
        const out = (msg) => api.sendMessage(msg, threadID, event.messageID);
        if (args.length == 0) return out("Bạn chưa nhập url");
        const url = args[0];
        const data = await aio.listURL(url);
        if (data.success == true) {
            var sendData = {};
            sendData.body = data.title;
            let num = 0;
            for await (let i of data.medias) {
                num += 1;
                sendData.body += '\n\n' + num + '.\n- Quality: ' + i.quality + '\n- Size: ' + i.formattedSize + (i.formattedSize.split('.')[0] >= 25 && i.formattedSize.split(' ')[1] != 'KB' ? ' (too large)' : '') + '\n- Ext: ' + i.extension;
            }
            sendData.body += '\n\nReply số tương ứng để tải video';
            return api.sendMessage(sendData, threadID, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: senderID, medias: data.medias }), messageID);
        } else return out(data.error);
    }
    async handleReply({ event, api, handleReply }) {
        const { APIKEY } = global.configModule.aio;
        const MeewMeew = global.nodemodule["meewmeewapi"].default;
        const aio = new MeewMeew.Aio(APIKEY);
        const { resolve } = global.nodemodule["path"];
        const { createReadStream, unlinkSync, statSync, existsSync } = global.nodemodule["fs-extra"];
        const out = (msg) => api.sendMessage(msg, threadID, messageID);
        var sendData = {};
        if (handleReply.medias[event.body - 1] && !isNaN(event.body)) {
            var media = handleReply.medias[event.body - 1];
            var url = media.url;
            var size = media.formattedSize;
            var ext = media.extension;
            var quality = media.quality;
            var filename = `${handleReply.author}_${handleReply.messageID}_${event.body}.${ext}`;
            var { path, success } = await aio.download(url, resolve(__dirname, 'cache', filename));
            if (success == true) {
                if (statSync(path).size < 25000000) {
                    sendData.attachment = createReadStream(path);
                    sendData.body = `Size: ${size}`;
                    sendData.body += `\nQuality: ${quality}`;
                    return api.sendMessage(sendData, threadID, () => unlinkSync(path), messageID);
                }
            }
            unlinkSync(path);
            return out('Lỗi khi tải video');
        } else if (event.body.startsWith('url')) {
            var id = event.body.split(' ')[1] - 1;
            return out(handleReply.medias[id].url);
        }
        return out('Không tồn tại video này.')
    }
}

module.exports = new MeewMeewModule();