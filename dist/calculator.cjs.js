'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lodash_assign = _interopDefault(require('lodash.assign'));
var _$1 = _interopDefault(require('lodash.find'));
var lodash_flatmap = _interopDefault(require('lodash.flatmap'));
var _$2 = _interopDefault(require('lodash.round'));
var _$3 = _interopDefault(require('lodash.sumby'));
var lodash_matchesproperty = _interopDefault(require('lodash.matchesproperty'));
var _$4 = _interopDefault(require('lodash.values'));
var Moment = _interopDefault(require('moment'));

// Import only used functions from lodash to keep bundle size down

// A common module to consistently import the extended version of 'moment'
// Importing moment-range as a commonjs module avoids the rollup error
// Error: 'extendMoment' is not exported by node_modules/moment-range/dist/moment-range.js

var _require = require('moment-range');
var extendMoment = _require.extendMoment;

var format = 'YYYY-MM-DD';

var moment = extendMoment(Moment);

var createMoment = function createMoment(date) {
  return moment(date, format);
};

var formatMoment = function formatMoment(moment) {
  return moment.format(format);
};

var DISCOUNT = {
  PERCENT: 'percent',
  FIXED: 'fixed'
};

var SEASON = {
  SUMMER_2015: 'summer_2015',
  WINTER_2016: 'winter_2016',
  SUMMER_2016: 'summer_2016',
  WINTER_2017: 'winter_2017',
  SUMMER_2017: 'summer_2017',
  WINTER_2018: 'winter_2018',
  SUMMER_2018: 'summer_2018'
};

var ROOM_ID = {
  BEACHFRONT: 'beachfront',
  BEACHFRONT_SHARING: 'beachfront_sharing',
  OCEAN_VIEW: 'oceanview',
  OCEAN_VIEW_SHARING: 'oceanview_sharing',
  BEACH_HUT: 'beach_hut',
  BEACH_HUT_SHARING: 'beach_hut_sharing',
  GARDEN_BATH: 'garden_bath',
  GARDEN_BATH_SHARING: 'garden_bath_sharing',
  GARDEN_DOUBLE: 'garden_double',
  GARDEN_DOUBLE_SHARING: 'garden_double_sharing',
  GARDEN_SINGLE: 'garden_single',
  GARDEN_SHARED: 'garden_shared',
  GARDEN_SHARED_SHARING: 'garden_shared_sharing',
  DORMITORY: 'dormitory',
  TENT_HUT: 'tent_hut',
  TENT_SPACE: 'tent_space',
  NULL_ROOM: 'null_room'
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Discount = function () {
  function Discount() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$type = _ref.type,
        type = _ref$type === undefined ? DISCOUNT.FIXED : _ref$type,
        _ref$value = _ref.value,
        value = _ref$value === undefined ? 0 : _ref$value;

    classCallCheck(this, Discount);

    this.type = type;
    this.value = value;
  }

  createClass(Discount, [{
    key: 'calculateAmount',
    value: function calculateAmount(price) {
      switch (this.type) {
        case DISCOUNT.PERCENT:
          return price * (this.value / 100);
        case DISCOUNT.FIXED:
          return this.value;
        default:
          return 0;
      }
    }
  }, {
    key: 'applyTo',
    value: function applyTo(price) {
      return price - this.calculateAmount(price);
    }
  }]);
  return Discount;
}();

var _yvpRates;
var _ROOM_ID$BEACHFRONT;
var _ROOM_ID$OCEAN_VIEW;
var _ROOM_ID$BEACH_HUT;
var _ROOM_ID$GARDEN_BATH;
var _ROOM_ID$GARDEN_DOUBL;
var _ROOM_ID$GARDEN_SHARE;
var _ROOM_ID$GARDEN_SINGL;
var _ROOM_ID$DORMITORY;
var _ROOM_ID$TENT_HUT;
var _ROOM_ID$TENT_SPACE;
var _ROOM_ID$NULL_ROOM;
var _roomRates;

var seasons = [{
  type: SEASON.SUMMER_2015,
  startDate: createMoment('2015-06-01'),
  endDate: createMoment('2015-10-31')
}, {
  type: SEASON.WINTER_2016,
  startDate: createMoment('2015-11-01'),
  endDate: createMoment('2016-03-31')
}, {
  type: SEASON.SUMMER_2016,
  startDate: createMoment('2016-04-01'),
  endDate: createMoment('2016-10-31')
}, {
  type: SEASON.WINTER_2017,
  startDate: createMoment('2016-11-01'),
  endDate: createMoment('2017-06-30')
}, {
  type: SEASON.SUMMER_2017,
  startDate: createMoment('2017-07-01'),
  endDate: createMoment('2017-10-31')
}, {
  type: SEASON.WINTER_2018,
  startDate: createMoment('2017-11-01'),
  endDate: createMoment('2018-06-30')
}, {
  type: SEASON.SUMMER_2018,
  startDate: createMoment('2018-07-01'),
  endDate: createMoment('2018-10-31')
}];

