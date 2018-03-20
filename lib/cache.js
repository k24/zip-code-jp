'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheManager = exports.MemoryCacheAdapter = exports.CacheAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CacheAdapter = exports.CacheAdapter = function () {
  function CacheAdapter() {
    _classCallCheck(this, CacheAdapter);
  }

  _createClass(CacheAdapter, [{
    key: 'find',

    /**
     * Search the dictionary from the cache
     *
     * @param {string} prefix
     * @return Promise<Object>
     */
    value: function find(prefix) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }

    /**
     * Cache the dictionary
     *
     * @param {string} prefix
     * @param {Object} dict
     * @return Promise<void>
     */

  }, {
    key: 'store',
    value: function store(prefix, dict) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }
  }]);

  return CacheAdapter;
}();

var MemoryCacheAdapter = exports.MemoryCacheAdapter = function (_CacheAdapter) {
  _inherits(MemoryCacheAdapter, _CacheAdapter);

  function MemoryCacheAdapter() {
    _classCallCheck(this, MemoryCacheAdapter);

    var _this = _possibleConstructorReturn(this, (MemoryCacheAdapter.__proto__ || Object.getPrototypeOf(MemoryCacheAdapter)).call(this));

    _this.cache = new Map();
    return _this;
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */


  _createClass(MemoryCacheAdapter, [{
    key: 'find',
    value: function find(prefix) {
      var dict = this.cache.get(prefix);

      if (!dict) {
        return _bluebird.Promise.resolve(null);
      }

      return _bluebird.Promise.resolve(dict);
    }

    /**
     * Cache the dictionary
     *
     * @param {string} prefix
     * @param {Object} dict
     * @return Promise<void>
     */

  }, {
    key: 'store',
    value: function store(prefix, dict) {
      this.cache.set(prefix, dict);
      return _bluebird.Promise.resolve();
    }
  }]);

  return MemoryCacheAdapter;
}(CacheAdapter);

var CacheManager = exports.CacheManager = function () {
  function CacheManager(adapter) {
    _classCallCheck(this, CacheManager);

    this.adapter = adapter;
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */


  _createClass(CacheManager, [{
    key: 'find',
    value: function find(prefix) {
      return this.adapter.find(prefix);
    }

    /**
     * Cache the dictionary
     *
     * @param {string} prefix
     * @param {Object} dict
     * @return Promise<void>
     */

  }, {
    key: 'store',
    value: function store(prefix, dict) {
      return this.adapter.store(prefix, dict);
    }
  }]);

  return CacheManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS5qcyJdLCJuYW1lcyI6WyJDYWNoZUFkYXB0ZXIiLCJwcmVmaXgiLCJFcnJvciIsImRpY3QiLCJNZW1vcnlDYWNoZUFkYXB0ZXIiLCJjYWNoZSIsIk1hcCIsImdldCIsInJlc29sdmUiLCJzZXQiLCJDYWNoZU1hbmFnZXIiLCJhZGFwdGVyIiwiZmluZCIsInN0b3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFYUEsWSxXQUFBQSxZOzs7Ozs7OztBQUNYOzs7Ozs7eUJBTUtDLE0sRUFBUTtBQUNYLFlBQU0sSUFBSUMsS0FBSixDQUFVLDBEQUFWLENBQU47QUFDRDs7QUFFRDs7Ozs7Ozs7OzswQkFPTUQsTSxFQUFRRSxJLEVBQU07QUFDbEIsWUFBTSxJQUFJRCxLQUFKLENBQVUsMERBQVYsQ0FBTjtBQUNEOzs7Ozs7SUFHVUUsa0IsV0FBQUEsa0I7OztBQUNYLGdDQUFjO0FBQUE7O0FBQUE7O0FBRVosVUFBS0MsS0FBTCxHQUFhLElBQUlDLEdBQUosRUFBYjtBQUZZO0FBR2I7O0FBRUQ7Ozs7Ozs7Ozs7eUJBTUtMLE0sRUFBUTtBQUNYLFVBQU1FLE9BQU8sS0FBS0UsS0FBTCxDQUFXRSxHQUFYLENBQWVOLE1BQWYsQ0FBYjs7QUFFQSxVQUFJLENBQUNFLElBQUwsRUFBVztBQUNULGVBQU8sa0JBQVFLLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sa0JBQVFBLE9BQVIsQ0FBZ0JMLElBQWhCLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7OzswQkFPTUYsTSxFQUFRRSxJLEVBQU07QUFDbEIsV0FBS0UsS0FBTCxDQUFXSSxHQUFYLENBQWVSLE1BQWYsRUFBdUJFLElBQXZCO0FBQ0EsYUFBTyxrQkFBUUssT0FBUixFQUFQO0FBQ0Q7Ozs7RUFoQ3FDUixZOztJQW1DM0JVLFksV0FBQUEsWTtBQUNYLHdCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFNBQUtBLE9BQUwsR0FBZUEsT0FBZjtBQUNEOztBQUVEOzs7Ozs7Ozs7O3lCQU1LVixNLEVBQVE7QUFDWCxhQUFPLEtBQUtVLE9BQUwsQ0FBYUMsSUFBYixDQUFrQlgsTUFBbEIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OzBCQU9NQSxNLEVBQVFFLEksRUFBTTtBQUNsQixhQUFPLEtBQUtRLE9BQUwsQ0FBYUUsS0FBYixDQUFtQlosTUFBbkIsRUFBMkJFLElBQTNCLENBQVA7QUFDRCIsImZpbGUiOiJjYWNoZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBjbGFzcyBDYWNoZUFkYXB0ZXIge1xuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGZpbmQocHJlZml4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmVmZXIgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGV4YW1pbmUgdGhlIGNhY2hlLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhY2hlIHRoZSBkaWN0aW9uYXJ5XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHBhcmFtIHtPYmplY3R9IGRpY3RcbiAgICogQHJldHVybiBQcm9taXNlPHZvaWQ+XG4gICAqL1xuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSByZWZlciB0byB0aGUgaW1wbGVtZW50YXRpb24gdG8gZXhhbWluZSB0aGUgY2FjaGUuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1lbW9yeUNhY2hlQWRhcHRlciBleHRlbmRzIENhY2hlQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgZmluZChwcmVmaXgpIHtcbiAgICBjb25zdCBkaWN0ID0gdGhpcy5jYWNoZS5nZXQocHJlZml4KTtcblxuICAgIGlmICghZGljdCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRpY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhY2hlIHRoZSBkaWN0aW9uYXJ5XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHBhcmFtIHtPYmplY3R9IGRpY3RcbiAgICogQHJldHVybiBQcm9taXNlPHZvaWQ+XG4gICAqL1xuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICB0aGlzLmNhY2hlLnNldChwcmVmaXgsIGRpY3QpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHRoaXMuYWRhcHRlciA9IGFkYXB0ZXI7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGZpbmQocHJlZml4KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5maW5kKHByZWZpeCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FjaGUgdGhlIGRpY3Rpb25hcnlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcGFyYW0ge09iamVjdH0gZGljdFxuICAgKiBAcmV0dXJuIFByb21pc2U8dm9pZD5cbiAgICovXG4gIHN0b3JlKHByZWZpeCwgZGljdCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuc3RvcmUocHJlZml4LCBkaWN0KTtcbiAgfVxufVxuIl19