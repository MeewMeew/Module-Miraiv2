/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
  get config() {
    return {
      name: "img",
      version: "3.1.5",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "Kho Ảnh",
      commandCategory: "nsfw",
      usages: "[boy/girl/cosplay/sexy/wibu/meow/dog]",
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

  async run({ api, event, args }) {
    const MeewMeew = global.nodemodule["meewmeewapi"].default;
    const { APIKEY } = global.configModule.img;
    const image = new MeewMeew.Image(APIKEY);
    const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
    const { threadID, messageID } = event;
    var type;
    switch (args[0]) {
      case "boy": case "trai": type = "boy"; break;
      case "girl": case "gái": type = "girl"; break;
      case "cosplay": type = "cosplay"; break;
      case "sexy": type = "sexy"; break;
      case "wibu": type = "wibu"; break;
      case "meow": type = "meow"; break;
      case "dog": case "chó": type = "dog"; break;
      default: return global.utils.throwError(this.config.name, threadID, messageID);
    }
    const path = __dirname + `/cache/${type}.png`;
    try {
      var { path: imagePath } = await image.random(type, path);
      return api.sendMessage({ attachment: createReadStream(imagePath) }, threadID, () => unlinkSync(path), messageID);
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MeewMeewModule();