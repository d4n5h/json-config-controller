const DeepProxy = require("@danisl99/deep-proxy");
const fs = require("fs");
const events = require('events');

module.exports = class {
    constructor(file) {
        this.queue = [];
        this.file = file;
        this.em = new events.EventEmitter();

        const that = this;

        const handler = {
            set: async function (obj, prop, value) {
                obj[prop] = value;
                that.em.emit(prop, value);
                await that.save();
            },
            deleteProperty: async function (obj, prop) {
                delete obj[prop];
                await that.save();
            },
        };

        let data;

        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, "{}");
            data = {};
        } else {
            data = JSON.parse(fs.readFileSync(this.file));
        }

        this.em.data = new DeepProxy(data, handler);

        return this.em;
    }

    async save() {
        return new Promise((resolve) => {
            fs.writeFile(this.file, JSON.stringify(this.em.data), () => {
                resolve(true);
            });
        });
    }
}
