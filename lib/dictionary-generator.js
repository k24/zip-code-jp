'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _zipCodeJpStream = require('zip-code-jp-stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var writeFile = _bluebird.Promise.promisify(_fs2.default.writeFile);

var DictionaryGenerator = function () {
  function DictionaryGenerator(output) {
    _classCallCheck(this, DictionaryGenerator);

    this.output = output || 'output';
    this.addresses = new Map();
    this.logger = console;
  }

  _createClass(DictionaryGenerator, [{
    key: 'indexing',
    value: function indexing(record) {
      var prefix = record.zip_code.substr(0, 3);
      var area = /^以下に掲載がない場合/.test(record.area) ? '' : record.area;

      var data = {
        prefecture: record.prefecture,
        city: record.city,
        area: area
      };

      var group = this.addresses.get(prefix) || new Map();
      var addresses = group.get(record.zip_code) || [];
      addresses.push(data);

      group.set(record.zip_code, addresses);
      this.addresses.set(prefix, group);
    }
  }, {
    key: 'generate',
    value: function generate() {
      var _this = this;

      var chain = _bluebird.Promise.resolve();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.addresses.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              prefix = _step$value[0],
              values = _step$value[1];

          chain.then(this.outputDictionary(prefix, values));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      chain.then(function () {
        return _this.end();
      });
    }
  }, {
    key: 'run',
    value: function run() {
      var _this2 = this;

      this.logger.info('generating dictionary');
      var stream = (0, _zipCodeJpStream.createFromZipFile)('ken_all.zip');
      stream.on('data', function (record) {
        return _this2.indexing(record);
      });
      stream.on('end', function () {
        return _this2.generate();
      });
    }
  }, {
    key: 'end',
    value: function end() {
      this.logger.info('dictionary is generated');
    }
  }, {
    key: 'outputDictionary',
    value: function outputDictionary(prefix, values) {
      var json = {};
      values.forEach(function (value, key) {
        return json[key] = value;
      });
      var content = JSON.stringify(json);

      return writeFile(this.output + '/zip-' + prefix + '.json', content);
    }
  }], [{
    key: 'from',
    value: function from(output) {
      return new DictionaryGenerator(output);
    }
  }]);

  return DictionaryGenerator;
}();

