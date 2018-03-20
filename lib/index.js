'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dict = exports.cache = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _cache = require('./cache');

var _dictionaryLoader = require('./dictionary-loader');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cache = exports.cache = {
  CacheManager: _cache.CacheManager,
  CacheAdapter: _cache.CacheAdapter,
  MemoryCacheAdapter: _cache.MemoryCacheAdapter
};

var dict = exports.dict = {
  DictionaryLoader: _dictionaryLoader.DictionaryLoader,
  CacheableDictionaryLoader: _dictionaryLoader.CacheableDictionaryLoader
};

var AddressResolver = function () {
  function AddressResolver() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _cache.MemoryCacheAdapter();

    _classCallCheck(this, AddressResolver);

    this.dictLoader = new _dictionaryLoader.CacheableDictionaryLoader(adapter);
  }

  /**
   * Find the address from the postal code
   *
   * @param {string} code
   * @return Promise<Object>
   * @throws {AddressNotFoundError} Thrown if the address is not found
   */


  _createClass(AddressResolver, [{
    key: 'find',
    value: function find(code) {
      var _this = this;

      return this.verifyCode(code).then(function (result) {
        if (!result.passed) {
          return _this.emptyResult();
        }
        return _this.loadAddressByCode(result.postalCode);
      });
    }
  }, {
    key: 'verifyCode',
    value: function verifyCode(code) {
      var postalCode = (code || '').replace(/-/, '');
      var result = postalCode.length < 7 ? false : true;

      return _bluebird.Promise.resolve({
        passed: result,
        postalCode: postalCode
      });
    }
  }, {
    key: 'loadAddressByCode',
    value: function loadAddressByCode(postalCode) {
      var _this2 = this;

      var prefix = postalCode.substr(0, 3);

      return this.dictLoader.loadFromPrefix(prefix).then(function (dict) {
        if (!dict[postalCode]) {
          return _this2.emptyResult();
        }
        var results = dict[postalCode] || null;
        return results;
      });
    }
  }, {
    key: 'emptyResult',
    value: function emptyResult() {
      return _bluebird.Promise.resolve(null);
    }
  }]);

  return AddressResolver;
}();

exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjYWNoZSIsIkNhY2hlTWFuYWdlciIsIkNhY2hlQWRhcHRlciIsIk1lbW9yeUNhY2hlQWRhcHRlciIsImRpY3QiLCJEaWN0aW9uYXJ5TG9hZGVyIiwiQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciIsIkFkZHJlc3NSZXNvbHZlciIsImFkYXB0ZXIiLCJkaWN0TG9hZGVyIiwiY29kZSIsInZlcmlmeUNvZGUiLCJ0aGVuIiwicmVzdWx0IiwicGFzc2VkIiwiZW1wdHlSZXN1bHQiLCJsb2FkQWRkcmVzc0J5Q29kZSIsInBvc3RhbENvZGUiLCJyZXBsYWNlIiwibGVuZ3RoIiwicmVzb2x2ZSIsInByZWZpeCIsInN1YnN0ciIsImxvYWRGcm9tUHJlZml4IiwicmVzdWx0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxJQUFNQSx3QkFBUTtBQUNuQkMsbUNBRG1CO0FBRW5CQyxtQ0FGbUI7QUFHbkJDO0FBSG1CLENBQWQ7O0FBTUEsSUFBTUMsc0JBQU87QUFDbEJDLHNEQURrQjtBQUVsQkM7QUFGa0IsQ0FBYjs7SUFLY0MsZTtBQUNuQiw2QkFBZ0Q7QUFBQSxRQUFwQ0MsT0FBb0MsdUVBQTFCLCtCQUEwQjs7QUFBQTs7QUFDOUMsU0FBS0MsVUFBTCxHQUFrQixnREFBOEJELE9BQTlCLENBQWxCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O3lCQU9LRSxJLEVBQU07QUFBQTs7QUFDVCxhQUFPLEtBQUtDLFVBQUwsQ0FBZ0JELElBQWhCLEVBQXNCRSxJQUF0QixDQUEyQixVQUFDQyxNQUFELEVBQVk7QUFDNUMsWUFBSSxDQUFDQSxPQUFPQyxNQUFaLEVBQW9CO0FBQ2xCLGlCQUFPLE1BQUtDLFdBQUwsRUFBUDtBQUNEO0FBQ0QsZUFBTyxNQUFLQyxpQkFBTCxDQUF1QkgsT0FBT0ksVUFBOUIsQ0FBUDtBQUNELE9BTE0sQ0FBUDtBQU1EOzs7K0JBQ1VQLEksRUFBTTtBQUNmLFVBQU1PLGFBQWEsQ0FBQ1AsUUFBUSxFQUFULEVBQWFRLE9BQWIsQ0FBcUIsR0FBckIsRUFBMEIsRUFBMUIsQ0FBbkI7QUFDQSxVQUFNTCxTQUFVSSxXQUFXRSxNQUFYLEdBQW9CLENBQXJCLEdBQTBCLEtBQTFCLEdBQWtDLElBQWpEOztBQUVBLGFBQU8sa0JBQVFDLE9BQVIsQ0FBZ0I7QUFDckJOLGdCQUFRRCxNQURhO0FBRXJCSSxvQkFBWUE7QUFGUyxPQUFoQixDQUFQO0FBSUQ7OztzQ0FDaUJBLFUsRUFBWTtBQUFBOztBQUM1QixVQUFNSSxTQUFTSixXQUFXSyxNQUFYLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLENBQWY7O0FBRUEsYUFBTyxLQUFLYixVQUFMLENBQWdCYyxjQUFoQixDQUErQkYsTUFBL0IsRUFBdUNULElBQXZDLENBQTRDLFVBQUNSLElBQUQsRUFBVTtBQUMzRCxZQUFJLENBQUNBLEtBQUthLFVBQUwsQ0FBTCxFQUF1QjtBQUNyQixpQkFBTyxPQUFLRixXQUFMLEVBQVA7QUFDRDtBQUNELFlBQU1TLFVBQVVwQixLQUFLYSxVQUFMLEtBQW9CLElBQXBDO0FBQ0EsZUFBT08sT0FBUDtBQUNELE9BTk0sQ0FBUDtBQU9EOzs7a0NBQ2E7QUFDWixhQUFPLGtCQUFRSixPQUFSLENBQWdCLElBQWhCLENBQVA7QUFDRDs7Ozs7O2tCQTFDa0JiLGUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyLCBNZW1vcnlDYWNoZUFkYXB0ZXIsIENhY2hlQWRhcHRlciB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciwgRGljdGlvbmFyeUxvYWRlciB9IGZyb20gJy4vZGljdGlvbmFyeS1sb2FkZXInO1xuXG5leHBvcnQgY29uc3QgY2FjaGUgPSB7XG4gIENhY2hlTWFuYWdlcjogQ2FjaGVNYW5hZ2VyLFxuICBDYWNoZUFkYXB0ZXI6IENhY2hlQWRhcHRlcixcbiAgTWVtb3J5Q2FjaGVBZGFwdGVyOiBNZW1vcnlDYWNoZUFkYXB0ZXJcbn07XG5cbmV4cG9ydCBjb25zdCBkaWN0ID0ge1xuICBEaWN0aW9uYXJ5TG9hZGVyOiBEaWN0aW9uYXJ5TG9hZGVyLFxuICBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyOiBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0gbmV3IE1lbW9yeUNhY2hlQWRhcHRlcigpKSB7XG4gICAgdGhpcy5kaWN0TG9hZGVyID0gbmV3IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIoYWRhcHRlcik7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgYWRkcmVzcyBmcm9tIHRoZSBwb3N0YWwgY29kZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKiBAdGhyb3dzIHtBZGRyZXNzTm90Rm91bmRFcnJvcn0gVGhyb3duIGlmIHRoZSBhZGRyZXNzIGlzIG5vdCBmb3VuZFxuICAgKi9cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5Q29kZShjb2RlKS50aGVuKChyZXN1bHQpID0+44CAe1xuICAgICAgaWYgKCFyZXN1bHQucGFzc2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0J5Q29kZShyZXN1bHQucG9zdGFsQ29kZSk7XG4gICAgfSk7XG4gIH1cbiAgdmVyaWZ5Q29kZShjb2RlKSB7XG4gICAgY29uc3QgcG9zdGFsQ29kZSA9IChjb2RlIHx8ICcnKS5yZXBsYWNlKC8tLywgJycpO1xuICAgIGNvbnN0IHJlc3VsdCA9IChwb3N0YWxDb2RlLmxlbmd0aCA8IDcpID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICBwYXNzZWQ6IHJlc3VsdCxcbiAgICAgIHBvc3RhbENvZGU6IHBvc3RhbENvZGVcbiAgICB9KTtcbiAgfVxuICBsb2FkQWRkcmVzc0J5Q29kZShwb3N0YWxDb2RlKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcG9zdGFsQ29kZS5zdWJzdHIoMCwgMyk7XG5cbiAgICByZXR1cm4gdGhpcy5kaWN0TG9hZGVyLmxvYWRGcm9tUHJlZml4KHByZWZpeCkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKCFkaWN0W3Bvc3RhbENvZGVdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXN1bHRzID0gZGljdFtwb3N0YWxDb2RlXSB8fCBudWxsO1xuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSk7XG4gIH1cbiAgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxufVxuIl19