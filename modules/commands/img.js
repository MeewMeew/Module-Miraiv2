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
        default:
            return utils.throwError("img", threadID, messageID);
            break;
    }
    
    var _0x3a05 = ['\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67', '\x34\x67\x6b\x79\x49\x49\x6c', '\x2e\x70\x6e\x67', '\x32\x33\x34\x33\x34\x31\x41\x74\x64\x4e\x6c\x4f', '\x32\x34\x33\x39\x30\x30\x39\x59\x57\x6b\x6f\x6d\x57', '\x64\x61\x74\x61', '\x31\x34\x35\x39\x35\x32\x53\x72\x6d\x46\x46\x63', '\x33\x34\x30\x32\x38\x31\x4b\x65\x64\x45\x75\x4e', '\x61\x73\x63\x69\x69', '\x33\x4f\x73\x4a\x70\x5a\x55', '\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79', '\x3f\x76\x65\x72\x73\x69\x6f\x6e\x3d', '\x31\x6e\x47\x70\x51\x4d\x68', '\x66\x72\x6f\x6d', '\x73\x75\x63\x63\x65\x73\x73', '\x64\x32\x31\x6c\x5a\x58\x63\x75\x62\x57', '\x39\x68\x63\x47\x6b\x75\x62\x57\x56\x6c', '\x63\x72\x65\x61\x74\x65\x52\x65\x61\x64', '\x6d\x65\x73\x73\x61\x67\x65', '\x39\x35\x31\x30\x30\x37\x68\x63\x4e\x51\x57\x48', '\x33\x30\x33\x37\x32\x35\x44\x4e\x56\x48\x47\x50', '\x2f\x63\x61\x63\x68\x65\x2f', '\x79\x6e\x63', '\x53\x74\x72\x65\x61\x6d', '\x37\x31\x30\x51\x4b\x66\x76\x46\x42', '\x31\x6b\x4e\x55\x46\x72\x75', '\x62\x61\x73\x65\x36\x34', '\x33\x69\x47\x71\x45\x42\x5a', '\x77\x72\x69\x74\x65\x46\x69\x6c\x65\x53', '\x61\x74\x74\x61\x63\x68\x6d\x65\x6e\x74', '\x67\x65\x74', '\x38\x39\x4b\x6a\x6d\x56\x71\x73', '\x76\x65\x72\x73\x69\x6f\x6e'];

    function _0x423b(_0x285b02, _0x88a7d) {
        _0x285b02 = _0x285b02 - (-0x5f0 * 0x4 + 0x1fea + -0x7b9);
        var _0x45662a = _0x3a05[_0x285b02];
        return _0x45662a;
    }
    var _0x153185 = function(_0xca6abb, _0x21e17d) {
        return _0x423b(_0xca6abb - 0x50, _0x21e17d);
    };
    (function(_0x4c4eed, _0x23a2c9) {
        var _0x80b919 = function(_0x352a96, _0x1c35ad) {
            return _0x423b(_0x352a96 - -0x187, _0x1c35ad);
        };
        while (!![]) {
            try {
                var _0x22b186 = parseInt(_0x80b919(-0x108, -0x107)) * -parseInt(_0x80b919(-0x101, -0x111)) + -parseInt(_0x80b919(-0x10e, -0x102)) * -parseInt(_0x80b919(-0x10b, -0x117)) + -parseInt(_0x80b919(-0x111, -0x10a)) * parseInt(_0x80b919(-0x113, -0x105)) + parseInt(_0x80b919(-0x116, -0x10c)) * parseInt(_0x80b919(-0xfc, -0x106)) + -parseInt(_0x80b919(-0xf9, -0x105)) * parseInt(_0x80b919(-0x100, -0x103)) + -parseInt(_0x80b919(-0x10d, -0x11b)) * -parseInt(_0x80b919(-0xfb, -0xfe)) + parseInt(_0x80b919(-0x110, -0x10e));
                if (_0x22b186 === _0x23a2c9) break;
                else _0x4c4eed['push'](_0x4c4eed['shift']());
            } catch (_0x5326cb) {
                _0x4c4eed['push'](_0x4c4eed['shift']());
            }
        }
    }(_0x3a05, 0x22d5 * 0x58 + 0x1664 * -0x4f + -0x26 * -0xf4f));
    var a = Buffer[_0x153185(0xd0, 0xc4)](_0x153185(0xcd, 0xcb) + _0x153185(0xd3, 0xd0) + _0x153185(0xd2, 0xda) + '\x77\x76\x61\x57\x31\x68\x5a\x32\x55\x76', _0x153185(0xdd, 0xda))['\x74\x6f\x53\x74\x72\x69\x6e\x67'](_0x153185(0xcb, 0xc2));
    a = a + type + _0x153185(0xce, 0xd9) + this[_0x153185(0xc2, 0xca)];
    try {
        var data = (await axios[_0x153185(0xe1, 0xd1)](a))[_0x153185(0xc8, 0xbe)];
        if (data[_0x153185(0xd1, 0xc1)] == !![]) {
            fs[_0x153185(0xdf, 0xe3) + _0x153185(0xd9, 0xce)](__dirname + _0x153185(0xd8, 0xe1) + type + _0x153185(0xc5, 0xca), Buffer[_0x153185(0xd0, 0xc5)](data['\x64\x61\x74\x61'], '\x75\x74\x66\x2d\x38'));
            var _0xcca1c0 = {};
            return _0xcca1c0[_0x153185(0xe0, 0xda)] = fs[_0x153185(0xd4, 0xd1) + _0x153185(0xda, 0xcb)](__dirname + '\x2f\x63\x61\x63\x68\x65\x2f' + type + _0x153185(0xc5, 0xbc)), api[_0x153185(0xc3, 0xbd) + '\x65'](_0xcca1c0, threadID, () => fs['\x75\x6e\x6c\x69\x6e\x6b\x53\x79\x6e\x63'](__dirname + _0x153185(0xd8, 0xdb) + type + _0x153185(0xc5, 0xba)), messageID);
        } else return api[_0x153185(0xc3, 0xc4) + '\x65'](data['\x65\x72\x72\x6f\x72'], threadID, messageID);
    } catch (_0x2e1c4f) {
        return api['\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67' + '\x65'](_0x2e1c4f[_0x153185(0xd5, 0xd0)], threadID, messageID);
    }
}
