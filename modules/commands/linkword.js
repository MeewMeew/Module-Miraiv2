/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
  get config() {
    return {
      name: "linkword",
      version: "2.0.11",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "Chơi nối từ với bot hoặc thành viên trong nhóm",
      commandCategory: "game",
      usages: "[en/vi]",
      cooldowns: 5,
      dependencies: {
        meewmeewapi: "*"
      },
      envConfig: {
        APIKEY: ""
      }
    }
  }

  maxWord(lang) {
    if (lang == "en") return 1;
    else if (lang == "vi") return 2;
  }

  validWord(words, lang) {
    if (lang == "vi") return words.slice(2).join();
    else return words[0];
  }

  onLoad() {
    if (!global.MeewMeew) global.MeewMeew = new Object();
    if (!global.MeewMeew.linkword) global.MeewMeew.linkword = new Map();
  }

  async handleEvent({ api, event }) {
    if (!global.MeewMeew.linkword) return;
    const MeewMeew = global.nodemodule["meewmeewapi"].default;
    const { APIKEY } = global.configModule.linkword;
    const word = new MeewMeew.Word(APIKEY);
    const { body: content, threadID, messageID, senderID } = event;
    if (senderID == api.getCurrentUserID()) return;
    if (global.MeewMeew.linkword.has(threadID)) {
      var lang = global.MeewMeew.linkword.get(threadID);
      var maxWord = this.maxWord(lang);
      var words = content.split(/\s+/g);
      if (words.length == maxWord) {
        var result = await word.linkWord(this.validWord(words, lang), lang);
        if (result.data == "Bạn đã thua!" || result.error == "Từ của bạn sử dụng không tồn tại") {
          global.MeewMeew.linkword.delete(threadID);
          return api.sendMessage("Bạn đã thua tôi, đồ con gà xD", threadID, messageID);
        }
        if (result.error) return api.sendMessage(result.error, threadID, messageID);
        return api.sendMessage(result.data, threadID, messageID);
      }
    }
  }

  run({ api, event, args }) {
    const { threadID, messageID } = event;
    const lang = args[0] || "vi";
    if (lang == "en" || lang == "vi") {
      if (!global.MeewMeew.linkword.has(threadID)) {
        global.MeewMeew.linkword.set(threadID, lang);
        return api.sendMessage(`Đã bật linkword (${lang})`, threadID, messageID);
      } else {
        global.MeewMeew.linkword.delete(threadID);
        return api.sendMessage("Đã tắt linkword", threadID, messageID);
      }
    } else return global.utils.throwError(this.config.name, threadID, messageID);
  }
}

module.exports = new MeewMeewModule();