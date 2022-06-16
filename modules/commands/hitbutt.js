/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
  get config() {
    return {
      name: "hitbutt",
      version: "2.2.10",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "",
      commandCategory: "general",
      usages: "[@tag]",
      cooldowns: 5,
      dependencies: {
        meewmeewapi: "latest",
        "fs-extra": "",
        "path": "",
        "jimp": ""
      },
      envConfig: {
        APIKEY: ""
      },
      meewmeewConfig: {
        requiredApikey: true
      }
    }
  }

  async onLoad() {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = resolve(__dirname, 'cache', 'canvas');
    const background = resolve(dirMaterial, 'hit_butt.png');
    if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(background)) await downloadFile("https://raw.githubusercontent.com/MeewMeew/Module-Miraiv2/Mew/data/hitbutt.png", background);
  }

  async makeImage({ one, two }) {
    const MeewMeew = global.nodemodule["meewmeewapi"].default;
    const { APIKEY } = global.configModule.hitbutt;
    const facebook = new MeewMeew.Facebook(APIKEY);
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let hit_butt_img = await jimp.read(__root + "/hit_butt.png");
    let pathImg = __root + `/hit_butt_${one}_${two}.png`;

    try {
      var avatarOne = await facebook.avatar(one);
      var avatarTwo = await facebook.avatar(two);
      var circleOne = await jimp.read(await this.circle(Buffer.from(avatarOne.data, 'utf-8')));
      var circleTwo = await jimp.read(await this.circle(Buffer.from(avatarTwo.data, 'utf-8')));
    } catch (error) {
      console.log(error);
      let raw = await hit_butt_img.getBufferAsync("image/png");
      fs.writeFileSync(pathImg, raw);
      return pathImg;
    }
    hit_butt_img.resize(500, 500).composite(circleOne.resize(130, 130), 225, 5).composite(circleTwo.resize(120, 120), 352, 220);

    let raw = await hit_butt_img.getBufferAsync("image/png");
    fs.writeFileSync(pathImg, raw);
    return pathImg;
  }

  async circle(image) {
    const jimp = global.nodemodule["jimp"];
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
  }

  async run({ event, api }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    if (!mention[0]) return api.sendMessage("Vui lòng tag 1 người.", threadID, messageID);
    else {
      const one = senderID, two = mention[0];
      return this.makeImage({ one, two }).then(path => api.sendMessage({ body: "Hư nè.. ", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
  }
}

module.exports = new MeewMeewModule();