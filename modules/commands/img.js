module.exports.config = {
    name: "img",
    version: "2.0.1",
    hasPermssion: 0,
    credits: "MewMew",
    description: "Kho Ảnh",
    commandCategory: "General",
    usages: "img [args]",
    cooldowns: 5,
    info: [
        {
            key: "boy/trai",
            prompt: "Ảnh trai đẹp",
            type: 'Ảnh',
            example: 'img boy'
        }, 
        {
            key: "girl/gái",
            prompt: "Ảnh gái xinh",
            type: 'Ảnh',
            example: 'img girl'
        }, 
        {
            key: "cosplay",
            prompt: "Ảnh cosplay",
            type: 'Ảnh',
            example: 'img cosplay'
        }
    ]
};

module.exports.run = async function({ api, event, args, utils }) {
    var fs = require("fs-extra");
    var axios = require("axios");
    var { threadID, messageID } = event;
    var type;
    switch (args[0]) {
        case "boy":
        case "trai":
            type = "boy";
        break;
        case "girl":
        case "gái":
            type = "girl";
        break;
        case "cosplay":
            type = "cosplay";
        break;
        case "meow":
        	type = "meow";
        break;
        case "dog":
            type = "dog";
        break;        
        default:
            return utils.throwError("img", threadID, messageID);
        break;
    }
    
    var data = (await axios.get(`https://api.meewmeew.ml/image/${type}?version=${this.config.version}`)).data;
    if (data.success == false) return api.api.sendMessage(data.error, threadID, messageID);
    else {
        fs.writeFileSync(__dirname + `/cache/${type}.png`, Buffer.from(data.data, 'utf-8'));
        return api.sendMessage({ attachment: fs.createReadStream(__dirname + `/cache/${type}.png`) }, threadID, () => fs.unlinkSync(__dirname + `/cache/${type}.png`), messageID);       
    }
}