var yvpRates = (_yvpRates = {}, defineProperty(_yvpRates, SEASON.SUMMER_2015, 20), defineProperty(_yvpRates, SEASON.WINTER_2016, 32), defineProperty(_yvpRates, SEASON.WINTER_2017, 32), defineProperty(_yvpRates, SEASON.SUMMER_2017, 20), _yvpRates);

var roomRates = (_roomRates = {}, defineProperty(_roomRates, ROOM_ID.BEACHFRONT, (_ROOM_ID$BEACHFRONT = {}, defineProperty(_ROOM_ID$BEACHFRONT, SEASON.SUMMER_2015, [136, 128, 121, 116]), defineProperty(_ROOM_ID$BEACHFRONT, SEASON.WINTER_2016, [147, 137, 131, 127]), defineProperty(_ROOM_ID$BEACHFRONT, SEASON.WINTER_2017, [159, 148, 141, 136]), defineProperty(_ROOM_ID$BEACHFRONT, SEASON.SUMMER_2017, [136, 128, 121, 116]), _ROOM_ID$BEACHFRONT)), defineProperty(_roomRates, ROOM_ID.OCEAN_VIEW, (_ROOM_ID$OCEAN_VIEW = {}, defineProperty(_ROOM_ID$OCEAN_VIEW, SEASON.SUMMER_2015, [129, 121, 114, 109]), defineProperty(_ROOM_ID$OCEAN_VIEW, SEASON.WINTER_2016, [140, 130, 124, 119]), defineProperty(_ROOM_ID$OCEAN_VIEW, SEASON.WINTER_2017, [147, 137, 130, 125]), defineProperty(_ROOM_ID$OCEAN_VIEW, SEASON.SUMMER_2017, [129, 121, 114, 109]), _ROOM_ID$OCEAN_VIEW)), defineProperty(_roomRates, ROOM_ID.BEACH_HUT, (_ROOM_ID$BEACH_HUT = {}, defineProperty(_ROOM_ID$BEACH_HUT, SEASON.SUMMER_2015, [109, 102, 97, 93]), defineProperty(_ROOM_ID$BEACH_HUT, SEASON.WINTER_2016, [120, 112, 106, 102]), defineProperty(_ROOM_ID$BEACH_HUT, SEASON.WINTER_2017, [127, 119, 112, 108]), defineProperty(_ROOM_ID$BEACH_HUT, SEASON.SUMMER_2017, [109, 102, 97, 93]), _ROOM_ID$BEACH_HUT)), defineProperty(_roomRates, ROOM_ID.GARDEN_BATH, (_ROOM_ID$GARDEN_BATH = {}, defineProperty(_ROOM_ID$GARDEN_BATH, SEASON.SUMMER_2015, [121, 113, 107, 103]), defineProperty(_ROOM_ID$GARDEN_BATH, SEASON.WINTER_2016, [131, 123, 116, 111]), defineProperty(_ROOM_ID$GARDEN_BATH, SEASON.WINTER_2017, [138, 129, 122, 117]), defineProperty(_ROOM_ID$GARDEN_BATH, SEASON.SUMMER_2017, [121, 113, 107, 103]), _ROOM_ID$GARDEN_BATH)), defineProperty(_roomRates, ROOM_ID.GARDEN_DOUBLE, (_ROOM_ID$GARDEN_DOUBL = {}, defineProperty(_ROOM_ID$GARDEN_DOUBL, SEASON.SUMMER_2015, [99, 93, 88, 84]), defineProperty(_ROOM_ID$GARDEN_DOUBL, SEASON.WINTER_2016, [109, 103, 98, 94]), defineProperty(_ROOM_ID$GARDEN_DOUBL, SEASON.WINTER_2017, [138, 130, 124, 118]), defineProperty(_ROOM_ID$GARDEN_DOUBL, SEASON.SUMMER_2017, [120, 112, 106, 102]), _ROOM_ID$GARDEN_DOUBL)), defineProperty(_roomRates, ROOM_ID.GARDEN_SHARED, (_ROOM_ID$GARDEN_SHARE = {}, defineProperty(_ROOM_ID$GARDEN_SHARE, SEASON.SUMMER_2015, [99, 93, 88, 84]), defineProperty(_ROOM_ID$GARDEN_SHARE, SEASON.WINTER_2016, [109, 103, 98, 94]), defineProperty(_ROOM_ID$GARDEN_SHARE, SEASON.WINTER_2017, [112, 106, 101, 97]), defineProperty(_ROOM_ID$GARDEN_SHARE, SEASON.SUMMER_2017, [99, 93, 88, 84]), _ROOM_ID$GARDEN_SHARE)), defineProperty(_roomRates, ROOM_ID.GARDEN_SINGLE, (_ROOM_ID$GARDEN_SINGL = {}, defineProperty(_ROOM_ID$GARDEN_SINGL, SEASON.SUMMER_2015, [116, 108, 103, 99]), defineProperty(_ROOM_ID$GARDEN_SINGL, SEASON.WINTER_2016, [127, 119, 113, 108]), defineProperty(_ROOM_ID$GARDEN_SINGL, SEASON.WINTER_2017, [133, 125, 119, 113]), defineProperty(_ROOM_ID$GARDEN_SINGL, SEASON.SUMMER_2017, [116, 108, 103, 99]), _ROOM_ID$GARDEN_SINGL)), defineProperty(_roomRates, ROOM_ID.DORMITORY, (_ROOM_ID$DORMITORY = {}, defineProperty(_ROOM_ID$DORMITORY, SEASON.SUMMER_2015, [83, 77, 73, 70]), defineProperty(_ROOM_ID$DORMITORY, SEASON.WINTER_2016, [94, 88, 84, 81]), defineProperty(_ROOM_ID$DORMITORY, SEASON.WINTER_2017, [80, 75, 71, 69]), defineProperty(_ROOM_ID$DORMITORY, SEASON.SUMMER_2017, [80, 75, 71, 69]), _ROOM_ID$DORMITORY)), defineProperty(_roomRates, ROOM_ID.TENT_HUT, (_ROOM_ID$TENT_HUT = {}, defineProperty(_ROOM_ID$TENT_HUT, SEASON.SUMMER_2015, [79, 74, 70, 67]), defineProperty(_ROOM_ID$TENT_HUT, SEASON.WINTER_2016, [79, 74, 70, 67]), defineProperty(_ROOM_ID$TENT_HUT, SEASON.WINTER_2017, [82, 77, 73, 70]), defineProperty(_ROOM_ID$TENT_HUT, SEASON.SUMMER_2017, [82, 77, 73, 70]), _ROOM_ID$TENT_HUT)), defineProperty(_roomRates, ROOM_ID.TENT_SPACE, (_ROOM_ID$TENT_SPACE = {}, defineProperty(_ROOM_ID$TENT_SPACE, SEASON.SUMMER_2015, [69, 64, 61, 58]), defineProperty(_ROOM_ID$TENT_SPACE, SEASON.WINTER_2016, [69, 64, 61, 58]), defineProperty(_ROOM_ID$TENT_SPACE, SEASON.WINTER_2017, [69, 64, 61, 58]), _ROOM_ID$TENT_SPACE)), defineProperty(_roomRates, ROOM_ID.NULL_ROOM, (_ROOM_ID$NULL_ROOM = {}, defineProperty(_ROOM_ID$NULL_ROOM, SEASON.SUMMER_2015, [0, 0, 0, 0]), defineProperty(_ROOM_ID$NULL_ROOM, SEASON.WINTER_2016, [0, 0, 0, 0]), defineProperty(_ROOM_ID$NULL_ROOM, SEASON.WINTER_2017, [0, 0, 0, 0]), defineProperty(_ROOM_ID$NULL_ROOM, SEASON.SUMMER_2017, [0, 0, 0, 0]), _ROOM_ID$NULL_ROOM)), _roomRates);

