/**
 * @author MeewMeew
 * @warn Do not edit code or edit credits
 */

class MeewMeewModule {
  get config() {
    return {
      name: "sortword",
      version: "1.1.4",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "S\u1EAFp x\u1EBFp l\u1EA1i 1 t\u1EEB ti\u1EBFng anh b\u1ECB x\xE1o tr\u1ED9n",
      commandCategory: "game-sp",
      usages: "",
      cooldowns: 5,
      dependencies: {
        meewmeewapi: ""
      },
      envConfig: {
        APIKEY: ""
      }
    }
  }

  onLoad() {
    if (!global.meewmeew) global.meewmeew = {};
    if (!global.meewmeew.sortword) global.meewmeew.sortword = {};
    return true;
  }

  async run({ api, event, args }) {
    this.onLoad();
    const { threadID, messageID } = event;
    const { APIKEY } = global.configModule.sortword;
    const MeewMeew = global.nodemodule["meewmeewapi"].default
    const word = new MeewMeew.Word(APIKEY)
    var level, time;
    if (args.length == 0 || args[0] == 'random') level = 'random', time = 10;
    else if (args[0] == 'easy') level = 'easy', time = 10;
    else if (args[0] == 'medium') level = 'medium', time = 20;
    else if (args[0] == 'hard') level = 'hard', time = 30;
    else if (args[0] == 'extreme') level = 'extreme', time = 40;
    else return api.sendMessage("Vui lòng nhập 1 cấp độ để sắp xếp", threadID, messageID);
    return api.sendMessage(`Bạn chọn độ khó là ${level}, thời gian trong vòng ${time} giây.`, threadID, async () => {
      await api.sendMessage("Chuẩn bị...", threadID)
      var { correct, random } = await word.sortWord(level);
      global.meewmeew.sortword[event.senderID] = {
        correct: correct,
        guildID: event.threadID,
      }
      await api.sendMessage(random.join(", "), threadID);
      await new Promise(resolve => setTimeout(resolve, time * 1000));
      if (!global.meewmeew.sortword[event.senderID]) return;
      delete global.meewmeew.sortword[event.senderID];
      return api.sendMessage(`Đã hết thời gian !!\nĐáp án đúng là: ${correct}`, threadID, messageID);
    }, messageID)
  }

  async handleEvent({ api, event }) {
    this.onLoad();
    if (!global.meewmeew.sortword[event.senderID]) return;
    const { correct, guildID } = global.meewmeew.sortword[event.senderID];
    if (guildID !== event.threadID) return;
    if (event.body == correct) api.sendMessage(`Chúc mừng bạn đã trả lời đúng !!`, event.threadID, event.messageID)
    else api.sendMessage(`Bạn đã trả lời sai !!\nĐáp án đúng là: ${correct}`, event.threadID, event.messageID)
    delete global.meewmeew.sortword[event.senderID];
    return;
  }
}

module.exports = new MeewMeewModule;