/**
 * @author ProCoderMew
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "sim",
    version: "4.3.5",
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
        APIKEY: ""
    }
}


function _0x7405() { const _0x58fd82 = ['error', '6874747073', '156gVramq', '2673656e64', '2661736b3d', 'UserID', 'axios', '73696d692f', '14263120zZIrVq', '1428378ZEbzfi', '233686CgZHCS', 'toString', '657269643d', '6VMFesV', '3039615MhJsUS', '6f7469643d', '3588263vzYCGH', 'hex', 'from', 'data', '3a2f2f6d65', '65776d6565', 'GET', '&apikey=', 'utf8', 'configModu', '16647HggHme', '456EqjsOL', '6f2f73696d', '215154DssEoI']; _0x7405 = function () { return _0x58fd82; }; return _0x7405(); } function _0x14b4(_0x42389d, _0x182f86) { const _0x5207bf = _0x7405(); _0x14b4 = function (_0x2e5ccf, _0x55e360) { _0x2e5ccf = _0x2e5ccf - (0x4f4 + -0x1154 + -0x3 * -0x4b1); let _0x96fa03 = _0x5207bf[_0x2e5ccf]; return _0x96fa03; }; return _0x14b4(_0x42389d, _0x182f86); } (function (_0x4355d6, _0x5d3d38) { const _0x18abc6 = _0x14b4; const _0x1eedb3 = _0x4355d6(); while (!![]) { try { const _0x558072 = parseInt(_0x18abc6(0x1d0)) / (-0x62e + -0x1e2f + 0x245e) + -parseInt(_0x18abc6(0x1cf)) / (0x2dd * -0xa + -0x53 * -0x44 + 0x698) + parseInt(_0x18abc6(0x1c2)) / (-0x1432 + 0x1d51 + -0x91c) * (parseInt(_0x18abc6(0x1c8)) / (0x896 + 0x2538 + -0x2 * 0x16e5)) + parseInt(_0x18abc6(0x1b6)) / (-0xcd * -0x13 + -0xe74 + -0xbe) + -parseInt(_0x18abc6(0x1b5)) / (-0x2419 + -0x1882 + 0xbb * 0x53) * (-parseInt(_0x18abc6(0x1b8)) / (-0x25e6 + 0x1 * -0xc6b + -0xc96 * -0x4)) + parseInt(_0x18abc6(0x1c3)) / (0xaa1 + 0x2257 + 0x2 * -0x1678) * (-parseInt(_0x18abc6(0x1c5)) / (-0x971 + 0xca3 + -0x329)) + parseInt(_0x18abc6(0x1ce)) / (-0x1573 + -0x86 * 0x29 + 0x2af3); if (_0x558072 === _0x5d3d38) { break; } else { _0x1eedb3['push'](_0x1eedb3['shift']()); } } catch (_0x494721) { _0x1eedb3['push'](_0x1eedb3['shift']()); } } }(_0x7405, -0x13c5c * 0x3 + -0x39 * 0x3061 + 0x49 * 0x6403)); async function simsimi(_0x3f3b71, _0xeef631, _0x510470) { const _0x33f8a7 = _0x14b4; const _0x38b211 = global['nodemodule'][_0x33f8a7(0x1cc)], { APIKEY: _0x39f0e1 } = global[_0x33f8a7(0x1c1) + 'le'], _0x5e3e8d = _0xd3026d => Buffer[_0x33f8a7(0x1ba)](_0xd3026d, _0x33f8a7(0x1b9))[_0x33f8a7(0x1b3)](_0x33f8a7(0x1c0)), _0x302c43 = _0x135cf5 => encodeURIComponent(_0x135cf5), _0x216688 = _0xeef631['getCurrent' + _0x33f8a7(0x1cb)](), { senderID: _0x58d3c1 } = _0x510470; try { var { data: _0x296240 } = await _0x38b211({ 'url': '' + _0x5e3e8d(_0x33f8a7(0x1c7) + _0x33f8a7(0x1bc) + _0x33f8a7(0x1bd) + '772e696e66' + _0x33f8a7(0x1c4) + _0x33f8a7(0x1cd) + '6170693f62' + _0x33f8a7(0x1b7)) + _0x216688 + _0x5e3e8d(_0x33f8a7(0x1c9) + _0x33f8a7(0x1b4)) + _0x58d3c1 + _0x5e3e8d(_0x33f8a7(0x1ca)) + _0x302c43(_0x3f3b71) + _0x33f8a7(0x1bf) + _0x39f0e1, 'method': _0x33f8a7(0x1be) }); const _0x2aacc2 = {}; _0x2aacc2[_0x33f8a7(0x1c6)] = !(-0x2 * -0xfa6 + -0x47 * 0x71 + 0x4 * 0x3); _0x2aacc2['data'] = _0x296240; return _0x2aacc2; } catch (_0xe46ba6) { const _0x219f5b = {}; _0x219f5b[_0x33f8a7(0x1c6)] = !(-0x22b * 0x3 + -0x10 * 0x101 + 0x1691); _0x219f5b[_0x33f8a7(0x1bb)] = {}; return _0x219f5b; } }
module.exports.onLoad = async function () {
    "undefined" == typeof global.procodermew && (global.procodermew = {}), "undefined" == typeof global.procodermew.simsimi && (global.procodermew.simsimi = new Map);
};
module.exports.handleEvent = async function ({ api: b, event: a }) {
    const { threadID: c, messageID: d, senderID: e, body: f } = a, g = (e) => b.sendMessage(e, c, d);
    if (global.procodermew.simsimi.has(c)) {
        if (e == b.getCurrentUserID() || "" == f || d == global.procodermew.simsimi.get(c)) return;
        var { data: h, error: i } = await simsimi(f, b, a);
        return !0 == i ? void 0 : !1 == h.success ? g(h.error) : g(h.msg)
    }
}
module.exports.run = async function ({ api: b, event: a, args: c }) {
    const { threadID: d, messageID: e } = a, f = (c) => b.sendMessage(c, d, e);
    if (0 == c.length) return f("B\u1EA1n ch\u01B0a nh\u1EADp tin nh\u1EAFn");
    switch (c[0]) {
        case "on":
            return global.procodermew.simsimi.has(d) ? f("B\u1EA1n ch\u01B0a t\u1EAFt sim.") : (global.procodermew.simsimi.set(d, e), f("\u0110\xE3 b\u1EADt sim th\xE0nh c\xF4ng."));
        case "off":
            return global.procodermew.simsimi.has(d) ? (global.procodermew.simsimi.delete(d), f("\u0110\xE3 t\u1EAFt sim th\xE0nh c\xF4ng.")) : f("B\u1EA1n ch\u01B0a b\u1EADt sim.");
        default:
            var { data: g, error: h } = await simsimi(c.join(" "), b, a);
            return !0 == h ? void 0 : !1 == g.success ? f(g.error) : f(g.msg);
    }
};