var SeasonPrice = function () {
  function SeasonPrice(type) {
    classCallCheck(this, SeasonPrice);

    this.type = type;
  }

  createClass(SeasonPrice, [{
    key: 'getRoomBaseRate',
    value: function getRoomBaseRate(roomId, nights) {
      if (nights <= 6) {
        return roomRates[roomId][this.type][0];
      }
      if (nights <= 13) {
        return roomRates[roomId][this.type][1];
      }
      if (nights <= 20) {
        return roomRates[roomId][this.type][2];
      }
      if (nights >= 21) {
        return roomRates[roomId][this.type][3];
      }
    }
  }, {
    key: 'getYVPRate',
    value: function getYVPRate() {
      return yvpRates[this.type];
    }
  }, {
    key: 'getSingleInDoubleOccupancyRoomDiscount',
    value: function getSingleInDoubleOccupancyRoomDiscount() {
      return 0;
    }
  }]);
  return SeasonPrice;
}();

var WinterSeasonPrice = function (_SeasonPrice) {
  inherits(WinterSeasonPrice, _SeasonPrice);

  function WinterSeasonPrice() {
    classCallCheck(this, WinterSeasonPrice);
    return possibleConstructorReturn(this, (WinterSeasonPrice.__proto__ || Object.getPrototypeOf(WinterSeasonPrice)).apply(this, arguments));
  }

  return WinterSeasonPrice;
}(SeasonPrice);

var SummerSeasonPrice = function (_SeasonPrice2) {
  inherits(SummerSeasonPrice, _SeasonPrice2);

  function SummerSeasonPrice() {
    classCallCheck(this, SummerSeasonPrice);
    return possibleConstructorReturn(this, (SummerSeasonPrice.__proto__ || Object.getPrototypeOf(SummerSeasonPrice)).apply(this, arguments));
  }

  createClass(SummerSeasonPrice, [{
    key: 'getSingleInDoubleOccupancyRoomDiscount',
    value: function getSingleInDoubleOccupancyRoomDiscount() {
      return 15;
    }
  }]);
  return SummerSeasonPrice;
}(SeasonPrice);

