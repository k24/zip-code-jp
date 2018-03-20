import { Promise } from 'bluebird';
import { CacheManager } from './cache';

export class DictionaryLoader {
  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  loadFromPrefix(prefix) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
}

export class CacheableDictionaryLoader extends DictionaryLoader {
  constructor(adapter) {
    super()
    this.cacheManager = new CacheManager(adapter);
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  loadFromPrefix(prefix) {
    return this.loadAddressDictionaryFromCache(prefix).then((dict) => {
      if (dict) {
        return dict;
      }
      return this.loadAddressDictionaryFromFile(prefix);
    });
  }
  loadAddressDictionaryFromCache(prefix) {
    return this.cacheManager.find(prefix);
  }
  loadAddressDictionaryFromFile(prefix) {
    return new Promise((resolve, reject) => {
      const dict = require('../json/'+ 'zip-' + prefix + '.json');

      try {
        this.cacheManager.store(prefix, dict);
        resolve(dict);
      } catch (err) {
        reject(err);
      }
    });
  }
}
