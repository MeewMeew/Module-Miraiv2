/**
* @author MeewMeew
* @warn Do not edit code or edit credits
*/

class HentaiVN {
  constructor() {
    this.API_URL = 'https://meewmeew.info/hidden/hentaivn';
    this.config = {
      name: "hentaivn",
      version: "1.0.2",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "Tải truyện trên hentaivn",
      commandCategory: "nsfw",
      usages: "\n   + [comics] [url]: tải all chap\n   + [url]: tải 1 chap\n   + [id]: thông tin truyện\n   + [homepage] [new/hot/random]: lấy list truyện từ homepage",
      cooldowns: 0,
      envConfig: {
        meewmeew_apikey: "",
        limitPerMessage: 9,
        home_page: 'https://meewmeew.info/site'
      }
    }

    this.axios = require('axios');
    this.fs = require('fs-extra');
    this.path = require('path');

    this.tempFolder = this.path.join(process.cwd(), 'node_modules', 'temp');
    this.setup();
  }

  get configModule() {
    return global.configModule.hentaivn;
  }

  get meewmeewApikey() {
    return this.configModule.meewmeew_apikey;
  }

  get limitPerMessage() {
    return this.configModule.limitPerMessage;
  }

  randomName() {
    return Math.random().toString(36).substring(2, 15)
  }

  out(api, data, event, callback = () => { }) {
    return api.sendMessage(data, event.threadID, callback, event.messageID);
  }

  createTempFolder() {
    return this.fs.mkdirSync(this.tempFolder);
  }

  setup() {
    if (!this.fs.existsSync(this.tempFolder)) return this.createTempFolder();
  }

  /**
   *? this function was created by JustAWibu
   *? but I modified it to fit my needs
   */