var SeasonPriceFactory = function () {
  function SeasonPriceFactory() {
    classCallCheck(this, SeasonPriceFactory);
  }

  createClass(SeasonPriceFactory, null, [{
    key: 'getSeasonFromDate',
    value: function getSeasonFromDate(date) {
      return _$1(seasons, function (_ref) {
        var startDate = _ref.startDate,
            endDate = _ref.endDate;
        return date.within(moment.range(startDate, endDate));
      });
    }
  }, {
    key: 'createSeasonPrice',
    value: function createSeasonPrice(date) {
      var season = SeasonPriceFactory.getSeasonFromDate(date);

      if (!season) {
        throw new Error('Could not find season for date: ' + date.format('YYYY-MM-DD'));
      }

      switch (season.type) {
        case SEASON.SUMMER_2015:
          return new WinterSeasonPrice(SEASON.SUMMER_2015);
        case SEASON.WINTER_2016:
          return new WinterSeasonPrice(SEASON.WINTER_2016);
        // The prices for Summer 2016 and Winter 2018 are the same as Winter 2017
        // Reusing SEASON.WINTER_2017 avoids inputting
        // duplicate price data and risking a type
        case SEASON.SUMMER_2016:
        case SEASON.WINTER_2017:
        case SEASON.WINTER_2018:
          return new WinterSeasonPrice(SEASON.WINTER_2017);
        // The prices for Summer 2018 are the same as Summer 2017
        // Reusing SEASON.SUMMER_2017 avoids inputting
        // duplicate price data and risking a typo
        case SEASON.SUMMER_2017:
        case SEASON.SUMMER_2018:
          return new SummerSeasonPrice(SEASON.SUMMER_2017);
        default:
          throw new Error('Unexpected season type: "' + season.type + '"');
      }
    }
  }]);
  return SeasonPriceFactory;
}();

var rooms = [{
  id: ROOM_ID.BEACHFRONT,
  label: 'Beachfront Deluxe Suite (whole)',
  maxOccupancy: 6
}, {
  id: ROOM_ID.BEACHFRONT_SHARING,
  label: 'Beachfront Deluxe Suite (sharing)',
  maxOccupancy: 1
}, {
  id: ROOM_ID.OCEAN_VIEW,
  label: 'Ocean View Deluxe (whole)',
  maxOccupancy: 4
}, {
  id: ROOM_ID.OCEAN_VIEW_SHARING,
  label: 'Ocean View Deluxe (sharing)',
  maxOccupancy: 1
}, {
  id: ROOM_ID.BEACH_HUT,
  label: 'Beach Hut (whole)',
  maxOccupancy: 4
}, {
  id: ROOM_ID.BEACH_HUT_SHARING,
  label: 'Beach Hut (sharing)',
  maxOccupancy: 1
}, {
  id: ROOM_ID.GARDEN_BATH,
  label: 'Garden Room with Bath (whole)',
  maxOccupancy: 4
}, {
  id: ROOM_ID.GARDEN_BATH_SHARING,
  label: 'Garden Room with Bath (sharing)',
  maxOccupancy: 1
}, {
  id: ROOM_ID.GARDEN_DOUBLE,
  label: 'Garden Room Double Bed (whole)',
  maxOccupancy: 4
}, {
  id: ROOM_ID.GARDEN_DOUBLE_SHARING,
  label: 'Garden Room Double Bed (sharing)',
  maxOccupancy: 1
}, {
  id: ROOM_ID.GARDEN_SINGLE,
  label: 'Garden Room Single',
  maxOccupancy: 1
}, {
  id: ROOM_ID.GARDEN_SHARED,
  label: 'Garden Room Shared (whole)',
  maxOccupancy: 3
}, {
  id: ROOM_ID.GARDEN_SHARED_SHARING,
  label: 'Garden Room Shared (sharing)',
  maxOccupancy: 1
}, {
  id: ROOM_ID.DORMITORY,
  label: 'Dormitory',
  maxOccupancy: 4
}, {
  id: ROOM_ID.TENT_HUT,
  label: 'Tent Hut',
  maxOccupancy: 2
}, {
  id: ROOM_ID.TENT_SPACE,
  label: 'Tent Space',
  maxOccupancy: 1
}, {
  id: ROOM_ID.NULL_ROOM,
  label: 'No Room (only course)',
  maxOccupancy: 1
}];

var AbstractRoomCategory = function () {
  function AbstractRoomCategory(id, isSharing) {
    classCallCheck(this, AbstractRoomCategory);

    this.id = id;
    this.isSharing = isSharing;
  }

  createClass(AbstractRoomCategory, [{
    key: 'bedCount',
    value: function bedCount() {
      return 2;
    }
  }, {
    key: 'getSingleInDoubleOccupancyRoomDiscount',
    value: function getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
      return seasonPrice.getSingleInDoubleOccupancyRoomDiscount();
    }
  }, {
    key: 'getRoomBaseRate',
    value: function getRoomBaseRate(date, nights) {
      var seasonPrice = SeasonPriceFactory.createSeasonPrice(date);
      var roomCategory = this.isSharing ? this.getRoomCategoryForShared() : this;

      if (this.isSharing) {
        return seasonPrice.getRoomBaseRate(roomCategory.id, nights);
      } else {
        return seasonPrice.getRoomBaseRate(roomCategory.id, nights) * this.bedCount() * (100 - this.getSingleInDoubleOccupancyRoomDiscount(seasonPrice)) / 100;
      }
    }

    // in some room categories such as GardenDoubleRoomCategory the price is taken from another room category,
    // namely: GardenSharedRoomCategory, when the room is shared.

  }, {
    key: 'getRoomCategoryForShared',
    value: function getRoomCategoryForShared() {
      return this;
    }
  }]);
  return AbstractRoomCategory;
}();

