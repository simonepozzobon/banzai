import { app } from 'electron';
import path from 'path';
import fs from 'fs';

const LocalStorage = (() => {
  let instance = null;

  function createInstance(opts) {
    const pathName = opts.pathName || 'userData';
    const userDataPath = app.getPath(pathName);

    const configName = `${opts.configName}.json`;
    const defaults = opts.defaults;

    const filePath = path.join(userDataPath, configName);

    console.log(filePath);

    const parseDataFile = (filePath, defaults) => {
      try {
        return JSON.parse(fs.readFileSync(filePath));
      } catch (error) {
        return defaults;
      }
    };

    const data = parseDataFile(filePath, defaults);

    return {
      path: filePath,
      configName,
      defaults,
      data,

      has(key) {
        return this.data.hasOwnProperty(key);
      },

      get(key) {
        return this.data?.[key] ?? this.defaults?.[key] ?? null;
      },

      set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
      },
    };
  }

  return {
    getInstance: function (opts) {
      if (!instance) {
        instance = createInstance(opts);
      }
      return instance;
    },
  };
})();

export default LocalStorage;