exports.default = DictionaryGenerator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWdlbmVyYXRvci5qcyJdLCJuYW1lcyI6WyJ3cml0ZUZpbGUiLCJwcm9taXNpZnkiLCJEaWN0aW9uYXJ5R2VuZXJhdG9yIiwib3V0cHV0IiwiYWRkcmVzc2VzIiwiTWFwIiwibG9nZ2VyIiwiY29uc29sZSIsInJlY29yZCIsInByZWZpeCIsInppcF9jb2RlIiwic3Vic3RyIiwiYXJlYSIsInRlc3QiLCJkYXRhIiwicHJlZmVjdHVyZSIsImNpdHkiLCJncm91cCIsImdldCIsInB1c2giLCJzZXQiLCJjaGFpbiIsInJlc29sdmUiLCJlbnRyaWVzIiwidmFsdWVzIiwidGhlbiIsIm91dHB1dERpY3Rpb25hcnkiLCJlbmQiLCJpbmZvIiwic3RyZWFtIiwib24iLCJpbmRleGluZyIsImdlbmVyYXRlIiwianNvbiIsImZvckVhY2giLCJ2YWx1ZSIsImtleSIsImNvbnRlbnQiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxrQkFBUUMsU0FBUixDQUFrQixhQUFHRCxTQUFyQixDQUFsQjs7SUFFcUJFLG1CO0FBQ25CLCtCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFNBQUtBLE1BQUwsR0FBY0EsVUFBVSxRQUF4QjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBSUMsR0FBSixFQUFqQjtBQUNBLFNBQUtDLE1BQUwsR0FBY0MsT0FBZDtBQUNEOzs7OzZCQUNRQyxNLEVBQVE7QUFDZixVQUFNQyxTQUFTRCxPQUFPRSxRQUFQLENBQWdCQyxNQUFoQixDQUF1QixDQUF2QixFQUEwQixDQUExQixDQUFmO0FBQ0EsVUFBTUMsT0FBUSxjQUFjQyxJQUFkLENBQW1CTCxPQUFPSSxJQUExQixDQUFELEdBQW9DLEVBQXBDLEdBQXlDSixPQUFPSSxJQUE3RDs7QUFFQSxVQUFNRSxPQUFPO0FBQ1hDLG9CQUFZUCxPQUFPTyxVQURSO0FBRVhDLGNBQU1SLE9BQU9RLElBRkY7QUFHWEosY0FBTUE7QUFISyxPQUFiOztBQU1BLFVBQU1LLFFBQVEsS0FBS2IsU0FBTCxDQUFlYyxHQUFmLENBQW1CVCxNQUFuQixLQUE4QixJQUFJSixHQUFKLEVBQTVDO0FBQ0EsVUFBTUQsWUFBWWEsTUFBTUMsR0FBTixDQUFVVixPQUFPRSxRQUFqQixLQUE4QixFQUFoRDtBQUNBTixnQkFBVWUsSUFBVixDQUFlTCxJQUFmOztBQUVBRyxZQUFNRyxHQUFOLENBQVVaLE9BQU9FLFFBQWpCLEVBQTJCTixTQUEzQjtBQUNBLFdBQUtBLFNBQUwsQ0FBZWdCLEdBQWYsQ0FBbUJYLE1BQW5CLEVBQTJCUSxLQUEzQjtBQUNEOzs7K0JBQ1U7QUFBQTs7QUFDVCxVQUFJSSxRQUFRLGtCQUFRQyxPQUFSLEVBQVo7QUFEUztBQUFBO0FBQUE7O0FBQUE7QUFFVCw2QkFBK0IsS0FBS2xCLFNBQUwsQ0FBZW1CLE9BQWYsRUFBL0IsOEhBQXlEO0FBQUE7QUFBQSxjQUE5Q2QsTUFBOEM7QUFBQSxjQUF0Q2UsTUFBc0M7O0FBQ3ZESCxnQkFBTUksSUFBTixDQUFXLEtBQUtDLGdCQUFMLENBQXNCakIsTUFBdEIsRUFBOEJlLE1BQTlCLENBQVg7QUFDRDtBQUpRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS1RILFlBQU1JLElBQU4sQ0FBVztBQUFBLGVBQU0sTUFBS0UsR0FBTCxFQUFOO0FBQUEsT0FBWDtBQUNEOzs7MEJBQ0s7QUFBQTs7QUFDSixXQUFLckIsTUFBTCxDQUFZc0IsSUFBWixDQUFpQix1QkFBakI7QUFDQSxVQUFNQyxTQUFTLHdDQUFrQixhQUFsQixDQUFmO0FBQ0FBLGFBQU9DLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLFVBQUN0QixNQUFEO0FBQUEsZUFBWSxPQUFLdUIsUUFBTCxDQUFjdkIsTUFBZCxDQUFaO0FBQUEsT0FBbEI7QUFDQXFCLGFBQU9DLEVBQVAsQ0FBVSxLQUFWLEVBQWlCO0FBQUEsZUFBTSxPQUFLRSxRQUFMLEVBQU47QUFBQSxPQUFqQjtBQUNEOzs7MEJBQ0s7QUFDSixXQUFLMUIsTUFBTCxDQUFZc0IsSUFBWixDQUFpQix5QkFBakI7QUFDRDs7O3FDQUNnQm5CLE0sRUFBUWUsTSxFQUFRO0FBQy9CLFVBQU1TLE9BQU8sRUFBYjtBQUNBVCxhQUFPVSxPQUFQLENBQWUsVUFBQ0MsS0FBRCxFQUFRQyxHQUFSO0FBQUEsZUFBZ0JILEtBQUtHLEdBQUwsSUFBWUQsS0FBNUI7QUFBQSxPQUFmO0FBQ0EsVUFBTUUsVUFBVUMsS0FBS0MsU0FBTCxDQUFlTixJQUFmLENBQWhCOztBQUVBLGFBQU9qQyxVQUFVLEtBQUtHLE1BQUwsR0FBYyxPQUFkLEdBQXdCTSxNQUF4QixHQUFpQyxPQUEzQyxFQUFvRDRCLE9BQXBELENBQVA7QUFDRDs7O3lCQUNXbEMsTSxFQUFRO0FBQ2xCLGFBQU8sSUFBSUQsbUJBQUosQ0FBd0JDLE1BQXhCLENBQVA7QUFDRDs7Ozs7O2tCQWhEa0JELG1CIiwiZmlsZSI6ImRpY3Rpb25hcnktZ2VuZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBjcmVhdGVGcm9tWmlwRmlsZSB9IGZyb20gJ3ppcC1jb2RlLWpwLXN0cmVhbSc7XG5cbmNvbnN0IHdyaXRlRmlsZSA9IFByb21pc2UucHJvbWlzaWZ5KGZzLndyaXRlRmlsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvcihvdXRwdXQpIHtcbiAgICB0aGlzLm91dHB1dCA9IG91dHB1dCB8fCAnb3V0cHV0JztcbiAgICB0aGlzLmFkZHJlc3NlcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmxvZ2dlciA9IGNvbnNvbGU7XG4gIH1cbiAgaW5kZXhpbmcocmVjb3JkKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcmVjb3JkLnppcF9jb2RlLnN1YnN0cigwLCAzKTtcbiAgICBjb25zdCBhcmVhID0gKC9e5Lul5LiL44Gr5o6y6LyJ44GM44Gq44GE5aC05ZCILy50ZXN0KHJlY29yZC5hcmVhKSkgPyAnJyA6IHJlY29yZC5hcmVhO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHByZWZlY3R1cmU6IHJlY29yZC5wcmVmZWN0dXJlLFxuICAgICAgY2l0eTogcmVjb3JkLmNpdHksXG4gICAgICBhcmVhOiBhcmVhLFxuICAgIH07XG5cbiAgICBjb25zdCBncm91cCA9IHRoaXMuYWRkcmVzc2VzLmdldChwcmVmaXgpIHx8IG5ldyBNYXAoKTtcbiAgICBjb25zdCBhZGRyZXNzZXMgPSBncm91cC5nZXQocmVjb3JkLnppcF9jb2RlKSB8fCBbXTtcbiAgICBhZGRyZXNzZXMucHVzaChkYXRhKTtcblxuICAgIGdyb3VwLnNldChyZWNvcmQuemlwX2NvZGUsIGFkZHJlc3Nlcyk7XG4gICAgdGhpcy5hZGRyZXNzZXMuc2V0KHByZWZpeCwgZ3JvdXApO1xuICB9XG4gIGdlbmVyYXRlKCkge1xuICAgIGxldCBjaGFpbiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGZvciAobGV0IFsgcHJlZml4LCB2YWx1ZXMgXSBvZiB0aGlzLmFkZHJlc3Nlcy5lbnRyaWVzKCkpIHtcbiAgICAgIGNoYWluLnRoZW4odGhpcy5vdXRwdXREaWN0aW9uYXJ5KHByZWZpeCwgdmFsdWVzKSk7XG4gICAgfVxuICAgIGNoYWluLnRoZW4oKCkgPT4gdGhpcy5lbmQoKSk7XG4gIH1cbiAgcnVuKCkge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oJ2dlbmVyYXRpbmcgZGljdGlvbmFyeScpO1xuICAgIGNvbnN0IHN0cmVhbSA9IGNyZWF0ZUZyb21aaXBGaWxlKCdrZW5fYWxsLnppcCcpO1xuICAgIHN0cmVhbS5vbignZGF0YScsIChyZWNvcmQpID0+IHRoaXMuaW5kZXhpbmcocmVjb3JkKSk7XG4gICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiB0aGlzLmdlbmVyYXRlKCkpO1xuICB9XG4gIGVuZCgpIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdkaWN0aW9uYXJ5IGlzIGdlbmVyYXRlZCcpO1xuICB9XG4gIG91dHB1dERpY3Rpb25hcnkocHJlZml4LCB2YWx1ZXMpIHtcbiAgICBjb25zdCBqc29uID0ge307XG4gICAgdmFsdWVzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IGpzb25ba2V5XSA9IHZhbHVlKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG5cbiAgICByZXR1cm4gd3JpdGVGaWxlKHRoaXMub3V0cHV0ICsgJy96aXAtJyArIHByZWZpeCArICcuanNvbicsIGNvbnRlbnQpO1xuICB9XG4gIHN0YXRpYyBmcm9tKG91dHB1dCkge1xuICAgIHJldHVybiBuZXcgRGljdGlvbmFyeUdlbmVyYXRvcihvdXRwdXQpO1xuICB9XG59XG4iXX0=