var AbstractSingleBedRoomCategory = function (_AbstractRoomCategory) {
  inherits(AbstractSingleBedRoomCategory, _AbstractRoomCategory);

  function AbstractSingleBedRoomCategory() {
    classCallCheck(this, AbstractSingleBedRoomCategory);
    return possibleConstructorReturn(this, (AbstractSingleBedRoomCategory.__proto__ || Object.getPrototypeOf(AbstractSingleBedRoomCategory)).apply(this, arguments));
  }

  createClass(AbstractSingleBedRoomCategory, [{
    key: 'getSingleInDoubleOccupancyRoomDiscount',
    value: function getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
      return 0; // This is not a double occupancy room. Single occupancy discount never applies here.
    }
  }, {
    key: 'bedCount',
    value: function bedCount() {
      return 1;
    }
  }]);
  return AbstractSingleBedRoomCategory;
}(AbstractRoomCategory);

var BeachFrontRoomCategory = function (_AbstractRoomCategory2) {
  inherits(BeachFrontRoomCategory, _AbstractRoomCategory2);

  function BeachFrontRoomCategory() {
    classCallCheck(this, BeachFrontRoomCategory);
    return possibleConstructorReturn(this, (BeachFrontRoomCategory.__proto__ || Object.getPrototypeOf(BeachFrontRoomCategory)).apply(this, arguments));
  }

  return BeachFrontRoomCategory;
}(AbstractRoomCategory);

var OceanViewRoomCategory = function (_AbstractRoomCategory3) {
  inherits(OceanViewRoomCategory, _AbstractRoomCategory3);

  function OceanViewRoomCategory() {
    classCallCheck(this, OceanViewRoomCategory);
    return possibleConstructorReturn(this, (OceanViewRoomCategory.__proto__ || Object.getPrototypeOf(OceanViewRoomCategory)).apply(this, arguments));
  }

  return OceanViewRoomCategory;
}(AbstractRoomCategory);

var BeachHutRoomCategory = function (_AbstractRoomCategory4) {
  inherits(BeachHutRoomCategory, _AbstractRoomCategory4);

  function BeachHutRoomCategory() {
    classCallCheck(this, BeachHutRoomCategory);
    return possibleConstructorReturn(this, (BeachHutRoomCategory.__proto__ || Object.getPrototypeOf(BeachHutRoomCategory)).apply(this, arguments));
  }

  return BeachHutRoomCategory;
}(AbstractRoomCategory);

var GardenBathRoomCategory = function (_AbstractRoomCategory5) {
  inherits(GardenBathRoomCategory, _AbstractRoomCategory5);

  function GardenBathRoomCategory() {
    classCallCheck(this, GardenBathRoomCategory);
    return possibleConstructorReturn(this, (GardenBathRoomCategory.__proto__ || Object.getPrototypeOf(GardenBathRoomCategory)).apply(this, arguments));
  }

  return GardenBathRoomCategory;
}(AbstractRoomCategory);

var GardenDoubleRoomCategory = function (_AbstractSingleBedRoo) {
  inherits(GardenDoubleRoomCategory, _AbstractSingleBedRoo);

  function GardenDoubleRoomCategory() {
    classCallCheck(this, GardenDoubleRoomCategory);
    return possibleConstructorReturn(this, (GardenDoubleRoomCategory.__proto__ || Object.getPrototypeOf(GardenDoubleRoomCategory)).apply(this, arguments));
  }

  createClass(GardenDoubleRoomCategory, [{
    key: 'getRoomCategoryForShared',
    value: function getRoomCategoryForShared() {
      return RoomCategoryFactory.createRoomCategory(ROOM_ID.GARDEN_SHARED_SHARING);
    }
  }]);
  return GardenDoubleRoomCategory;
}(AbstractSingleBedRoomCategory);

var GardenSharedRoomCategory = function (_AbstractRoomCategory6) {
  inherits(GardenSharedRoomCategory, _AbstractRoomCategory6);

  function GardenSharedRoomCategory() {
    classCallCheck(this, GardenSharedRoomCategory);
    return possibleConstructorReturn(this, (GardenSharedRoomCategory.__proto__ || Object.getPrototypeOf(GardenSharedRoomCategory)).apply(this, arguments));
  }

  return GardenSharedRoomCategory;
}(AbstractRoomCategory);

