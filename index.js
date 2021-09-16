const DeepProxy = require("@danisl99/deep-proxy");
const fs = require("fs");

module.exports = class {
  constructor(file) {
    this.queue = [];
    this.file = file;
    const that = this;
    const handler = {
      set: async function (obj, prop, value) {
        obj[prop] = value;
        await that.save();
      },
      deleteProperty: function (obj, prop) {
        delete obj[prop];
        that.save();
      },
    };

    let data;
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(this.file, "{}");
      data = {};
    } else {
      data = JSON.parse(fs.readFileSync(this.file));
    }

    this.data = new DeepProxy(data, handler);
    return this.data;
  }

  async save() {
    return new Promise((resolve) => {
      fs.writeFile(this.file, JSON.stringify(this.data), () => {
        resolve(true);
      });
    });
  }
}
