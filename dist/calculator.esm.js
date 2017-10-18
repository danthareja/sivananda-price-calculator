import _$1 from 'lodash.assign';
import _$2 from 'lodash.find';
import _$3 from 'lodash.flatmap';
import _$4 from 'lodash.round';
import _$5 from 'lodash.sumby';
import lodash_matchesproperty from 'lodash.matchesproperty';
import _$6 from 'lodash.values';
import Moment from 'moment';

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
        type = _ref$type === undefined ? 'FIXED' : _ref$type,
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
        case 'PERCENT':
          return price * (this.value / 100);
        case 'FIXED':
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

var seasons = [{
  type: 'SUMMER_2015',
  startDate: createMoment('2015-06-01'),
  endDate: createMoment('2015-10-31')
}, {
  type: 'WINTER_2016',
  startDate: createMoment('2015-11-01'),
  endDate: createMoment('2016-03-31')
}, {
  type: 'SUMMER_2016',
  startDate: createMoment('2016-04-01'),
  endDate: createMoment('2016-10-31')
}, {
  type: 'WINTER_2017',
  startDate: createMoment('2016-11-01'),
  endDate: createMoment('2017-06-30')
}, {
  type: 'SUMMER_2017',
  startDate: createMoment('2017-07-01'),
  endDate: createMoment('2017-10-31')
}, {
  type: 'WINTER_2018',
  startDate: createMoment('2017-11-01'),
  endDate: createMoment('2018-06-30')
}, {
  type: 'SUMMER_2018',
  startDate: createMoment('2018-07-01'),
  endDate: createMoment('2018-10-31')
}];

var yvpRates = {
  SUMMER_2015: 20,
  WINTER_2016: 32,
  WINTER_2017: 32,
  SUMMER_2017: 20
};

var roomRates = {
  SUMMER_2015: {
    BEACHFRONT: [136, 128, 121, 116],
    OCEAN_VIEW: [129, 121, 114, 109],
    BEACH_HUT: [109, 102, 97, 93],
    GARDEN_BATH: [121, 113, 107, 103],
    GARDEN_DOUBLE: [99, 93, 88, 84],
    GARDEN_SHARED: [99, 93, 88, 84],
    GARDEN_SINGLE: [116, 108, 103, 99],
    DORMITORY: [83, 77, 73, 70],
    TENT_HUT: [79, 74, 70, 67],
    TENT_SPACE: [69, 64, 61, 58],
    NULL_ROOM: [0, 0, 0, 0]
  },
  WINTER_2016: {
    BEACHFRONT: [147, 137, 131, 127],
    OCEAN_VIEW: [140, 130, 124, 119],
    BEACH_HUT: [120, 112, 106, 102],
    GARDEN_BATH: [131, 123, 116, 111],
    GARDEN_DOUBLE: [109, 103, 98, 94],
    GARDEN_SHARED: [109, 103, 98, 94],
    GARDEN_SINGLE: [127, 119, 113, 108],
    DORMITORY: [94, 88, 84, 81],
    TENT_HUT: [79, 74, 70, 67],
    TENT_SPACE: [69, 64, 61, 58],
    NULL_ROOM: [0, 0, 0, 0]
  },
  WINTER_2017: {
    BEACHFRONT: [159, 148, 141, 136],
    OCEAN_VIEW: [147, 137, 130, 125],
    BEACH_HUT: [127, 119, 112, 108],
    GARDEN_BATH: [138, 129, 122, 117],
    GARDEN_DOUBLE: [138, 130, 124, 118],
    GARDEN_SHARED: [112, 106, 101, 97],
    GARDEN_SINGLE: [133, 125, 119, 113],
    DORMITORY: [80, 75, 71, 69],
    TENT_HUT: [82, 77, 73, 70],
    TENT_SPACE: [69, 64, 61, 58],
    NULL_ROOM: [0, 0, 0, 0]
  },
  SUMMER_2017: {
    BEACHFRONT: [136, 128, 121, 116],
    OCEAN_VIEW: [129, 121, 114, 109],
    BEACH_HUT: [109, 102, 97, 93],
    GARDEN_BATH: [121, 113, 107, 103],
    GARDEN_DOUBLE: [120, 112, 106, 102],
    GARDEN_SHARED: [99, 93, 88, 84],
    GARDEN_SINGLE: [116, 108, 103, 99],
    DORMITORY: [80, 75, 71, 69],
    TENT_HUT: [82, 77, 73, 70],
    NULL_ROOM: [0, 0, 0, 0]
  }
};

