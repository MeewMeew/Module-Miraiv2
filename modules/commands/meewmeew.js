/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

const url = 'https://raw.githubusercontent.com/miraiPr0ject/Module-Mew/Mew/repo.json';
const evtUrl = 'https://raw.githubusercontent.com/miraiPr0ject/Module-Mew/Mew/modules/events/{name}.js';
const cmdUrl = 'https://raw.githubusercontent.com/miraiPr0ject/Module-Mew/Mew/modules/commands/{name}.js';

module.exports.config = {
    name: 'meewmeew',
    version: '2.2.2',
    hasPermssion: 2,
    credits: 'ProCoderMew',
    description: 'T\u1EA3i ho\u1EB7c c\u1EADp nh\u1EADt t\u1EA5t c\u1EA3 module c\u1EE7a Mew',
    commandCategory: 'admin',
    usages: '[install/uninstall/update/b\u1ECF tr\u1ED1ng]',
    cooldowns: 1,
    dependencies: {
        'axios': '',
        "fs-extra": '',
        'path': ''
    }
};
module.exports.version = function() {
    const { resolve } = global.nodemodule.path;
    try {
        var meewmeew = resolve(__dirname, 'cache', 'meewmeew.json');
        var meewmeewData = require(meewmeew);
        var localVersion = meewmeewData.version;
    } catch (a) {
        localVersion = '1.0.0';
    }
    return [localVersion, meewmeew, meewmeewData];
}
module.exports.onLoad = async function() {
    const axios = global.nodemodule.axios;
    const logger = require(process.cwd() + '/utils/log');
    const { existsSync, writeFileSync } = global.nodemodule['fs-extra'];
    const { data: a } = await axios.get(url);
    var [localVersion, meewmeew, meewmeewData] = this.version();
    if (!existsSync(meewmeew)) {
        writeFileSync(meewmeew, JSON.stringify({ version: localVersion  }, null, 4))
    } else {
        const a = meewmeewData;
        a.hasOwnProperty('version') || (a.version = '1.0.0'),
        writeFileSync(meewmeew, JSON.stringify(a, null, 4));
    }
    a.version != localVersion && (logger(`[!] Đã có bản cập nhật mới [!]`, '[ MeewMeew ]'),
    logger(`Phiên bản ${a.version}`, '[ MeewMeew ]'),
    logger(`Các module có sự thay đổi: ${a.change.join(', ')}`, '[ MeewMeew ]'));
};
module.exports.getAll = async function() {
    const { data: a } = await axios.get(url);
    return [a.modules, a];
};
module.exports.getName = async function() {
    var a = { events: {}, commands: {} };
    for (const b of global.client.events.values()) 'ProCoderMew' == b.config.credits && (a.events[b.config.name] = b.config.version);
    for (const b of global.client.commands.values()) 'ProCoderMew' == b.config.credits && (a.commands[b.config.name] = b.config.version);
    return a;
};
module.exports.falseVersion = async function(a, b) {
    var c = { events: {}, commands: {} };
    return Object.keys(a.commands).map(d => b.commands[d] == a.commands[d] && b.commands[d] || (c.commands[d] = [a.commands[d], b.commands[d] || null, d])),
    Object.keys(a.events).map(d => b.events[d] == a.events[d] && b.events[d] || (c.events[d] = [a.events[d], b.events[d] || null, d])), c
};
module.exports.update = async function(a, b) {
    const { data: c } = await axios.get(a);
    existsSync(b) && (await unlinkSync(b)), await new Promise((a) => setTimeout(a, 200)), await writeFileSync(b, Buffer.from(c, 'utf-8'))
};
module.exports.switchArgs = function(a) {
    switch (a[1]) {
        case void 0:
        case 'all':
            return 'all';
        default:
            return 'idk';
    }
}
module.exports.run = async function({ args: a, event: b, api: c }) {
    async function d(a, d) {
        const e = require('./command').run;
        const f = require('./event').run;
        if (1 == a.length && a.includes('') ? a = [] : -1 !== a.indexOf('') && (a = a.splice(a.indexOf(''), 1)), !Array.isArray(a)) throw { error: 'name is not array' };
        var g = ['load', ...a];
        1 != g.length && ('commands' === d ? await e({ event: b, args: g, api: c }) : 'events' === d ? await f({ event: b, args: g, api: c }) : void 0)
    }
    const e = await this.getName();
    const [f, g] = await this.getAll();
    const h = Object.keys(f.commands);
    const i = Object.keys(f.events);
    const { commands: j, events: k } = await this.falseVersion(f, e);
    const l = (a, d = function() {}) => c.sendMessage(a, b.threadID, d, b.messageID);
    var [localVersion, meewmeew, meewmeewData] = this.version();
    switch (a[0]) {
        case 'install':
            if ('all' == this.switchArgs(a)) {
                meewmeewData.version = g.version, await writeFileSync(meewmeew, JSON.stringify(meewmeewData, null, 4));
                var m = '\xBB Commands:\n', n = '\xBB Events:\n';
                i.forEach((a) => n += `- ${a}: ${f.events[a]}\n`), h.forEach((a) => m += `- ${a}: ${f.commands[a]}\n`),
                l('Thao t\xE1c n\xE0y s\u1EBD t\u1EA3i xu\u1ED1ng to\xE0n b\u1ED9 modules.', async () => l('Bao g\u1ED3m c\xE1c modules:\n' + m + n));
                for (const a of h) {
                    const b = resolve(__dirname, `${a}.js`);
                    await this.update(cmdUrl.replace('{name}', a), b)
                }
                for (const a of i) {
                    const b = resolve(__dirname, '../events', `${a}.js`);
                    await this.update(evtUrl.replace('{name}', a), b)
                }
                await d(i, 'events'), await d(h, 'commands'),
                l('[!] T\u1EA3i xu\u1ED1ng ho\xE0n t\u1EA5t [!]')
            }
            break;
        case 'update':
            if ('all' == this.switchArgs(a)) {
                if (0 == Object.keys(j).length && 0 == Object.keys(k).length) return l('==== MeewMeew ====\n\xBB T\u1EA5t c\u1EA3 c\xE1c module hi\u1EC7n \u0111ang \u1EDF phi\xEAn b\u1EA3n m\u1EDBi nh\u1EA5t!');
                meewmeewData.version = g.version, await writeFileSync(meewmeew, JSON.stringify(meewmeewData, null, 4));
                const a = Object.keys(j), b = Object.keys(k);
                var m = '\xBB Module Command:\n', n = '\xBB Module Event:\n';
                b.forEach((a) => n += `- ${a}:\n    + Current version: ${k[a][1]}\n    + Latest version: ${k[a][0]}\n`),
                a.forEach((a) => m += `- ${a}:\n    + Current version: ${j[a][1]}\n    + Latest version: ${j[a][0]}\n`),
                l(`Tiến hành update..\n${m}${n}`);
                for (const b of a) {
                    const a = resolve(__dirname, `${b}.js`);
                    await this.update(cmdUrl.replace('{name}', b), a)
                }
                for (const a of b) {
                    const b = resolve(__dirname, '../events', `${a}.js`);
                    await this.update(evtUrl.replace('{name}', a), b)
                }
                await d(b, 'events'), await d(a, 'commands'),
                l('[!] C\u1EADp nh\u1EADt ho\xE0n t\u1EA5t [!]');
            }
            break;
        case 'uninstall':
            if ('all' == this.switchArgs(a)) {
                meewmeewData.version = '1.0.0', await writeFileSync(meewmeew, JSON.stringify(meewmeewData, null, 4));
                for (const a of h) 'meewmeew' != a && (await unlinkSync(resolve(__dirname, a + '.js')));
                for (const a of i) await unlinkSync(resolve(__dirname, '../events', a + '.js'));
                l('[!] \u0110\xE3 g\u1EE1 c\xE0i \u0111\u1EB7t t\u1EA5t c\u1EA3 module c\u1EE7a Mew [!]', () => l('\u0110\u1EC3 c\xE0i \u0111\u1EB7t l\u1EA1i, h\xE3y s\u1EED d\u1EE5ng l\u1EC7nh meewmeew install'))
            }
            break;
        default:
            l('==== MeewMeew ====\n' + 
                `» Phiên bản hiện tại: ${localVersion}\n` + 
                `» Phiên bản mới nhất: ${g.version}\n` + 
                `» Module thay đổi: ${g.change.join(', ')}\n` + 
                `» ${g.version == localVersion ?
                'B\u1EA1n \u0111ang s\u1EED d\u1EE5ng phi\xEAn b\u1EA3n m\u1EDBi nh\u1EA5t.' :
                '\u0110\xE3 c\xF3 b\u1EA3n c\u1EADp nh\u1EADt m\u1EDBi, h\xE3y update.'}`);
    }
};