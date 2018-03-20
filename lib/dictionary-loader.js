'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheableDictionaryLoader = exports.DictionaryLoader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _cache = require('./cache');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DictionaryLoader = exports.DictionaryLoader = function () {
  function DictionaryLoader() {
    _classCallCheck(this, DictionaryLoader);
  }

  _createClass(DictionaryLoader, [{
    key: 'loadFromPrefix',

    /**
     * Search the dictionary from the cache
     *
     * @param {string} prefix
     * @return Promise<Object>
     */
    value: function loadFromPrefix(prefix) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }
  }]);

  return DictionaryLoader;
}();

var CacheableDictionaryLoader = exports.CacheableDictionaryLoader = function (_DictionaryLoader) {
  _inherits(CacheableDictionaryLoader, _DictionaryLoader);

  function CacheableDictionaryLoader(adapter) {
    _classCallCheck(this, CacheableDictionaryLoader);

    var _this = _possibleConstructorReturn(this, (CacheableDictionaryLoader.__proto__ || Object.getPrototypeOf(CacheableDictionaryLoader)).call(this));

    _this.cacheManager = new _cache.CacheManager(adapter);
    return _this;
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */


  _createClass(CacheableDictionaryLoader, [{
    key: 'loadFromPrefix',
    value: function loadFromPrefix(prefix) {
      var _this2 = this;

      return this.loadAddressDictionaryFromCache(prefix).then(function (dict) {
        if (dict) {
          return dict;
        }
        return _this2.loadAddressDictionaryFromFile(prefix);
      });
    }
  }, {
    key: 'loadAddressDictionaryFromCache',
    value: function loadAddressDictionaryFromCache(prefix) {
      return this.cacheManager.find(prefix);
    }
  }, {
    key: 'loadAddressDictionaryFromFile',
    value: function loadAddressDictionaryFromFile(prefix) {
      var _this3 = this;

      return new _bluebird.Promise(function (resolve, reject) {
        var dict = require('../json/' + 'zip-' + prefix + '.json');

        try {
          _this3.cacheManager.store(prefix, dict);
          resolve(dict);
        } catch (err) {
          reject(err);
        }
      });
    }
  }]);

  return CacheableDictionaryLoader;
}(DictionaryLoader);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWxvYWRlci5qcyJdLCJuYW1lcyI6WyJEaWN0aW9uYXJ5TG9hZGVyIiwicHJlZml4IiwiRXJyb3IiLCJDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyIiwiYWRhcHRlciIsImNhY2hlTWFuYWdlciIsImxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21DYWNoZSIsInRoZW4iLCJkaWN0IiwibG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUZpbGUiLCJmaW5kIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJzdG9yZSIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0lBRWFBLGdCLFdBQUFBLGdCOzs7Ozs7OztBQUNYOzs7Ozs7bUNBTWVDLE0sRUFBUTtBQUNyQixZQUFNLElBQUlDLEtBQUosQ0FBVSwwREFBVixDQUFOO0FBQ0Q7Ozs7OztJQUdVQyx5QixXQUFBQSx5Qjs7O0FBQ1gscUNBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFFbkIsVUFBS0MsWUFBTCxHQUFvQix3QkFBaUJELE9BQWpCLENBQXBCO0FBRm1CO0FBR3BCOztBQUVEOzs7Ozs7Ozs7O21DQU1lSCxNLEVBQVE7QUFBQTs7QUFDckIsYUFBTyxLQUFLSyw4QkFBTCxDQUFvQ0wsTUFBcEMsRUFBNENNLElBQTVDLENBQWlELFVBQUNDLElBQUQsRUFBVTtBQUNoRSxZQUFJQSxJQUFKLEVBQVU7QUFDUixpQkFBT0EsSUFBUDtBQUNEO0FBQ0QsZUFBTyxPQUFLQyw2QkFBTCxDQUFtQ1IsTUFBbkMsQ0FBUDtBQUNELE9BTE0sQ0FBUDtBQU1EOzs7bURBQzhCQSxNLEVBQVE7QUFDckMsYUFBTyxLQUFLSSxZQUFMLENBQWtCSyxJQUFsQixDQUF1QlQsTUFBdkIsQ0FBUDtBQUNEOzs7a0RBQzZCQSxNLEVBQVE7QUFBQTs7QUFDcEMsYUFBTyxzQkFBWSxVQUFDVSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBTUosT0FBT0ssUUFBUSxhQUFZLE1BQVosR0FBcUJaLE1BQXJCLEdBQThCLE9BQXRDLENBQWI7O0FBRUEsWUFBSTtBQUNGLGlCQUFLSSxZQUFMLENBQWtCUyxLQUFsQixDQUF3QmIsTUFBeEIsRUFBZ0NPLElBQWhDO0FBQ0FHLGtCQUFRSCxJQUFSO0FBQ0QsU0FIRCxDQUdFLE9BQU9PLEdBQVAsRUFBWTtBQUNaSCxpQkFBT0csR0FBUDtBQUNEO0FBQ0YsT0FUTSxDQUFQO0FBVUQ7Ozs7RUFsQzRDZixnQiIsImZpbGUiOiJkaWN0aW9uYXJ5LWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBDYWNoZU1hbmFnZXIgfSBmcm9tICcuL2NhY2hlJztcblxuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlMb2FkZXIge1xuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGxvYWRGcm9tUHJlZml4KHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciBleHRlbmRzIERpY3Rpb25hcnlMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuY2FjaGVNYW5hZ2VyID0gbmV3IENhY2hlTWFuYWdlcihhZGFwdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgbG9hZEZyb21QcmVmaXgocHJlZml4KSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKGRpY3QpIHtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tRmlsZShwcmVmaXgpO1xuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21DYWNoZShwcmVmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZU1hbmFnZXIuZmluZChwcmVmaXgpO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBkaWN0ID0gcmVxdWlyZSgnLi4vanNvbi8nKyAnemlwLScgKyBwcmVmaXggKyAnLmpzb24nKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5jYWNoZU1hbmFnZXIuc3RvcmUocHJlZml4LCBkaWN0KTtcbiAgICAgICAgcmVzb2x2ZShkaWN0KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19