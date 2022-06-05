class MeewMeewModule {
  constructor() {
    this.fs = global.nodemodule['fs-extra']
    this.path = global.nodemodule['path']
    this.got = global.nodemodule['got']
    this.makeConfig();
  }
  get config() {
    return {
      name: 'meewmeew',
      version: '2.3.1',
      hasPermssion: 2,
      credits: 'MeewMeew',
      description: 'Tải, cập nhật, gỡ bỏ các module của meewmeew',
      commandCategory: 'admin',
      usages: 'help',
      cooldowns: 1,
      dependencies: {
        got: '11.8.3'
      }
    }
  }

  get configPath() {
    return this.path.resolve(process.cwd(), 'meewmeew.json')
  }

  get rawGithubUrl() {
    return 'https://raw.githubusercontent.com/MeewMeew/Module-Miraiv2/Mew/'
  }

  getType(variable) {
    return Object.prototype.toString.call(variable).slice(8, -1);
  }

  async download(url, path) {
    const writer = this.fs.createWriteStream(path);
    const downloadStream = this.got.stream(url);
    downloadStream.pipe(writer);
    return new Promise((resolve) => {
      downloadStream.on('error', () => resolve(false));
      writer.on('finish', () => resolve(true));
      writer.on('error', () => resolve(false));
    });
  }

  async makeConfig() {
    if (!this.fs.existsSync(this.configPath)) {
      const config = {
        modules: {}
      }
      this.fs.writeFileSync(this.configPath, JSON.stringify(config, null, 4), 'utf8');
    }
  }

  async setConfig(key, value, keys = []) {
    const data = this.fs.readFileSync(this.configPath, 'utf8');
    const config = JSON.parse(data);
    if (keys.length != 0) {
      let temp = config
      for (const el of keys) {
        temp = temp[el]
      }
      temp[key] = value
    } else config[key] = value
    const json = JSON.stringify(config, null, 2);
    this.fs.writeFileSync(this.configPath, json, 'utf8');
    return;
  }

  async deleteKey(key, keys = []) {
    const data = this.fs.readFileSync(this.configPath, 'utf8');
    const config = JSON.parse(data);
    if (keys.length != 0) {
      let temp = config
      for (const el of keys) {
        temp = temp[el]
      }
      delete temp[key]
    } else delete config[key]
    const json = JSON.stringify(config, null, 2);
    this.fs.writeFileSync(this.configPath, json, 'utf8');
    return;
  }

  async getConfig(key, keys = []) {
    const data = this.fs.readFileSync(this.configPath, 'utf8');
    const config = JSON.parse(data);
    if (keys.length != 0) {
      let temp = config
      for (const el of keys) {
        temp = temp[el]
      }
      return temp[key]
    }
    return key ? config[key] : config;
  }

  async listModules(type) {
    const response = await this.got(this.rawGithubUrl + 'repo.json');
    const data = JSON.parse(response.body);
    return type ? data.modules[type] : data.modules;
  }

  async listModulesLocal() {
    const config = await this.getConfig();
    const modules = {
      commands: [],
      events: []
    }
    Object.keys(config.modules).map(el => config.modules[el].type === "commands" ? modules.commands.push({
      [el]: config.modules[el].version
    }) : modules.events.push({
      [el]: config.modules[el].version
    }))
    return modules;
  }

  async installModule(name, type = "commands", overwrite = false) {
    const log = []
    if (this.getType(name) === "String") var allModule = [name]
    else if (this.getType(name) === "Array") var allModule = name
    else throw new TypeError("Module name must be a string or array of strings")
    for (const module of allModule) {
      const url = `${this.rawGithubUrl}/modules/${type}/${module}.js`
      const path = this.path.resolve(process.cwd(), 'modules', type, module + '.js')
      if (this.fs.existsSync(path) && !overwrite) {
        let msg = `[-] Module ${module} đã tồn tại! Bật chế độ overwrite để buộc ghi đè.`
        console.log(msg)
        log.push(msg)
        continue;
      }
      var result = await this.download(url, path)
      if (result) {
        const { meewmeewConfig, config } = require(path);
        if (meewmeewConfig) this.setConfig(`${module}`, meewmeewConfig, ['modules'])
        else this.setConfig(`${module}`, {
          version: config.version,
          type: type,
        }, ['modules'])
        let msg = `[+] Module ${module} đã được cài đặt!`
        console.log(msg)
        log.push(msg)
      } else {
        let msg = `[-] Module ${module} không tồn tại!`
        console.log(msg)
        log.push(msg)
      }
    }
    return log;
  }

  async uninstallModule(name, type = "commands") {
    const log = []
    if (this.getType(name) === "String") var allModule = [name]
    else if (this.getType(name) === "Array") var allModule = name
    else throw new TypeError("Module name must be a string or array of strings")
    for (const module of allModule) {
      const path = this.path.resolve(process.cwd(), 'modules', type, module + '.js')
      if (!this.fs.existsSync(path)) {
        let msg = `[-] Module ${module} không tồn tại!`
        console.log(msg)
        log.push(msg)
        continue;
      }
      this.fs.unlinkSync(path)
      await this.deleteKey(`${module}`, ['modules'])
      let msg = `[+] Module ${module} đã được gỡ bỏ!`
      console.log(msg)
      log.push(msg)
    }
    return log;
  }

  async updateModule(name, type = "commands") {
    const log = []
    if (this.getType(name) === "String") var allModule = [name]
    else if (this.getType(name) === "Array") var allModule = name
    else throw new TypeError("Module name must be a string or array of strings")
    for (const module of allModule) {
      const url = `${this.rawGithubUrl}/modules/${type}/${module}.js`
      const path = this.path.resolve(process.cwd(), 'modules', type, module + '.js')
      if (!this.fs.existsSync(path)) {
        let msg = `[-] Module ${module} không tồn tại!`
        console.log(msg)
        log.push(msg)
        continue;
      }
      var result = await this.download(url, path)
      if (result) {
        const { meewmeewConfig, config } = require(path);
        if (meewmeewConfig) this.setConfig(`${module}`, meewmeewConfig, ['modules'])
        else this.setConfig(`${module}`, {
          version: config.version,
          type: type,
        }, ['modules'])
        let msg = `[+] Module ${module} đã được cập nhật!`
        console.log(msg)
        log.push(msg)
      } else {
        let msg = `[-] Module ${module} không tồn tại!`
        console.log(msg)
        log.push(msg)
      }
    }
    return log;
  }

  async installAllModules(overwrite = false) {
    const log = []
    const modules = await this.listModules();
    for (const module of modules) {
      await this.installModule(module, 'commands', overwrite)
      let msg = `[+] Module ${module} đã được cài đặt!`
      console.log(msg)
      log.push(msg)
    }
    return log;
  }

  async updateAllModules() {
    const modules = await this.listModules();
    const local = await this.listModulesLocal();
    const log = []
    for (const module of modules) {
      const { name, type } = module;
      if (local[type][name] === module.version) continue;
      await this.updateModule(name, type)
      let msg = `[+] Module ${name} đã được cập nhật!`
      console.log(msg)
      log.push(msg)
    }
    return log;
  }

  async uninstallAllModules() {
    const local = await this.listModulesLocal();
    const log = []
    for (const module in local) {
      for (const name in local[module]) {
        await this.uninstallModule(name, module)
        let msg = `[+] Module ${name} đã được gỡ bỏ!`
        console.log(msg)
        log.push(msg)
      }
    }
    return log;
  }

  async listUpdateModules() {
    const modules = await this.listModules();
    const local = await this.listModulesLocal();
    const log = []
    for (const types in modules) {
      for (const module in modules[types]) {
        let localModule = local[types][module]
        let latestVersion = modules[types][module]
        if (localModule) {
          if (localModule.version === latestVersion) continue;
        };
        log.push(`[+] "${module}" ${localModule ? localModule.version : 'not installed'} -> ${latestVersion}`)
      }
    }
    return log;
  }

  trueType(type) {
    if (!['commands', 'events'].includes(type)) return false;
    return true;
  }

  async run({ api, event, args }) {
    try {
      const { threadID, messageID } = event;
      switch (args[0]) {
        case 'help':
          var update = `Cập nhật modules\n` +
            `- meewmeew update [type] [All/ModuleName]:\n` +
            ` + all: Cập nhật tất cả module có bản update.\n` +
            `  -> Exam: meewmeew update all\n` +
            ` + modules: Cập nhật module được chỉ định.\n` +
            `  -> Exam: meewmeew update commands module1 module2`;
          var install = `Cài đặt module\n` +
            `- meewmeew install [type] [All/ModuleName]:\n` +
            ` + all: Cài đặt tất cả module.\n` +
            `  -> Exam: meewmeew install commands all\n` +
            ` + modules: Cài đặt module được chỉ định.\n` +
            `  -> Exam: meewmeew install commands module1 module2`;
          var uninstall = `Gỡ bỏ module\n` +
            `- meewmeew uninstall [type] [All/ModuleName]:\n` +
            ` + all: Gỡ bỏ tất cả module.\n` +
            `  -> Exam: meewmeew uninstall all\n` +
            ` + modules: Gỡ bỏ module được chỉ định.\n` +
            `  -> Exam: meewmeew uninstall commands module1 module2`;
          var list = `Danh sách module\n` +
            `- meewmeew list [type]:\n` +
            ` + type: Hiển thị danh sách module theo loại.\n` +
            `  -> Exam: meewmeew list commands`;
          switch (args[1]) {
            case 'update':
              api.sendMessage(update, threadID, messageID);
              break;
            case 'install':
              api.sendMessage(install, threadID, messageID);
              break;
            case 'uninstall':
              api.sendMessage(uninstall, threadID, messageID);
              break;
            case 'list':
              api.sendMessage(list, threadID, messageID);
              break;
            default:
              api.sendMessage(`[-] meewmeew help [install/update/uninstall/list]`, threadID, messageID);
              break;
          }
          break;
        case 'install':
          if (args[1] === 'all') {
            api.sendMessage("Đang bắt đầu, vui lòng đợi trong giây lát !", event.threadID, event.messageID)
            var log = await this.installAllModules(true);
            return api.sendMessage(log.join('\n'), threadID);
          } else {
            var type = args[1];
            if (!this.trueType(type)) return api.sendMessage(`Loại không hợp lệ (commands/events)`, threadID, messageID);
            var modules = args.slice(2);
            api.sendMessage("Đang bắt đầu, vui lòng đợi trong giây lát !", event.threadID, event.messageID)
            var log = await this.installModule(modules, type, true);
            return api.sendMessage(log.join('\n'), threadID);
          }
        case 'uninstall':
          if (args[1] === 'all') {
            api.sendMessage("Đang bắt đầu, vui lòng đợi trong giây lát !", event.threadID, event.messageID)
            var log = await this.uninstallAllModules();
            return api.sendMessage(log.join('\n'), threadID);
          } else {
            var type = args[1];
            if (!this.trueType(type)) return api.sendMessage(`Loại không hợp lệ (commands/events)`, threadID, messageID);
            var modules = args.slice(2);
            api.sendMessage("Đang bắt đầu, vui lòng đợi trong giây lát !", event.threadID, event.messageID)
            var log = await this.uninstallModule(modules, type);
            return api.sendMessage(log.join('\n'), threadID);
          }
        case 'update':
          if (args[1] === 'all') {
            api.sendMessage("Đang bắt đầu, vui lòng đợi trong giây lát !", event.threadID, event.messageID)
            var log = await this.updateAllModules();
            return api.sendMessage(log.join('\n'), threadID);
          }
          else if (args[1] === 'list') {
            var log = await this.listUpdateModules();
            return api.sendMessage(log.join('\n'), threadID);
          }
          else {
            var type = args[1];
            if (!this.trueType(type)) return api.sendMessage(`Loại không hợp lệ (commands/events)`, threadID, messageID);
            var modules = args.slice(2);
            api.sendMessage("Đang bắt đầu, vui lòng đợi trong giây lát !", event.threadID, event.messageID)
            var log = await this.updateModule(modules, type);
            return api.sendMessage(log.join('\n'), threadID);
          }
        case 'list':
          var type = args[1];
          if (!this.trueType(type)) return api.sendMessage(`Loại không hợp lệ (commands/events)`, threadID, messageID);
          var list = await this.listModules(type);
          var msg = (Object.entries(list)).map((el, index) => {
            return `[${index + 1}] ${el[0]} - ${el[1]}`;
          }).join('\n');
          return api.sendMessage(msg, threadID);
        default:
          return api.sendMessage(`[+] Command không hợp lệ!`, threadID, messageID);
      }
    } catch (error) {
      console.log('\n\n\n')
      console.log(error);
    }
  }
}

module.exports = new MeewMeewModule();