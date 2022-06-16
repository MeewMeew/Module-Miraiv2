/**
* @author MeewMeew
* @MeewMeew Do not edit code or edit credits
*/

class MeewMeewModule {
  constructor() {
    this.API_URL = 'https://mewdev.pro/api/v1/hidden/nettruyen';
    this.config = {
      name: "nettruyen",
      version: "1.0.2",
      hasPermssion: 0,
      credits: "MeewMeew",
      description: "Tải truyện trên nettruyen",
      commandCategory: "nsfw",
      usages: "\n   + [comics] [url]: tải all chap\n   + [url]: tải 1 chap",
      cooldowns: 0,
      envConfig: {
        meewmeew_apikey: "",
        limitPerMessage: 9,
        home_page: 'https://mewdev.pro/site'
      }
    }

    this.axios = require('axios');
    this.fs = require('fs-extra');
    this.path = require('path');

    this.tempFolder = this.path.join(process.cwd(), 'node_modules', 'temp');
    this.setup();
  }

  get configModule() {
    return global.configModule.nettruyen;
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

  async search(api, event, args) {
    var page = 1;
    var limit = 5;
    var attachment = [];
    var url = `${this.API_URL}/search?apikey=${this.meewmeewApikey}&content=${encodeURIComponent(args.join(" "))}`;
    var { data: { data, error } } = await this.axios.get(url);
    if (error) return this.out(api, error, event);
    try {
      if (data.length === 0) return this.out(api, 'Không tìm thấy truyện nào', event);
      var msg = `====[ NETTRUYEN ]====\n\n`;
      msg += `Có ${data.length} truyện được tìm thấy\n\n`;
      var numPage = Math.ceil(data.length / limit);
      for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= data.length) break;
        msg += '--------------------------------\n\n'
        msg += `${i + 1}. ${data[i].title}\n`;
        msg += `» Chương mới nhất:\n`;
        msg += `  - Tiêu đề: ${data[i].latest_chapter.title}\n`;
        msg += `  - Chap: ${data[i].latest_chapter.name.split(" ")[1]}\n`;
        msg += `» Thể loại: ${data[i].tags.join(", ")}\n`;
        var { data: img } = await this.axios.get(`${data[i].image}`, { responseType: 'arraybuffer' });
        var filename = this.path.resolve(this.tempFolder, this.randomName() + '.png');
        this.fs.writeFileSync(filename, Buffer.from(img, 'utf-8'));
        attachment.push(this.fs.createReadStream(filename));
      }
    } catch (err) {
      console.log(err)
    }
    msg += `\n====[ ${page}/${numPage} ]====`;
    return this.out(api, { attachment, body: msg }, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, dataSearch: data }));
  }

  async download(api, event, args) {
    var url = `${this.API_URL}/chapter?apikey=${this.meewmeewApikey}&split=${this.limitPerMessage}&url=${(typeof args == 'object' ? args.join("") : args)}`;
    var _this = this;
    var { data: { error, data, headers } } = await _this.axios.get(url);
    if (error == 'Invalid url') {
      await this.search(api, event, args);
      return false;
    }
    if (data.length === 0) return 'Bạn có nhầm link comics với chapter không?';
    var options = { responseType: 'arraybuffer', headers };
    for (let part in data) {
      let attachment = []
      let body = `Phần ${parseInt(part) + 1}`;
      for (const uri of data[part]) {
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
      var result = await this.download(api, event, args);
      if (result) return this.out(api, result, event);
      else return;
    }
    if (!args[1]) return this.out(api, "Nhập Link Truyện Nettruyen", event);
    var url = `${this.API_URL}/comics?apikey=${this.meewmeewApikey}&url=${args.slice(1).join("")}`;
    let { data: { error, data } } = await this.axios.get(url).catch(e => this.out(api, e.response.data.error, event));
    if (error) return this.out(api, data.error, event);
    if (data.chapters.length === 0) return this.out(api, "Không tìm thấy truyện", event);
    var page = 1;
    var dataForPage = [];
    page = parseInt(args[1]) || 1;
    page < -1 ? page = 1 : "";
    var limit = 5;
    var numPage = Math.ceil(data.chapters.length / limit);
    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
      if (i >= data.chapters.length) break;
      dataForPage.push(data.chapters[i]);
    }
    var msg = '====[ Nettruyen ]====\n\n';
    msg += `» Tên truyện: ${data.name}\n`;
    msg += `» Tác giả: ${data.author}\n`;
    msg += `» Thể loại: ${data.tags.split(' - ').join(", ")}\n`;
    msg += `» Trạng thái: ${data.status}\n`;
    msg += `» Lượt theo dõi: ${data.followers}\n`;
    msg += `» Lượt xem: ${data.views}\n`;
    msg += `» Cập nhật: ${data.update_at || ''}\n`;
    msg += `» Mô tả: ${data.descriptions}\n\n`;
    msg += `====[ Chapter ]====\n\n`;
    msg += dataForPage.map((comics, index) => `${index + 1}. ${comics.title}`).join('\n');
    msg += '\n\n====[ ' + page + '/' + numPage + ' ]====';
    msg += '\n\nReply tin nhắn với số thứ tự để tải truyện.';
    msg += '\nReply "page [số trang]" để chuyển trang.'

    var { data: img } = await this.axios.get(data.image, { responseType: 'arraybuffer' });
    var filename = this.path.resolve(this.tempFolder, this.randomName() + '.png');
    this.fs.writeFileSync(filename, Buffer.from(img, 'utf-8'));
    var attachment = [this.fs.createReadStream(filename)];
    return this.out(api, { body: msg, attachment }, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, comics: dataForPage, allComics: data.chapters, allData: data }));
  }

  async handleReply({ api, event, handleReply }) {
    try {
      var { allComics, comics, allData, dataSearch } = handleReply;
      if (event.body.indexOf('page') == 0) {
        var page = parseInt(event.body.split(' ')[1]) || 1;
        var limit = 5;
        if (dataSearch) {
          var attachment = []
          var msg = `====[ NETTRUYEN ]====\n\n`;
          msg += `Có ${dataSearch.length} truyện được tìm thấy\n\n`;
          var numPage = Math.ceil(dataSearch.length / limit);
          for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
            if (i >= dataSearch.length) break;
            msg += '--------------------------------\n\n'
            msg += `${i + 1}. ${dataSearch[i].title}\n`;
            msg += `» Chương mới nhất:\n`;
            msg += `  - Tiêu đề: ${dataSearch[i].latest_chapter.title}\n`;
            msg += `  - Chap: ${dataSearch[i].latest_chapter.name.split(" ")[1]}\n`;
            msg += `» Thể loại: ${dataSearch[i].tags.join(", ")}\n`;
            var { data: img } = await this.axios.get(`${dataSearch[i].image}`, { responseType: 'arraybuffer' });
            var filename = this.path.resolve(this.tempFolder, this.randomName() + '.png');
            this.fs.writeFileSync(filename, Buffer.from(img, 'utf-8'));
            attachment.push(this.fs.createReadStream(filename));
          }
          msg += `\n====[ ${page}/${numPage} ]====`;
          return this.out(api, { attachment, body: msg }, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, dataSearch: dataSearch }));
        }
        var numPage = Math.ceil(allComics.length / limit);
        if (page < 1) page = 1;
        if (page > numPage) page = numPage;
        var dataForPage = [];
        for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
          if (i >= allComics.length) break;
          dataForPage.push(allComics[i]);
        }
        var body = `====[ ${allData.name} ]====\n\n`;
        body += dataForPage.map((comics, index) => `${index + 1}. ${comics.title}`).join('\n');
        body += '\n\n====[ ' + page + '/' + numPage + ' ]====';
        body += '\n\nReply tin nhắn với số thứ tự để tải truyện.';
        body += '\nReply "page [số trang]" để chuyển trang.'
        return this.out(api, body, event, (_, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, comics: dataForPage, allComics, allData }));
      }
      var chap = comics[parseInt(event.body) - 1];
      this.out(api, 'Đợi tý, đang tải ' + chap.title, event);
      var result = await this.download(api, event, chap.url);
      console.log(result);
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
    catch (errors) {
      console.log(errors)
      return this.out(api, "Không thể xử lý yêu cầu của bạn!", event);
    }
  }
}

module.exports = new MeewMeewModule();