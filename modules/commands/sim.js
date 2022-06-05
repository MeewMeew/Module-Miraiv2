/**
 * @author MeewMeew
 * @warn Do not edit code or edit credits
 * @apikey Reg key tại: https://meewmeew.info/site
 */

class MeewMeewModule {
  get config() {
    return {
      name: "sim",
      version: "4.3.9",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "Simsimi dành cho người có sở thích lạ =))",
      commandCategory: "General",
      usages: "[args]",
      cooldowns: 5,
      dependencies: {
        meewmeewapi: "latest"
      },
      envConfig: {
        APIKEY: ""
      },
      meewmeewConfig: {
        requiredApikey: true
      }
    }
  }

  async simsimi(message) {
    const MeewMeew = global.nodemodule["meewmeewapi"].default;
    const { APIKEY } = global.configModule.sim;
    const simsimi = new MeewMeew.Simsimi(APIKEY);
    const { error, msg } = await simsimi.chat(message);
    return error || msg;
  }

  async run({ api, event, args }) {
    this.onLoad();
    const { threadID, messageID } = event;
    var status = global.meewmeew.simsimi[threadID]
    if (args.length == 0) return api.sendMessage("Vui lòng nhập 1 tin nhắn cần chat cùng sim simi.", threadID, messageID);
    if (args[0] == "on") return api.sendMessage(status ? "Nhóm vẫn đang bật simsimi" : "Đã bật simsimi trong nhóm", threadID, () => status ? '' : global.meewmeew.simsimi[threadID] = messageID, messageID);
    else if (args[0] == "off") return api.sendMessage(!status ? "Nhóm vẫn đang tắt simsimi" : "Đã tắt simsimi trong nhóm", threadID, () => !status ? '' : delete global.meewmeew.simsimi[threadID], messageID);
    var result = await this.simsimi(args.join(" "));
    api.sendMessage(result, threadID, messageID);
  }

  async handleEvent({ api, event }) {
    if (!global.meewmeew.simsimi || !global.meewmeew.simsimi[event.threadID]) return;
    if (global.meewmeew.simsimi[event.threadID] == event.messageID) return;
    if (event.senderID == api.getCurrentUserID() || !event.body) return;
    var result = await this.simsimi(event.body);
    return api.sendMessage(result, event.threadID, event.messageID);
  }

  onLoad() {
    if (!global.meewmeew) global.meewmeew = {};
    if (!global.meewmeew.simsimi) global.meewmeew.simsimi = {};
    return true;
  }
}

module.exports = new MeewMeewModule();