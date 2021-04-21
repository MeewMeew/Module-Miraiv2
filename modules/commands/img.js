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
    
    var _0x1556=['\x77\x72\x69\x74\x65\x46\x69\x6c\x65\x53','\x36\x34\x35\x33\x33\x31\x4d\x70\x66\x55\x75\x73','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x64\x32\x31\x6c\x5a\x58\x63\x75\x62\x57','\x73\x75\x63\x63\x65\x73\x73','\x64\x61\x74\x61','\x32\x70\x6a\x49\x69\x4a\x4b','\x6d\x65\x73\x73\x61\x67\x65','\x77\x76\x61\x57\x31\x68\x5a\x32\x55\x76','\x31\x76\x41\x71\x62\x4b\x79','\x31\x32\x36\x31\x32\x32\x30\x5a\x4e\x46\x78\x42\x71','\x39\x68\x63\x47\x6b\x75\x62\x57\x56\x6c','\x2e\x70\x6e\x67','\x34\x35\x36\x37\x30\x52\x4b\x4a\x45\x4e\x77','\x31\x34\x34\x32\x34\x37\x36\x4d\x6c\x43\x65\x56\x57','\x31\x36\x36\x36\x39\x30\x35\x48\x7a\x74\x70\x54\x70','\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67','\x61\x74\x74\x61\x63\x68\x6d\x65\x6e\x74','\x79\x6e\x63','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79','\x2f\x63\x61\x63\x68\x65\x2f','\x35\x31\x37\x32\x30\x34\x59\x50\x4c\x68\x75\x41','\x65\x72\x72\x6f\x72','\x61\x73\x63\x69\x69','\x76\x65\x72\x73\x69\x6f\x6e','\x63\x72\x65\x61\x74\x65\x52\x65\x61\x64','\x3f\x76\x65\x72\x73\x69\x6f\x6e\x3d','\x31\x30\x34\x32\x34\x35\x39\x6d\x55\x55\x79\x4d\x4d'];var _0x3368d2=function(_0x52a257,_0x484bc0){return _0x192a(_0x484bc0-0x1ad,_0x52a257);};(function(_0x402540,_0x131746){var _0x4fd23f=function(_0x4e5703,_0x3e8765){return _0x192a(_0x3e8765- -0x2d8,_0x4e5703);};while(!![]){try{var _0xe5187b=parseInt(_0x4fd23f(-0x1c1,-0x1c2))*parseInt(_0x4fd23f(-0x1bd,-0x1c7))+parseInt(_0x4fd23f(-0x1b9,-0x1be))+-parseInt(_0x4fd23f(-0x1d4,-0x1cf))+parseInt(_0x4fd23f(-0x1ac,-0x1ba))+parseInt(_0x4fd23f(-0x1d4,-0x1c9))*-parseInt(_0x4fd23f(-0x1b2,-0x1bf))+-parseInt(_0x4fd23f(-0x1c7,-0x1bb))+-parseInt(_0x4fd23f(-0x1e3,-0x1d5));if(_0xe5187b===_0x131746)break;else _0x402540['push'](_0x402540['shift']());}catch(_0xeef322){_0x402540['push'](_0x402540['shift']());}}}(_0x1556,0x33fd*0x27+0xda*0x12c2+-0xcdff7*0x1));var a=Buffer['\x66\x72\x6f\x6d'](_0x3368d2(0x2bb,0x2b4)+_0x3368d2(0x2c8,0x2c8)+_0x3368d2(0x2b5,0x2c0)+_0x3368d2(0x2c3,0x2c5),'\x62\x61\x73\x65\x36\x34')[_0x3368d2(0x2b8,0x2bf)](_0x3368d2(0x2b8,0x2b8)),z=a+type+(_0x3368d2(0x2c4,0x2bb)+this[_0x3368d2(0x2c6,0x2b9)]);function _0x192a(_0x5a3763,_0x41ecd6){_0x5a3763=_0x5a3763-(0x1e2f+0x121b+-0x2f47);var _0x5a4c1c=_0x1556[_0x5a3763];return _0x5a4c1c;}try{var data=(await axios['\x67\x65\x74'](z))[_0x3368d2(0x2bf,0x2c2)];if(data[_0x3368d2(0x2b5,0x2c1)]==!![]){fs[_0x3368d2(0x2cb,0x2bd)+_0x3368d2(0x2b8,0x2b3)](__dirname+_0x3368d2(0x2b3,0x2b5)+type+_0x3368d2(0x2cc,0x2c9),Buffer['\x66\x72\x6f\x6d'](data[_0x3368d2(0x2c4,0x2c2)],'\x75\x74\x66\x2d\x38'));var _0x2738d6={};return _0x2738d6[_0x3368d2(0x2b7,0x2b2)]=fs[_0x3368d2(0x2c1,0x2ba)+'\x53\x74\x72\x65\x61\x6d'](__dirname+'\x2f\x63\x61\x63\x68\x65\x2f'+type+'\x2e\x70\x6e\x67'),api['\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67'+'\x65'](_0x2738d6,threadID,()=>fs['\x75\x6e\x6c\x69\x6e\x6b\x53\x79\x6e\x63'](__dirname+_0x3368d2(0x2aa,0x2b5)+type+_0x3368d2(0x2c4,0x2c9)),messageID);}else return api[_0x3368d2(0x2b5,0x2b1)+'\x65'](data[_0x3368d2(0x2bd,0x2b7)],threadID,messageID);}catch(_0x5a3763){return api[_0x3368d2(0x2b4,0x2b1)+'\x65'](_0x5a3763[_0x3368d2(0x2d1,0x2c4)],threadID,messageID);}
}
