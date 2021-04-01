module.exports.config = {
	name: "img",
	version: "2.0.0",
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

module.exports.run = async function ({ api, event, args, utils }) {
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
	var _0xf0ee=['\x31\x33\x36\x39\x38\x39\x52\x61\x4e\x42\x67\x56','\x75\x6e\x6c\x69\x6e\x6b\x53\x79\x6e\x63','\x77\x72\x69\x74\x65\x46\x69\x6c\x65\x53\x79\x6e\x63','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x31\x33\x34\x37\x34\x37\x38\x75\x73\x63\x6e\x79\x43','\x64\x61\x74\x61','\x31\x37\x77\x47\x67\x6c\x58\x57','\x31\x6c\x74\x50\x59\x43\x6b','\x32\x7a\x73\x65\x79\x6a\x62','\x75\x74\x66\x2d\x38','\x37\x31\x34\x34\x64\x42\x4f\x71\x67\x56','\x73\x74\x72\x69\x6e\x67','\x61\x73\x63\x69\x69','\x34\x6a\x48\x52\x58\x42\x41','\x63\x72\x65\x61\x74\x65\x52\x65\x61\x64\x53\x74\x72\x65\x61\x6d','\x66\x72\x6f\x6d','\x32\x35\x33\x34\x31\x32\x70\x55\x6b\x42\x78\x64','\x2f\x63\x61\x63\x68\x65\x2f','\x67\x65\x74','\x2e\x70\x6e\x67','\x37\x33\x67\x6a\x77\x59\x6a\x42','\x37\x38\x37\x32\x31\x6f\x78\x61\x57\x4e\x77','\x31\x31\x38\x37\x34\x33\x38\x4c\x75\x42\x6b\x51\x63','\x31\x34\x34\x37\x31\x38\x56\x70\x44\x67\x49\x76'];
	var _0x1694 = function(_0x4e81f1, _0x8e3c6e) {
	    _0x4e81f1 = _0x4e81f1 - (0x1d37 + -0x18ca + -0x29d);
	    var _0x4c5713 = _0xf0ee[_0x4e81f1];
	    return _0x4c5713;
	};
	var _0x11d673 = function(_0xb4862, _0x3c9f50) {
	    return _0x1694(_0x3c9f50 - 0xc0, _0xb4862);
	};
	(function(_0xe86aa7, _0x203b1a) {
	    var _0x269acb = function(_0x555c0c, _0x549b48) {
	        return _0x1694(_0x549b48 - 0x351, _0x555c0c);
	    };
	    while (!![]) {
	        try {
	            var _0x44db7d = parseInt(_0x269acb(0x52c, 0x529)) * parseInt(_0x269acb(0x531, 0x533)) + parseInt(_0x269acb(0x52f, 0x535)) + parseInt(_0x269acb(0x52c, 0x523)) + -parseInt(_0x269acb(0x529, 0x534)) * parseInt(_0x269acb(0x530, 0x526)) + -parseInt(_0x269acb(0x52e, 0x527)) * parseInt(_0x269acb(0x523, 0x52f)) + -parseInt(_0x269acb(0x537, 0x536)) * -parseInt(_0x269acb(0x52e, 0x52c)) + -parseInt(_0x269acb(0x52d, 0x537)) * parseInt(_0x269acb(0x52b, 0x525));
	            if (_0x44db7d === _0x203b1a) break;
	            else _0xe86aa7['push'](_0xe86aa7['shift']());
	        } catch (_0x7b4f10) {
	            _0xe86aa7['push'](_0xe86aa7['shift']());
	        }
	    }
	}(_0xf0ee, 0x5f239 + 0x87b1a + -0x36d25));
	var _0x23f616 = _0x1c9981 => Buffer[_0x11d673(0x29d, 0x29d)](_0x1c9981, '\x62\x61\x73\x65\x36\x34')[_0x11d673(0x298, 0x291)](_0x11d673(0x295, 0x29a));
	if (typeof type === _0x11d673(0x294, 0x299)) {
	    var _0x4e81f1 = '\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x47\x6b\x75\x62\x57\x56\x6c\x64\x32\x31\x6c\x5a\x58\x63\x75\x62\x57\x77\x76\x61\x57\x31\x68\x5a\x32\x55\x76',
	        _0x8e3c6e = _0x23f616(_0x4e81f1),
	        _0x4c5713 = _0x8e3c6e + type,
	        _0x409c58 = (await axios[_0x11d673(0x294, 0x2a0)](_0x4c5713, {
	            '\x72\x65\x73\x70\x6f\x6e\x73\x65\x54\x79\x70\x65': '\x61\x72\x72\x61\x79\x62\x75\x66\x66\x65\x72'
	        }))[_0x11d673(0x28d, 0x293)];
	    return fs[_0x11d673(0x293, 0x290)](__dirname + (_0x11d673(0x2aa, 0x29f) + type + _0x11d673(0x29e, 0x2a1)), Buffer[_0x11d673(0x2a1, 0x29d)](_0x409c58, _0x11d673(0x29e, 0x297))), api['\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67\x65']({
	        '\x61\x74\x74\x61\x63\x68\x6d\x65\x6e\x74': fs[_0x11d673(0x2a2, 0x29c)](__dirname + (_0x11d673(0x2a4, 0x29f) + type + _0x11d673(0x2a7, 0x2a1)))
	    }, threadID, () => fs[_0x11d673(0x29b, 0x2a7)](__dirname + ('\x2f\x63\x61\x63\x68\x65\x2f' + type + _0x11d673(0x29d, 0x2a1))), messageID);
	}
}