var SeasonPrice = function () {
  function SeasonPrice(type) {
    classCallCheck(this, SeasonPrice);

    this.type = type;
  }

  createClass(SeasonPrice, [{
    key: 'getRoomBaseRate',
    value: function getRoomBaseRate(roomId, nights) {
      if (nights <= 6) {
        return roomRates[this.type][roomId][0];
      }
      if (nights <= 13) {
        return roomRates[this.type][roomId][1];
      }
      if (nights <= 20) {
        return roomRates[this.type][roomId][2];
      }
      if (nights >= 21) {
        return roomRates[this.type][roomId][3];
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
      return _$2(seasons, function (_ref) {
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
        case 'SUMMER_2015':
          return new WinterSeasonPrice('SUMMER_2015');
        case 'WINTER_2016':
          return new WinterSeasonPrice('WINTER_2016');
        // The prices for Summer 2016 and Winter 2018 are the same as Winter 2017
        // Reusing 'WINTER_2017' avoids inputting
        // duplicate price data and risking a type
        case 'SUMMER_2016':
        case 'WINTER_2017':
        case 'WINTER_2018':
          return new WinterSeasonPrice('WINTER_2017');
        // The prices for Summer 2018 are the same as Summer 2017
        // Reusing 'SUMMER_2017' avoids inputting
        // duplicate price data and risking a typo
        case 'SUMMER_2017':
        case 'SUMMER_2018':
          return new SummerSeasonPrice('SUMMER_2017');
        default:
          throw new Error('Unexpected season type: "' + season.type + '"');
      }
    }
  }]);
  return SeasonPriceFactory;
}();

var rooms = [{
  id: 'BEACHFRONT',
  label: 'Beachfront Deluxe Suite (whole)',
  maxOccupancy: 6
}, {
  id: 'BEACHFRONT_SHARING',
  label: 'Beachfront Deluxe Suite (sharing)',
  maxOccupancy: 1
}, {
  id: 'OCEAN_VIEW',
  label: 'Ocean View Deluxe (whole)',
  maxOccupancy: 4
}, {
  id: 'OCEAN_VIEW_SHARING',
  label: 'Ocean View Deluxe (sharing)',
  maxOccupancy: 1
}, {
  id: 'BEACH_HUT',
  label: 'Beach Hut (whole)',
  maxOccupancy: 4
}, {
  id: 'BEACH_HUT_SHARING',
  label: 'Beach Hut (sharing)',
  maxOccupancy: 1
}, {
  id: 'GARDEN_BATH',
  label: 'Garden Room with Bath (whole)',
  maxOccupancy: 4
}, {
  id: 'GARDEN_BATH_SHARING',
  label: 'Garden Room with Bath (sharing)',
  maxOccupancy: 1
}, {
  id: 'GARDEN_DOUBLE',
  label: 'Garden Room Double Bed (whole)',
  maxOccupancy: 4
}, {
  id: 'GARDEN_DOUBLE_SHARING',
  label: 'Garden Room Double Bed (sharing)',
  maxOccupancy: 1
}, {
  id: 'GARDEN_SINGLE',
  label: 'Garden Room Single',
  maxOccupancy: 1
}, {
  id: 'GARDEN_SHARED',
  label: 'Garden Room Shared (whole)',
  maxOccupancy: 3
}, {
  id: 'GARDEN_SHARED_SHARING',
  label: 'Garden Room Shared (sharing)',
  maxOccupancy: 1
}, {
  id: 'DORMITORY',
  label: 'Dormitory',
  maxOccupancy: 4
}, {
  id: 'TENT_HUT',
  label: 'Tent Hut',
  maxOccupancy: 2
}, {
  id: 'TENT_SPACE',
  label: 'Tent Space',
  maxOccupancy: 1
}, {
  id: 'NULL_ROOM',
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
      return RoomCategoryFactory.createRoomCategory('GARDEN_SHARED_SHARING');
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
        case 'BEACHFRONT':
          return new BeachFrontRoomCategory('BEACHFRONT', false || isSharing);
        case 'BEACHFRONT_SHARING':
          return new BeachFrontRoomCategory('BEACHFRONT', true || isSharing);
        case 'OCEAN_VIEW':
          return new OceanViewRoomCategory('OCEAN_VIEW', false || isSharing);
        case 'OCEAN_VIEW_SHARING':
          return new OceanViewRoomCategory('OCEAN_VIEW', true || isSharing);
        case 'BEACH_HUT':
          return new BeachHutRoomCategory('BEACH_HUT', false || isSharing);
        case 'BEACH_HUT_SHARING':
          return new BeachHutRoomCategory('BEACH_HUT', true || isSharing);
        case 'GARDEN_BATH':
          return new GardenBathRoomCategory('GARDEN_BATH', false || isSharing);
        case 'GARDEN_BATH_SHARING':
          return new GardenBathRoomCategory('GARDEN_BATH', true || isSharing);
        case 'GARDEN_DOUBLE':
          return new GardenDoubleRoomCategory('GARDEN_DOUBLE', false || isSharing);
        case 'GARDEN_DOUBLE_SHARING':
          return new GardenDoubleRoomCategory('GARDEN_DOUBLE', true || isSharing);
        case 'GARDEN_SHARED':
          return new GardenSharedRoomCategory('GARDEN_SHARED', false);
        case 'GARDEN_SHARED_SHARING':
          return new GardenSharedRoomCategory('GARDEN_SHARED', true || isSharing);
        case 'GARDEN_SINGLE':
          return new GardenSingleRoomCategory('GARDEN_SINGLE', false || isSharing);
        case 'DORMITORY':
          return new DormitoryRoomCategory('DORMITORY', false || isSharing);
        case 'TENT_HUT':
          return new TentHutRoomCategory('TENT_HUT', false || isSharing);
        case 'TENT_SPACE':
          return new TentSpaceRoomCategory('TENT_SPACE', false || isSharing);
        case 'NULL_ROOM':
          return new TentSpaceRoomCategory('NULL_ROOM', false || isSharing);
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

// Room ID's allowed for a TTC stay


var TTC_ROOM_IDS = ['TENT_SPACE', 'TENT_HUT', 'DORMITORY'];

// Dates of TTC, including the 1 free day
var TTC_DATES = [{
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
        case 'TENT_SPACE':
          packagePrice = 2400;
          break;
        case 'DORMITORY':
          packagePrice = 3255;
          break;
        case 'TENT_HUT':
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

var StayFactory = function () {
  function StayFactory() {
    classCallCheck(this, StayFactory);
  }

  createClass(StayFactory, null, [{
    key: 'createStay',
    value: function createStay(stay, courses, reservation) {
      if (stay.type === 'ROOM') return new RoomStay(stay, courses, reservation);
      if (stay.type === 'TTC') return new TTCStay(stay, courses, reservation);
      throw new Error('Invalid stay type: ' + stay.type);
    }
  }, {
    key: 'getTTCDates',
    value: function getTTCDates() {
      return _$3(TTC_DATES, function (date) {
        return TTC_ROOM_IDS.map(function (roomId) {
          return _$1({ roomId: roomId }, date);
        });
      });
    }
  }]);
  return StayFactory;
}();

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
      nights: _$5(stays, function (stay) {
        return createMoment(stay.checkOutDate).diff(createMoment(stay.checkInDate), 'days');
      })
    };
    this.courses = courses.map(function (course) {
      return new Course(course);
    });
    this.stays = stays.map(function (stay) {
      return StayFactory.createStay(stay, _this.courses, _this.reservation);
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
      return _$4(_$5(_$6(this.getDailyRoomYVP()), 'room'), 2);
    }
  }, {
    key: 'getTotalYVP',
    value: function getTotalYVP() {
      return _$4(_$5(_$6(this.getDailyRoomYVP()), 'yvp'), 2);
    }
  }, {
    key: 'getTotalCourse',
    value: function getTotalCourse() {
      return _$4(_$5(this.courses, function (course) {
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

export { ReservationCalculator, RoomCategoryFactory, SeasonPriceFactory, StayFactory as RoomStayFactory, moment, createMoment, formatMoment };