  async getInfoById(api, event, args) {
    const URL_REQUEST = `${this.API_URL}/search?apikey=${this.meewmeewApikey}${args.length > 0 ? `&id=${args[0]}` : ''}`;
    const { data: { error, data } } = await this.axios.get(URL_REQUEST);
    if (error) return this.out(api, error, event);
    var { name, tags, artist, char, url } = data;
    var msg = '» Tên truyện: ' + name.replace('\n', '');
    msg += '\n» Tác giả: ' + artist;
    msg += '\n» Thể loại: ' + tags;
    msg += '\n» Các nhân vật: ' + char;
    msg += '\n» Link truyện: ' + url;
    msg += '\n\nReply "dl" để tải truyện';
    return this.out(api, msg, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, url: url }));
  }

  async download(api, event, args) {
    var url = `${this.API_URL}/chapter?apikey=${this.meewmeewApikey}&split=${this.limitPerMessage}&url=${(typeof args == 'object' ? args.join("") : args)}`;
    var _this = this;
    var { data: { error, data, headers } } = await _this.axios.get(url);
    if (error) return error;
    if (data.length === 0) return 'Bạn có nhầm link comics với chapter không?';
    var { images, title } = data;
    var options = { responseType: 'arraybuffer', headers };
    for (let part in images) {
      let attachment = []
      let body = `${title} - [ ${parseInt(part) + 1} ]`;
      for (const uri of images[part]) {
        const img = await _this.axios.get(`${uri}`, options);
        var filename = _this.path.resolve(_this.tempFolder, _this.randomName() + '.png');
        _this.fs.writeFileSync(filename, Buffer.from(img.data, 'utf-8'));
        attachment.push(_this.fs.createReadStream(filename));
      }
      await new Promise(e => _this.out(api, { attachment, body }, event, (_, info) => global.client.handleReply.push({ name: _this.config.name, messageID: info.messageID, author: event.senderID }) && e()));
    }
    return null;
  };

  async run({ api, event, args }) {
    if (!args[0] || !isNaN(args[0])) return this.getInfoById(api, event, args);
    if (args[0] !== 'comics') {
      if (args[0] === 'homepage') return this.homepage(api, event, args[1]);
      var result = await this.download(api, event, args);
      if (result) return this.out(api, result, event);
    }
    if (!args[1]) return this.out(api, "Nhập Link Truyện hentaivn", event);
    var url = `${this.API_URL}/comics?apikey=${this.meewmeewApikey}&url=${args.slice(1).join("")}`;
    let { data } = await this.axios.get(url).catch(e => this.out(api, e.response.data.error, event));
    if (data.error) return this.out(api, data.error, event);
    if (data.data.length === 0) return this.out(api, "Không tìm thấy truyện", event);
    var reverse = data.data.reverse();
    var page = 1;
    var dataForPage = [];
    page = parseInt(args[1]) || 1;
    page < -1 ? page = 1 : "";
    var limit = 5;
    var numPage = Math.ceil(reverse.length / limit);
    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
      if (i >= reverse.length) break;
      dataForPage.push(reverse[i]);
    }
    var msg =  '====[ Truyện HentaiVN ]====\n\n';
    msg += dataForPage.map((comics, index) => `${index + 1}. ${comics.title}`).join('\n');
    msg += '\n\n==== [ ' + page + '/' + numPage + ' ] ====';
    msg += '\n\nReply tin nhắn với số thứ tự để tải truyện.';
    msg += '\nReply "page [số trang]" để chuyển trang.'
    return this.out(api, msg, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, comics: dataForPage, allComics: reverse }))
  }

  async handleReply({ api, event, handleReply }) {
    try {
      var { allComics, comics, url } = handleReply;
      if (event.body.indexOf('page') == 0) {
        var attachment = []
        var page = parseInt(event.body.split(' ')[1]) || 1;
        var limit = 5;
        var numPage = Math.ceil(allComics.length / limit);
        if (page < 1) page = 1;
        if (page > numPage) page = numPage;
        var dataForPage = [];
        for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
          if (i >= allComics.length) break;
          dataForPage.push(allComics[i]);
          if (allComics[i].image) {
            let img = await this.axios.get(`${allComics[i].image}`, { responseType: 'arraybuffer' });
            let filename = this.path.resolve(this.tempFolder, this.randomName() + '.png');
            this.fs.writeFileSync(filename, Buffer.from(img.data, 'utf-8'));
            attachment.push(this.fs.createReadStream(filename));
          }
        }
        var body = '====[ Truyện HentaiVN ]====\n\n';
        body += dataForPage.map((comics, index) => `${index + 1}. ${comics.title || comics.name}`).join('\n');
        body += '\n\n==== [ ' + page + '/' + numPage + ' ] ====';
        body += '\n\nReply tin nhắn với số thứ tự để tải truyện.';
        body += '\nReply "page [số trang]" để chuyển trang.'
        return this.out(api, { body, attachment }, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, comics: dataForPage, allComics }));
      }
      if (event.body === 'dl') return this.run({ api, event, args: ['comics', ...url.split(/\s+/g)] });
      var chap = comics[parseInt(event.body) - 1];
      if (chap.type && chap.type === 'comics') return this.run({ api, event, args: ['comics', chap.url] });
      this.out(api, 'Đợi tý, đang tải ' + chap.title, event);
      var result = await this.download(api, event, [chap.link]);
      if (result) return this.out(api, result, event);
      comics.find((e) => e.title == chap.title)['downloaded'] = true;
      var downloaded_count = comics.filter(e => e.downloaded == true).length;
      var total_count = comics.length;
      if (downloaded_count == total_count) return this.out(api, 'Đã tải thành công toàn bộ chapter trong truyện !', event);
      var msg = 'Bạn có muốn tiếp tục tải không?\n\n'
      msg += comics.map((comics, index) => `${index + 1}. ${comics.title} ${comics.downloaded ? '| Đã tải' : ''}`).join('\n');
      msg += '\n\nReply tin nhắn với số thứ tự để tải truyện.';
      return this.out(api, msg, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, comics: comics }));
    }
    catch {
      return this.out(api, "Không thể xử lý yêu cầu của bạn!", event);
    }
  }

  async homepage(api, event, args) {
    var attachment = [];
    var page = 1;
    var dataForPage = [];
    var limit = 5;
    var url = `${this.API_URL}/homepage?apikey=${this.meewmeewApikey}&type=${args || 'hot'}`;
    let { data: { error, data } } = await this.axios.get(url).catch(e => this.out(api, e.response.data.error, event));
    if (error) return this.out(api, data.error, event);
    if (data.length === 0) return this.out(api, "Không tìm thấy truyện", event);
    var numPage = Math.ceil(data.length / limit);
    data.forEach(e => e.type = 'comics');
    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
      if (i >= data.length) break;
      dataForPage.push(data[i]);
      if (!data[i].image) continue;
      let img = await this.axios.get(data[i].image, { responseType: 'arraybuffer' });
      var filename = this.path.resolve(this.tempFolder, this.randomName() + '.png');
      this.fs.writeFileSync(filename, Buffer.from(img.data, 'utf-8'));
      attachment.push(this.fs.createReadStream(filename));
    }
    var body = '====[ Truyện HentaiVN ]====\n\n';
    body += dataForPage.map((comics, index) => `${index + 1}. ${comics.name}`).join('\n');
    body += '\n\n==== [ ' + page + '/' + numPage + ' ] ====';
    body += '\n\nReply tin nhắn với số thứ tự để tải truyện.';
    body += '\nReply "page [số trang]" để chuyển trang.'
    return this.out(api, { attachment, body }, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, comics: dataForPage, allComics: data }))

  }
}

module.exports = new HentaiVN();