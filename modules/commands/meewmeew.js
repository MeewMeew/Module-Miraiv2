class MeewMeewModule {
  constructor() {
    this.fs = global.nodemodule['fs-extra']
    this.path = global.nodemodule['path']
    this.got = global.nodemodule['got']
    this.makeConfig();
    this.updateOnLoad();
  }
  get config() {
    return {
      name: 'meewmeew',
      version: '2.3.0',
      hasPermssion: 2,
      credits: 'MeewMeew',
      description: 'Tải, cập nhật, gỡ bỏ các module của meewmeew',
      commandCategory: 'admin',
      usages: 'help',
      cooldowns: 1,
      dependencies: {
        got: '11.8.3'
      },
      meewmeewConfig: {
        autoUpdate: true,
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
    const write = this.fs.createWriteStream(path);
    const response = await this.got(url);
    response.body.pipe(write);
    return new Promise((resolve, reject) => {
      write.on('finish', resolve);
      write.on('error', reject);
    });
  }

  async makeConfig() {
    if (!this.fs.existsSync(this.configPath)) {
      const config = {
        APIKEY: '',
        modules: {
          commands: {},
          events: {}
        }
      }
      this.fs.writeFileSync(this.configPath, JSON.stringify(config, null, 4), 'utf8');
    }
  }

  async setConfig(key, value, [...keys]) {
    const data = this.fs.readFileSync(this.configPath, 'utf8');
    const config = JSON.parse(data);
    if (keys.length != 0) {
      let temp = config[key]
      for (const el of keys) {
        temp = temp[el]
      }
      temp[keys[keys.length - 1]] = value
    } else config[key] = value
    const json = JSON.stringify(config, null, 2);
    this.fs.writeFileSync(this.configPath, json, 'utf8');
    return;
  }

  async deleteKey(key, [...keys]) {
    const data = this.fs.readFileSync(this.configPath, 'utf8');
    const config = JSON.parse(data);
    if (keys.length != 0) {
      let temp = config[key]
      for (const el of keys) {
        temp = temp[el]
      }
      delete temp[keys[keys.length - 1]]
    } else delete config[key]
    const json = JSON.stringify(config, null, 2);
    this.fs.writeFileSync(this.configPath, json, 'utf8');
    return;
  }

  async getConfig(key) {
    const data = this.fs.readFileSync(this.configPath, 'utf8');
    const config = JSON.parse(data);
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

  async updateOnLoad() {
    var modules = await this.getConfig('modules');
    var meewmeew = modules['meewmeew'];
    if (meewmeew && meewmeew.autoUpdate) {
      await this.updateAllModules()
    }
  }

  async installModule(name, type = "commands", overwrite = false) {
    if (this.getType(name) === "String") var allModule = [name]
    else if (this.getType(name) === "Array") var allModule = name
    else throw new TypeError("Module name must be a string or array of strings")
    const log = []
    for (const module of allModule) {
      const url = `${this.rawGithubUrl}/modules/${type}/${module}.js`
      const path = this.path.resolve(process.cwd(), 'modules', type, module + '.js')
      if (this.fs.existsSync(path) && !overwrite) {
        log.push(`[-] Module ${module} đã tồn tại! Bật chế độ overwrite để buộc ghi đè.`)
        continue;
      }
      await this.download(url, path)
      const { meewmeewConfig, config } = require(path);
      if (meewmeewConfig) this.setConfig(`${module}`, meewmeewConfig, ['modules'])
      else this.setConfig(`${module}`, {
        version: config.version,
        type: type,
      }, ['modules'])
      log.push(`[+] Module ${module} đã được cài đặt!`)
    }
    return log;
  }

  async uninstallModule(name, type = "commands") {
    if (this.getType(name) === "String") var allModule = [name]
    else if (this.getType(name) === "Array") var allModule = name
    else throw new TypeError("Module name must be a string or array of strings")
    const log = []
    for (const module of allModule) {
      const path = this.path.resolve(process.cwd(), 'modules', type, module + '.js')
      if (!this.fs.existsSync(path)) {
        log.push(`[-] Module ${module} không tồn tại!`)
        continue;
      }
      this.fs.unlinkSync(path)
      await this.deleteKey(`${module}`, ['modules'])
      log.push(`[+] Module ${module} đã được gỡ bỏ!`)
    }
    return log;
  }

  async updateModule(name, type = "commands") {
    if (this.getType(name) === "String") var allModule = [name]
    else if (this.getType(name) === "Array") var allModule = name
    else throw new TypeError("Module name must be a string or array of strings")
    const log = []
    for (const module of allModule) {
      const url = `${this.rawGithubUrl}/modules/${type}/${module}.js`
      const path = this.path.resolve(process.cwd(), 'modules', type, module + '.js')
      if (!this.fs.existsSync(path)) {
        log.push(`[-] Module ${module} không tồn tại!`)
        continue;
      }
      await this.download(url, path)
      const { meewmeewConfig, config } = require(path);
      if (meewmeewConfig) this.setConfig(`${module}`, meewmeewConfig, ['modules'])
      else this.setConfig(`${module}`, {
        version: config.version,
        type: type,
      }, ['modules'])
      log.push(`[+] Module ${module} đã được cập nhật!`)
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
      log.push(`[+] Module ${name} đã được cập nhật!`)
    }
    return log;
  }

  async uninstallAllModules() {
    const local = await this.listModulesLocal();
    const log = []
    for (const module in local) {
      for (const name in local[module]) {
        await this.uninstallModule(name, module)
        log.push(`[+] Module ${name} đã được gỡ bỏ!`)
      }
    }
    return log;
  }

  async listUpdateModules() {
    const modules = await this.listModules().catch(console.error);
    const local = await this.listModulesLocal().catch(console.error);
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
    const { threadID, messageID } = event;
    switch (args[0]) {
      case 'help':
        var update = `Cập nhật modules\n` +
          `- meewmeew update [type] [All/ModuleName]:\n` +
          ` + all: Cập nhật tất cả module có bản update.\n` +
          `  -> Exam: meewmeew update all\n` +
          ` + modules: Cập nhật module được chỉ định.\n` +
          `  -> Exam: meewmeew update commands module1 module2\n\n`;
        var install = `Cài đặt module\n` +
          `- meewmeew install [type] [All/ModuleName] [overwrite]:\n` +
          ` + all: Cài đặt tất cả module.\n` +
          `  -> Exam: meewmeew install commands all true\n` +
          ` + modules: Cài đặt module được chỉ định.\n` +
          `  -> Exam: meewmeew install commands module1 module2\n` +
          ` + overwrite: Cài đặt module được chỉ định và ghi đè lên module đã cài đặt nếu trùng tên.\n` +
          `  -> Exam: meewmeew install commands module1 module2 true\n\n`;
        var uninstall = `Gỡ bỏ module\n` +
          `- meewmeew uninstall [type] [All/ModuleName]:\n` +
          ` + all: Gỡ bỏ tất cả module.\n` +
          `  -> Exam: meewmeew uninstall all\n` +
          ` + modules: Gỡ bỏ module được chỉ định.\n` +
          `  -> Exam: meewmeew uninstall commands module1 module2\n\n`;
        var list =  `Danh sách module\n` +
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
        // get last item of args without change args
        const overwrite = args.at(-1) === 'true' || false;

        if (args[1] === 'all') {
          var log = await this.installAllModules(overwrite);
          return api.sendMessage(log.join('\n'), threadID, messageID);
        } else {
          var type = args[1];
          if (!this.trueType(type)) return api.sendMessage(`Loại không hợp lệ (commands/events)`, threadID, messageID);
          var modules = args.slice(2);
          if (overwrite) modules = modules.slice(0, -1);
          var log = await this.installModule(modules, type, overwrite);
          return api.sendMessage(log.join('\n'), threadID, messageID);
        }
      case 'uninstall':
        if (args[1] === 'all') {
          var log = await this.uninstallAllModules();
          return api.sendMessage(log.join('\n'), threadID, messageID);
        } else {
          var type = args[1];
          if (!this.trueType(type)) return api.sendMessage(`Loại không hợp lệ (commands/events)`, threadID, messageID);
          var modules = args.slice(2);
          var log = await this.uninstallModule(modules, type);
          return api.sendMessage(log.join('\n'), threadID, messageID);
        }
      case 'update':
        if (args[1] === 'all') {
          var log = await this.updateAllModules();
          return api.sendMessage(log.join('\n'), threadID, messageID);
        }
        else if (args[1] === 'list') {
          var log = await this.listUpdateModules();
          return api.sendMessage(log.join('\n'), threadID, messageID);
        }
        else {
          var type = args[1];
          if (!this.trueType(type)) return api.sendMessage(`Loại không hợp lệ (commands/events)`, threadID, messageID);
          var modules = args.slice(2);
          var log = await this.updateModule(modules, type);
          return api.sendMessage(log.join('\n'), threadID, messageID);
        }
      case 'list':
        var type = args[1];
        if (!this.trueType(type)) return api.sendMessage(`Loại không hợp lệ (commands/events)`, threadID, messageID);
        var list = await this.listModules(type);
        var msg = (Object.entries(list)).map((el, index) => {
          return `[${index + 1}] ${el[0]} - ${el[1]}`;
        }).join('\n');
        return api.sendMessage(msg, threadID, messageID);
      default:
        return api.sendMessage(`[+] Command không hợp lệ!`, threadID, messageID);
    }
  }
}

module.exports = new MeewMeewModule();