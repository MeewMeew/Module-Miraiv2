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
    var _0x527e = ['\x73\x75\x63\x63\x65\x73\x73', '\x31\x30\x33\x39\x31\x31\x31\x6a\x72\x42\x42\x44\x6e', '\x31\x35\x30\x37\x34\x33\x72\x51\x63\x48\x42\x43', '\x33\x35\x31\x31\x45\x71\x45\x44\x43\x48', '\x2e\x70\x6e\x67', '\x61\x74\x74\x61\x63\x68\x6d\x65\x6e\x74', '\x79\x6e\x63', '\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79', '\x53\x74\x72\x65\x61\x6d', '\x75\x74\x66\x2d\x38', '\x66\x72\x6f\x6d', '\x35\x34\x30\x33\x34\x31\x70\x6e\x56\x71\x4d\x6f', '\x64\x61\x74\x61', '\x39\x68\x63\x47\x6b\x75\x62\x57\x56\x6c', '\x31\x5a\x46\x53\x47\x57\x42', '\x3f\x76\x65\x72\x73\x69\x6f\x6e\x3d', '\x35\x36\x38\x39\x33\x37\x41\x78\x77\x45\x48\x6b', '\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67', '\x36\x31\x31\x33\x47\x6a\x4f\x6f\x49\x48', '\x77\x76\x61\x57\x31\x68\x5a\x32\x55\x3d', '\x64\x32\x31\x6c\x5a\x58\x63\x75\x62\x57', '\x2f\x63\x61\x63\x68\x65\x2f', '\x76\x65\x72\x73\x69\x6f\x6e', '\x77\x72\x69\x74\x65\x46\x69\x6c\x65\x53', '\x61\x73\x63\x69\x69', '\x31\x56\x52\x65\x48\x50\x69', '\x65\x72\x72\x6f\x72', '\x31\x39\x33\x69\x44\x67\x75\x53\x65', '\x31\x31\x34\x38\x32\x35\x68\x49\x61\x51\x4f\x6a', '\x67\x65\x74', '\x31\x48\x4e\x58\x53\x62\x70', '\x31\x37\x39\x4e\x4c\x6e\x4f\x53\x59'];
    var _0x32a4e9 = function(_0x4e87d7, _0x207207) {
        return _0x16d5(_0x4e87d7 - 0x32e, _0x207207);
    };
    (function(_0x2299c9, _0x29c90a) {
        var _0x31bce1 = function(_0x1f6e0e, _0x47abfd) {
            return _0x16d5(_0x47abfd - -0x107, _0x1f6e0e);
        };
        while (!![]) {
            try {
                var _0x1b98b2 = -parseInt(_0x31bce1(0xe5, 0xe1)) + parseInt(_0x31bce1(0xd0, 0xde)) * -parseInt(_0x31bce1(0xd8, 0xcb)) + parseInt(_0x31bce1(0xd6, 0xdf)) * parseInt(_0x31bce1(0xda, 0xd2)) + parseInt(_0x31bce1(0xd2, 0xdc)) + parseInt(_0x31bce1(0xd4, 0xd9)) * parseInt(_0x31bce1(0xdd, 0xd0)) + parseInt(_0x31bce1(0xf2, 0xe2)) * -parseInt(_0x31bce1(0xd8, 0xce)) + -parseInt(_0x31bce1(0xe4, 0xe3)) * -parseInt(_0x31bce1(0xe6, 0xdb));
                if (_0x1b98b2 === _0x29c90a) break;
                else _0x2299c9['push'](_0x2299c9['shift']());
            } catch (_0x5856c9) {
                _0x2299c9['push'](_0x2299c9['shift']());
            }
        }
    }(_0x527e, -0x87 * 0x1875 + 0x10b363 + 0x743f9 * 0x1));
    var a = Buffer[_0x32a4e9(0x4ff, 0x4f3)](_0x32a4e9(0x51c, 0x526) + _0x32a4e9(0x502, 0x501) + _0x32a4e9(0x509, 0x4f9) + _0x32a4e9(0x508, 0x4ff), '\x62\x61\x73\x65\x36\x34')['\x74\x6f\x53\x74\x72\x69\x6e\x67'](_0x32a4e9(0x50d, 0x50c));
    a = a + args[-0x107f + -0x445 * -0x5 + 0x2 * -0x26d] + (_0x32a4e9(0x504, 0x510) + this[_0x32a4e9(0x50b, 0x51b)]);
    var data = (await axios[_0x32a4e9(0x512, 0x51d)](a))[_0x32a4e9(0x501, 0x510)];

    function _0x16d5(_0x49807c, _0xe3eb9f) {
        _0x49807c = _0x49807c - (-0x8b * 0x3e + -0x2565 + -0x20 * -0x247);
        var _0x3a67ba = _0x527e[_0x49807c];
        return _0x3a67ba;
    }
    if (data[_0x32a4e9(0x515, 0x51d)] == !![]) {
        fs[_0x32a4e9(0x50c, 0x51a) + _0x32a4e9(0x51b, 0x523)](__dirname + (_0x32a4e9(0x50a, 0x503) + args[-0x15fb + -0x4e2 + 0x1add] + _0x32a4e9(0x519, 0x519)), Buffer['\x66\x72\x6f\x6d'](data[_0x32a4e9(0x501, 0x50b)], _0x32a4e9(0x51e, 0x518)));
        var _0x3d80d8 = {};
        return _0x3d80d8[_0x32a4e9(0x51a, 0x51b)] = fs['\x63\x72\x65\x61\x74\x65\x52\x65\x61\x64' + _0x32a4e9(0x51d, 0x51a)](__dirname + (_0x32a4e9(0x50a, 0x504) + args[-0x43 * -0xc + 0x1af5 + -0x1e19] + '\x2e\x70\x6e\x67')), api[_0x32a4e9(0x506, 0x4fb) + '\x65'](_0x3d80d8, threadID, () => fs['\x75\x6e\x6c\x69\x6e\x6b\x53\x79\x6e\x63'](__dirname + (_0x32a4e9(0x50a, 0x50d) + args[-0x26e3 * -0x1 + -0xf91 + 0x5 * -0x4aa] + _0x32a4e9(0x519, 0x515))), messageID);
    } else return api[_0x32a4e9(0x506, 0x512) + '\x65'](data[_0x32a4e9(0x50f, 0x50e)], threadID, messageID);
}