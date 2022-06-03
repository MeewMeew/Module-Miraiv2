/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
    get config() {
        return {
            name: "slap",
            version: "2.2.8",
            hasPermssion: 0,
            credits: "MeewMeew",
            description: "",
            commandCategory: "general",
            usages: "[@tag]",
            cooldowns: 5,
            dependencies: {
                meewmeewapi: "",
                "fs-extra": "",
                "path": "",
                "jimp": ""
            },
            envConfig: {
                APIKEY: ""
            }
        }
    }

    async onLoad() {
        const { resolve } = global.nodemodule["path"];
        const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
        const { downloadFile } = global.utils;
        const dirMaterial = resolve(__dirname, 'cache', 'canvas');
        const background = resolve(dirMaterial, 'slap.png');
        if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
        if (!existsSync(background)) await downloadFile("https://raw.githubusercontent.com/MeewMeew/Module-Miraiv2/Mew/data/slap.png", background);
    }

    async makeImage({ one, two }) {
        const MeewMeew = global.nodemodule["meewmeewapi"].default;
        const { APIKEY } = global.configModule.hitbutt;
        const facebook = new MeewMeew.Facebook(APIKEY);
        const fs = global.nodemodule["fs-extra"];
        const path = global.nodemodule["path"];
        const jimp = global.nodemodule["jimp"];
        const __root = path.resolve(__dirname, "cache", "canvas");

        let slap_img = await jimp.read(__root + "/slap.png");
        let pathImg = __root + `/slap_${one}_${two}.png`;

        try {
            var avatarOne = await facebook.avatar(one);
            var avatarTwo = await facebook.avatar(two);
            var circleOne = await jimp.read(await this.circle(Buffer.from(avatarOne, 'utf-8')));
            var circleTwo = await jimp.read(await this.circle(Buffer.from(avatarTwo, 'utf-8')));
        } catch (error) {
            console.log(error);
            let raw = await slap_img.getBufferAsync("image/png");
            fs.writeFileSync(pathImg, raw);
            return pathImg;
        }
        slap_img.composite(circleOne.resize(150, 150), 745, 25).composite(circleTwo.resize(140, 140), 180, 40);

        let raw = await slap_img.getBufferAsync("image/png");
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
            return this.makeImage({ one, two }).then(path => api.sendMessage({ body: "Toang alo nè ", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
        }
    }
}

module.exports = new MeewMeewModule();