/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
  get config() {
    return {
      name: "tiktok",
      version: "1.0.4",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "Get tiktok video without watermark",
      commandCategory: "media",
      usages: "[url]",
      cooldowns: 5,
      dependencies: {
        meewmeewapi: "latest",
        "fs-extra": ""
      },
      envConfig: {
        APIKEY: ""
      },
      meewmeewConfig: {
        requiredApikey: true
      }
    }
  }
  async run({ api, event, args }) {
    const { APIKEY } = global.configModule.tiktok;
    const MeewMeew = global.nodemodule["meewmeewapi"].default;
    const fs = global.nodemodule["fs-extra"];
    const tiktok = new MeewMeew.Tiktok(APIKEY);
    if (args.length == 0) return api.sendMessage("Cách dùng: tiktok [url]", event.threadID, event.messageID);
    var url = args[0];
    var { path, error } = await tiktok.video(url, __dirname + '/cache/tiktok.mp4');
    if (error) return api.sendMessage(error, event.threadID, event.messageID);
    return api.sendMessage({ attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
  }
}

module.exports = new MeewMeewModule();