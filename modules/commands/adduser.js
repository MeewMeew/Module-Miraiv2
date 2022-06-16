/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
  get config() {
    return {
      name: "adduser",
      version: "2.4.5",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "Thêm người dùng vào nhóm bằng link hoặc id",
      commandCategory: "group",
      usages: "[args]",
      cooldowns: 5,
      envConfig: {
        APIKEY: ""
      },
      dependencies: {
        meewmeewapi: "latest"
      },
      meewmeewConfig: {
        requiredApikey: true
      }
    }
  }

  async run({ api, event, args }) {
    const MeewMeew = global.nodemodule["meewmeewapi"].default;
    const { APIKEY } = global.configModule.adduser;
    const facebook = new MeewMeew.Facebook(APIKEY);
    const { threadID, messageID } = event;
    const out = msg => api.sendMessage(msg, threadID, messageID);
    var { participantIDs, adminIDs } = await api.getThreadInfo(threadID);
    var participantIDs = participantIDs.map(e => parseInt(e));
    if (!args[0]) return out("Vui lòng nhập 1 id/link profile user cần add.");
    if (!isNaN(args[0])) return await this.adduser(args[0], undefined, adminIDs);
    try {
      var [id, name, fail] = await facebook.uid(args[0], api);
      if (fail == true && id != null) return out(id);
      else if (fail == true && id == null) return out("Không tìm thấy ID người dùng.")
      else {
        await this.adduser(id, name || "người dùng Facebook", adminIDs);
      }
    } catch (e) {
      return out(`${e.name}: ${e.message}.`);
    }
  }

  async adduser(id, name, adminIDs) {
    id = parseInt(id);
    if (participantIDs.includes(id)) return out(`${name ? name : "Thành viên"} đã có mặt trong nhóm.`);
    else {
      var admins = adminIDs.map(e => parseInt(e.id));
      try {
        await api.addUserToGroup(id, threadID);
      }
      catch {
        return out(`Không thể thêm ${name ? name : "người dùng"} vào nhóm.`);
      }
      if (approvalMode === true && !admins.includes(botID)) return out(`Đã thêm ${name ? name : "thành viên"} vào danh sách phê duyệt !`);
      else return out(`Đã thêm ${name ? name : "thành viên"} vào nhóm !`)
    }
  }
}

module.exports = new MeewMeewModule();