var GardenSingleRoomCategory = function (_AbstractSingleBedRoo2) {
  inherits(GardenSingleRoomCategory, _AbstractSingleBedRoo2);

  function GardenSingleRoomCategory() {
    classCallCheck(this, GardenSingleRoomCategory);
    return possibleConstructorReturn(this, (GardenSingleRoomCategory.__proto__ || Object.getPrototypeOf(GardenSingleRoomCategory)).apply(this, arguments));
  }

  return GardenSingleRoomCategory;
}(AbstractSingleBedRoomCategory);

var DormitoryRoomCategory = function (_AbstractSingleBedRoo3) {
  inherits(DormitoryRoomCategory, _AbstractSingleBedRoo3);

  function DormitoryRoomCategory() {
    classCallCheck(this, DormitoryRoomCategory);
    return possibleConstructorReturn(this, (DormitoryRoomCategory.__proto__ || Object.getPrototypeOf(DormitoryRoomCategory)).apply(this, arguments));
  }

  return DormitoryRoomCategory;
}(AbstractSingleBedRoomCategory);

var TentHutRoomCategory = function (_AbstractSingleBedRoo4) {
  inherits(TentHutRoomCategory, _AbstractSingleBedRoo4);

  function TentHutRoomCategory() {
    classCallCheck(this, TentHutRoomCategory);
    return possibleConstructorReturn(this, (TentHutRoomCategory.__proto__ || Object.getPrototypeOf(TentHutRoomCategory)).apply(this, arguments));
  }

  return TentHutRoomCategory;
}(AbstractSingleBedRoomCategory);

var TentSpaceRoomCategory = function (_AbstractSingleBedRoo5) {
  inherits(TentSpaceRoomCategory, _AbstractSingleBedRoo5);

  function TentSpaceRoomCategory() {
    classCallCheck(this, TentSpaceRoomCategory);
    return possibleConstructorReturn(this, (TentSpaceRoomCategory.__proto__ || Object.getPrototypeOf(TentSpaceRoomCategory)).apply(this, arguments));
  }

  return TentSpaceRoomCategory;
}(AbstractSingleBedRoomCategory);

var RoomCategoryFactory = function () {
  function RoomCategoryFactory() {
    classCallCheck(this, RoomCategoryFactory);
  }

  createClass(RoomCategoryFactory, null, [{
    key: 'getRoomById',
    value: function getRoomById(id) {
      var room = _.find(rooms, _.matchesProperty('id', id));
      if (!room) {
        throw new Error('Could not find a room with id: ' + id);
      }
      return room;
    }
  }, {
    key: 'filterRoomsByOccupancy',
    value: function filterRoomsByOccupancy(occupancy) {
      return rooms.filter(function (room) {
        return occupancy <= room.maxOccupancy;
      });
    }
  }, {
    key: 'createRoomCategory',
    value: function createRoomCategory(roomId, isSharing) {
      switch (roomId) {
        case ROOM_ID.BEACHFRONT:
          return new BeachFrontRoomCategory(ROOM_ID.BEACHFRONT, false || isSharing);
        case ROOM_ID.BEACHFRONT_SHARING:
          return new BeachFrontRoomCategory(ROOM_ID.BEACHFRONT, true || isSharing);
        case ROOM_ID.OCEAN_VIEW:
          return new OceanViewRoomCategory(ROOM_ID.OCEAN_VIEW, false || isSharing);
        case ROOM_ID.OCEAN_VIEW_SHARING:
          return new OceanViewRoomCategory(ROOM_ID.OCEAN_VIEW, true || isSharing);
        case ROOM_ID.BEACH_HUT:
          return new BeachHutRoomCategory(ROOM_ID.BEACH_HUT, false || isSharing);
        case ROOM_ID.BEACH_HUT_SHARING:
          return new BeachHutRoomCategory(ROOM_ID.BEACH_HUT, true || isSharing);
        case ROOM_ID.GARDEN_BATH:
          return new GardenBathRoomCategory(ROOM_ID.GARDEN_BATH, false || isSharing);
        case ROOM_ID.GARDEN_BATH_SHARING:
          return new GardenBathRoomCategory(ROOM_ID.GARDEN_BATH, true || isSharing);
        case ROOM_ID.GARDEN_DOUBLE:
          return new GardenDoubleRoomCategory(ROOM_ID.GARDEN_DOUBLE, false || isSharing);
        case ROOM_ID.GARDEN_DOUBLE_SHARING:
          return new GardenDoubleRoomCategory(ROOM_ID.GARDEN_DOUBLE, true || isSharing);
        case ROOM_ID.GARDEN_SHARED:
          return new GardenSharedRoomCategory(ROOM_ID.GARDEN_SHARED, false);
        case ROOM_ID.GARDEN_SHARED_SHARING:
          return new GardenSharedRoomCategory(ROOM_ID.GARDEN_SHARED, true || isSharing);
        case ROOM_ID.GARDEN_SINGLE:
          return new GardenSingleRoomCategory(ROOM_ID.GARDEN_SINGLE, false || isSharing);
        case ROOM_ID.DORMITORY:
          return new DormitoryRoomCategory(ROOM_ID.DORMITORY, false || isSharing);
        case ROOM_ID.TENT_HUT:
          return new TentHutRoomCategory(ROOM_ID.TENT_HUT, false || isSharing);
        case ROOM_ID.TENT_SPACE:
          return new TentSpaceRoomCategory(ROOM_ID.TENT_SPACE, false || isSharing);
        case ROOM_ID.NULL_ROOM:
          return new TentSpaceRoomCategory(ROOM_ID.NULL_ROOM, false || isSharing);
        default:
          throw new Error('Invalid roomId: "' + roomId + '"');
      }
    }
  }]);
  return RoomCategoryFactory;
}();

