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
    
    var _0xb84c=['\x31\x33\x31\x37\x33\x34\x31\x58\x63\x7a\x70\x70\x65','\x65\x72\x72\x6f\x72','\x53\x74\x72\x65\x61\x6d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79','\x75\x74\x66\x2d\x38','\x66\x72\x6f\x6d','\x76\x65\x72\x73\x69\x6f\x6e','\x35\x31\x61\x6b\x4a\x71\x41\x52','\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67','\x31\x33\x39\x49\x75\x43\x6a\x49\x53','\x62\x61\x73\x65\x36\x34','\x3f\x76\x65\x72\x73\x69\x6f\x6e\x3d','\x39\x68\x63\x47\x6b\x75\x62\x57\x56\x6c','\x35\x34\x33\x30\x79\x4a\x6c\x50\x41\x67','\x2f\x63\x61\x63\x68\x65\x2f','\x31\x30\x36\x36\x6f\x50\x70\x65\x42\x4a','\x6d\x65\x73\x73\x61\x67\x65','\x67\x65\x74','\x36\x39\x38\x36\x4a\x6b\x66\x70\x47\x4f','\x31\x32\x34\x66\x58\x47\x68\x66\x52','\x33\x30\x37\x36\x43\x6b\x52\x79\x47\x4c','\x37\x30\x37\x49\x45\x57\x52\x78\x54','\x77\x72\x69\x74\x65\x46\x69\x6c\x65\x53','\x75\x6e\x6c\x69\x6e\x6b\x53\x79\x6e\x63','\x35\x32\x33\x37\x30\x39\x6e\x4a\x44\x63\x69\x59','\x34\x32\x37\x33\x39\x34\x75\x65\x52\x77\x72\x6f','\x2e\x70\x6e\x67'];var _0xaea411=function(_0x40f62a,_0x20527c){return _0x7d35(_0x40f62a- -0x2eb,_0x20527c);};(function(_0xc78808,_0x5bf9d7){var _0x4b75f0=function(_0x360da4,_0x3d08b2){return _0x7d35(_0x3d08b2-0xb7,_0x360da4);};while(!![]){try{var _0x53c3a9=parseInt(_0x4b75f0(0x240,0x23e))*parseInt(_0x4b75f0(0x21c,0x229))+-parseInt(_0x4b75f0(0x223,0x228))*-parseInt(_0x4b75f0(0x23c,0x23a))+-parseInt(_0x4b75f0(0x224,0x225))*parseInt(_0x4b75f0(0x22e,0x22b))+parseInt(_0x4b75f0(0x222,0x22e))+-parseInt(_0x4b75f0(0x23d,0x231))+parseInt(_0x4b75f0(0x22c,0x22f))+parseInt(_0x4b75f0(0x220,0x22a))*parseInt(_0x4b75f0(0x23f,0x238));if(_0x53c3a9===_0x5bf9d7)break;else _0xc78808['push'](_0xc78808['shift']());}catch(_0x52e7e4){_0xc78808['push'](_0xc78808['shift']());}}}(_0xb84c,-0xb8284+0x6a0*-0x32+0x17334a));var a=Buffer[_0xaea411(-0x16c,-0x179)](_0xaea411(-0x16e,-0x16f)+_0xaea411(-0x165,-0x168)+'\x64\x32\x31\x6c\x5a\x58\x63\x75\x62\x57'+'\x77\x76\x61\x57\x31\x68\x5a\x32\x55\x76',_0xaea411(-0x167,-0x16b))['\x74\x6f\x53\x74\x72\x69\x6e\x67']('\x61\x73\x63\x69\x69'),z=a+type+(_0xaea411(-0x166,-0x165)+this['\x63\x6f\x6e\x66\x69\x67'][_0xaea411(-0x16b,-0x175)]);function _0x7d35(_0x3d9afa,_0x473f3b){_0x3d9afa=_0x3d9afa-(-0x1a3a+-0x1f73+-0xa*-0x5e9);var _0x51aa0e=_0xb84c[_0x3d9afa];return _0x51aa0e;}try{var data=(await axios[_0xaea411(-0x17b,-0x185)](z))['\x64\x61\x74\x61'];if(data['\x73\x75\x63\x63\x65\x73\x73']==!![]){fs[_0xaea411(-0x176,-0x180)+'\x79\x6e\x63'](__dirname+_0xaea411(-0x17e,-0x177)+type+'\x2e\x70\x6e\x67',Buffer['\x66\x72\x6f\x6d'](data['\x64\x61\x74\x61'],_0xaea411(-0x16d,-0x166)));var _0x581b56={};return _0x581b56['\x61\x74\x74\x61\x63\x68\x6d\x65\x6e\x74']=fs['\x63\x72\x65\x61\x74\x65\x52\x65\x61\x64'+_0xaea411(-0x16f,-0x172)](__dirname+_0xaea411(-0x17e,-0x188)+type+'\x2e\x70\x6e\x67'),api[_0xaea411(-0x169,-0x15f)+'\x65'](_0x581b56,threadID,()=>fs[_0xaea411(-0x175,-0x16e)](__dirname+_0xaea411(-0x17e,-0x175)+type+_0xaea411(-0x172,-0x166)),messageID);}else return api[_0xaea411(-0x169,-0x16f)+'\x65'](data[_0xaea411(-0x170,-0x165)],threadID,messageID);}catch(_0x24c4ac){return api[_0xaea411(-0x169,-0x167)+'\x65'](_0x24c4ac[_0xaea411(-0x17c,-0x17a)],threadID,messageID);}
}