var RoomStay = function () {
  function RoomStay(stay, courses, reservation) {
    classCallCheck(this, RoomStay);

    this._checkInDate = stay.checkInDate;
    this._checkOutDate = stay.checkOutDate;

    this.courses = courses;
    this.reservation = reservation;

    this.roomDiscount = new Discount(stay.roomDiscount || {});
    this.yvpDiscount = new Discount(stay.yvpDiscount || {});

    var isSharing = reservation.adults + reservation.children > 1;
    this.roomCategory = RoomCategoryFactory.createRoomCategory(stay.roomId, isSharing);
  }

  createClass(RoomStay, [{
    key: 'checkInDate',
    value: function checkInDate() {
      return createMoment(this._checkInDate);
    }
  }, {
    key: 'checkOutDate',
    value: function checkOutDate() {
      return createMoment(this._checkOutDate);
    }
  }, {
    key: 'getDateRange',
    value: function getDateRange() {
      return Array.from(moment.range(this.checkInDate(), this.checkOutDate().subtract(1, 'days') // checkOutDate is not paid for
      ).by('days'));
    }
  }, {
    key: 'getRoomRate',
    value: function getRoomRate(date) {
      return this.roomCategory.getRoomBaseRate(date, this.reservation.nights) * (this.reservation.adults + this.reservation.children / 2);
    }
  }, {
    key: 'getYVPRate',
    value: function getYVPRate(date) {
      var isDuringCourse = this.courses.some(function (course) {
        return course.doesYVPApply(date);
      });

      if (isDuringCourse) {
        return 0;
      }

      return SeasonPriceFactory.createSeasonPrice(date).getYVPRate() * this.reservation.adults;
    }
  }, {
    key: 'getDailyRoomYVPRate',
    value: function getDailyRoomYVPRate() {
      var _this = this;

      return this.getDateRange().map(function (date) {
        return {
          date: date,
          room: _this.roomDiscount.applyTo(_this.getRoomRate(date)),
          yvp: _this.yvpDiscount.applyTo(_this.getYVPRate(date))
        };
      });
    }
  }]);
  return RoomStay;
}();

// Dates of TTC, including the 1 free day
var dates = [{
  label: 'April 4 — May 1, 2017',
  checkInDate: createMoment('2017-04-03'),
  checkOutDate: createMoment('2017-05-03')
}, {
  label: 'May 4 — 31, 2017',
  checkInDate: createMoment('2017-05-03'),
  checkOutDate: createMoment('2017-06-02')
}, {
  label: 'June 3 — 30, 2017',
  checkInDate: createMoment('2017-06-02'),
  checkOutDate: createMoment('2017-07-02')
}, {
  label: 'July 3 — 30, 2017',
  checkInDate: createMoment('2017-07-02'),
  checkOutDate: createMoment('2017-08-01')
}, {
  label: 'November 4 — December 1, 2017',
  checkInDate: createMoment('2017-11-03'),
  checkOutDate: createMoment('2017-12-03')
}, {
  label: 'December 4 — 31, 2017',
  checkInDate: createMoment('2017-12-03'),
  checkOutDate: createMoment('2018-01-03')
}, {
  label: 'January 4 — 31, 2018',
  checkInDate: createMoment('2018-01-03'),
  checkOutDate: createMoment('2018-02-02')
}, {
  label: 'February 3 — March 2, 2018',
  checkInDate: createMoment('2018-02-02'),
  checkOutDate: createMoment('2018-03-04')
}, {
  label: 'March 7 — April 3, 2018',
  checkInDate: createMoment('2018-03-06'),
  checkOutDate: createMoment('2018-04-05')
}, {
  label: 'May 6 — June 2, 2018',
  checkInDate: createMoment('2018-05-05'),
  checkOutDate: createMoment('2018-06-04')
}, {
  label: 'June 5 — July 2, 2018',
  checkInDate: createMoment('2018-06-04'),
  checkOutDate: createMoment('2018-07-04')
}, {
  label: 'July 5 — August 1, 2018',
  checkInDate: createMoment('2018-07-04'),
  checkOutDate: createMoment('2018-08-03')
}];

var TTCStay = function (_RoomStay) {
  inherits(TTCStay, _RoomStay);

  function TTCStay() {
    classCallCheck(this, TTCStay);
    return possibleConstructorReturn(this, (TTCStay.__proto__ || Object.getPrototypeOf(TTCStay)).apply(this, arguments));
  }

  createClass(TTCStay, [{
    key: 'getDailyRoomYVPRate',
    value: function getDailyRoomYVPRate() {
      var packagePrice = void 0;
      switch (this.roomCategory.id) {
        case ROOM_ID.TENT_SPACE:
          packagePrice = 2400;
          break;
        case ROOM_ID.DORMITORY:
          packagePrice = 3255;
          break;
        case ROOM_ID.TENT_HUT:
          packagePrice = 3490;
          break;
      }
      return [{
        date: this.checkInDate(),
        room: packagePrice,
        yvp: 0
      }];
    }
  }]);
  return TTCStay;
}(RoomStay);

TTCStay.getDates = function () {
  return _.flatMap(TTCStay._dates, function (date) {
    return TTCStay._roomIds.map(function (roomId) {
      return _.assign({ roomId: roomId }, date);
    });
  });
};

var Course = function () {
  function Course(_ref) {
    var startDate = _ref.startDate,
        endDate = _ref.endDate,
        tuition = _ref.tuition,
        discount = _ref.discount;
    classCallCheck(this, Course);

    this._startDate = startDate;
    this._endDate = endDate;
    this.tuition = tuition;
    this.discount = new Discount(discount || {});
  }

  createClass(Course, [{
    key: 'startDate',
    value: function startDate() {
      return createMoment(this._startDate);
    }
  }, {
    key: 'endDate',
    value: function endDate() {
      return createMoment(this._endDate);
    }

    // YVP is not included duing the duration of the course and one night before

  }, {
    key: 'doesYVPApply',
    value: function doesYVPApply(date) {
      return date.within(moment.range(this.startDate().subtract(1, 'days'), this.endDate()));
    }
  }, {
    key: 'totalCost',
    value: function totalCost() {
      return this.discount.applyTo(this.tuition);
    }
  }]);
  return Course;
}();

var ReservationCalculator = function () {
  function ReservationCalculator(_ref) {
    var _this = this;

    var _ref$adults = _ref.adults,
        adults = _ref$adults === undefined ? 0 : _ref$adults,
        _ref$children = _ref.children,
        children = _ref$children === undefined ? 0 : _ref$children,
        _ref$stays = _ref.stays,
        stays = _ref$stays === undefined ? [] : _ref$stays,
        _ref$courses = _ref.courses,
        courses = _ref$courses === undefined ? [] : _ref$courses;
    classCallCheck(this, ReservationCalculator);

    this.reservation = {
      adults: adults,
      children: children,
      nights: _$3(stays, function (stay) {
        return createMoment(stay.checkOutDate).diff(createMoment(stay.checkInDate), 'days');
      })
    };
    this.courses = courses.map(function (course) {
      return new Course(course);
    });
    this.stays = stays.map(function (stay) {
      if (stay.type === 'RoomStay') return new RoomStay(stay, _this.courses, _this.reservation);
      if (stay.type === 'TTCStay') return new TTCStay(stay, _this.courses, _this.reservation);
      throw new Error('Invalid stay type: ' + stay.type);
    });
  }

  createClass(ReservationCalculator, [{
    key: 'getDailyRoomYVP',
    value: function getDailyRoomYVP() {
      // Because stays could be overlapping, we should merge room rate objects together
      return this.stays.reduce(function (obj, stay) {
        stay.getDailyRoomYVPRate().forEach(function (rate) {
          var key = rate.date.format('MM/DD/YYYY');

          if (!obj[key]) {
            obj[key] = {};
          }
          if (!obj[key].room) {
            obj[key].room = 0;
          }
          if (!obj[key].yvp) {
            obj[key].yvp = 0;
          }

          obj[key].room += rate.room;
          obj[key].yvp += rate.yvp;
        });
        return obj;
      }, {});
    }
  }, {
    key: 'getTotalNumberOfNights',
    value: function getTotalNumberOfNights() {
      return this.reservation.nights;
    }
  }, {
    key: 'getTotalRoom',
    value: function getTotalRoom() {
      return _$2(_$3(_$4(this.getDailyRoomYVP()), 'room'), 2);
    }
  }, {
    key: 'getTotalYVP',
    value: function getTotalYVP() {
      return _$2(_$3(_$4(this.getDailyRoomYVP()), 'yvp'), 2);
    }
  }, {
    key: 'getTotalCourse',
    value: function getTotalCourse() {
      return _$2(_$3(this.courses, function (course) {
        return course.totalCost();
      }), 2);
    }
  }, {
    key: 'getSubtotal',
    value: function getSubtotal() {
      return this.getTotalRoom() + this.getTotalYVP() + this.getTotalCourse();
    }
  }, {
    key: 'getGrandTotal',
    value: function getGrandTotal() {
      return this.getSubtotal();
    }
  }]);
  return ReservationCalculator;
}();

exports.ReservationCalculator = ReservationCalculator;
exports.RoomCategoryFactory = RoomCategoryFactory;
exports.SeasonPriceFactory = SeasonPriceFactory;
exports.ROOM_ID = ROOM_ID;
exports.SEASON = SEASON;
exports.DISCOUNT = DISCOUNT;
exports.moment = moment;
exports.createMoment = createMoment;
exports.formatMoment = formatMoment;
