import round from 'lodash.round';
import moment from 'moment';

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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
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
    key: 'calculateDailyAmount',
    value: function calculateDailyAmount(price, days) {
      switch (this.type) {
        case 'PERCENT':
          return price * (this.value / 100);
        case 'FIXED':
          return this.value / days;
        default:
          return 0;
      }
    }
  }]);
  return Discount;
}();

var seasons = [{
  id: 'SUMMER_2015',
  season: 'summer',
  startDate: '2015-06-01',
  endDate: '2015-10-31',
  prices: {
    yvp: 20,
    rooms: {
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
    }
  }
}, {
  id: 'WINTER_2016',
  season: 'winter',
  startDate: '2015-11-01',
  endDate: '2016-03-31',
  prices: {
    yvp: 32,
    rooms: {
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
    }
  }
}, {
  id: 'SUMMER_2016',
  season: 'summer',
  startDate: '2016-04-01',
  endDate: '2016-10-31',
  prices: {
    yvp: 20,
    rooms: {
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
    }
  }
}, {
  id: 'WINTER_2017',
  season: 'winter',
  startDate: '2016-11-01',
  endDate: '2017-06-30',
  prices: {
    yvp: 32,
    rooms: {
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
    }
  }
}, {
  id: 'SUMMER_2017',
  season: 'summer',
  startDate: '2017-07-01',
  endDate: '2017-10-31',
  prices: {
    yvp: 20,
    rooms: {
      BEACHFRONT: [136, 128, 121, 116],
      OCEAN_VIEW: [129, 121, 114, 109],
      BEACH_HUT: [109, 102, 97, 93],
      GARDEN_BATH: [121, 113, 107, 103],
      GARDEN_DOUBLE: [120, 112, 106, 102],
      GARDEN_SHARED: [99, 93, 88, 84],
      GARDEN_SINGLE: [116, 108, 103, 99],
      DORMITORY: [80, 75, 71, 69],
      TENT_HUT: [82, 77, 73, 70],
      TENT_SPACE: [69, 64, 61, 58],
      NULL_ROOM: [0, 0, 0, 0]
    }
  }
}, {
  id: 'WINTER_2018',
  season: 'winter',
  startDate: '2017-11-01',
  endDate: '2018-06-30',
  prices: {
    yvp: 32,
    rooms: {
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
    }
  }
}, {
  id: 'SUMMER_2018',
  season: 'summer',
  startDate: '2018-07-01',
  endDate: '2018-10-31',
  prices: {
    yvp: 20,
    rooms: {
      BEACHFRONT: [136, 128, 121, 116],
      OCEAN_VIEW: [129, 121, 114, 109],
      BEACH_HUT: [109, 102, 97, 93],
      GARDEN_BATH: [121, 113, 107, 103],
      GARDEN_DOUBLE: [120, 112, 106, 102],
      GARDEN_SHARED: [99, 93, 88, 84],
      GARDEN_SINGLE: [116, 108, 103, 99],
      DORMITORY: [80, 75, 71, 69],
      TENT_HUT: [82, 77, 73, 70],
      TENT_SPACE: [69, 64, 61, 58],
      NULL_ROOM: [0, 0, 0, 0]
    }
  }
}];

var SeasonPrice = function () {
  function SeasonPrice(season) {
    classCallCheck(this, SeasonPrice);

    this.season = season;
  }

  createClass(SeasonPrice, [{
    key: 'getRoomBaseRate',
    value: function getRoomBaseRate(roomId, nights) {
      if (typeof nights !== 'number' || nights <= 0) {
        throw new Error('Nights must be a number greater than 0.');
      }

      if (!this.season.prices.rooms[roomId]) {
        throw new Error('Price for room "' + roomId + '" during season "' + this.season.id + '" does not exist.');
      }

      if (nights <= 6) {
        return this.season.prices.rooms[roomId][0];
      }
      if (nights <= 13) {
        return this.season.prices.rooms[roomId][1];
      }
      if (nights <= 20) {
        return this.season.prices.rooms[roomId][2];
      }
      if (nights >= 21) {
        return this.season.prices.rooms[roomId][3];
      }
    }
  }, {
    key: 'getYVPRate',
    value: function getYVPRate() {
      return this.season.prices.yvp;
    }
  }, {
    key: 'getSingleInDoubleOccupancyRoomDiscount',
    value: function getSingleInDoubleOccupancyRoomDiscount() {
      return 0; // percent
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
      return 15; // percent
    }
  }]);
  return SummerSeasonPrice;
}(SeasonPrice);

var SeasonPriceFactory = function () {
  function SeasonPriceFactory() {
    classCallCheck(this, SeasonPriceFactory);
  }

  createClass(SeasonPriceFactory, null, [{
    key: 'createSeasonPrice',
    value: function createSeasonPrice(date) {
      if (!moment.isMoment(date)) {
        date = moment(date);
      }

      var season = seasons.find(function (season) {
        return date.isBetween(season.startDate, season.endDate, 'days', '[]');
      });

      if (!season) {
        throw new Error('Could not find season for date: ' + date.format('YYYY-MM-DD'));
      }

      switch (season.season) {
        case 'winter':
          return new WinterSeasonPrice(season);
        case 'summer':
          return new SummerSeasonPrice(season);
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
  function AbstractRoomCategory(id, isWillingToShare, reservation) {
    classCallCheck(this, AbstractRoomCategory);

    this.id = id;
    this.reservation = Object.assign({}, reservation);
    this.isSharing = isWillingToShare || reservation.adults + reservation.children > 1;
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
    key: 'getBaseRateMultiplier',
    value: function getBaseRateMultiplier() {
      return this.reservation.adults + this.reservation.children / 2;
    }
  }, {
    key: 'getBaseRate',
    value: function getBaseRate(date) {
      var seasonPrice = SeasonPriceFactory.createSeasonPrice(date);
      var roomCategory = this.isSharing ? this.getRoomCategoryForShared() : this;

      if (this.isSharing) {
        return seasonPrice.getRoomBaseRate(roomCategory.id, this.reservation.nights);
      } else {
        return seasonPrice.getRoomBaseRate(roomCategory.id, this.reservation.nights) * this.bedCount() * (100 - this.getSingleInDoubleOccupancyRoomDiscount(seasonPrice)) / 100;
      }
    }
  }, {
    key: 'getRate',
    value: function getRate(date) {
      return this.getBaseRate(date) * this.getBaseRateMultiplier();
    }

    // In some room categories the price is taken from another room category when the room is shared

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
    key: 'bedCount',
    value: function bedCount() {
      return 1;
    }

    // This is not a double occupancy room, single occupancy discount never applies here.

  }, {
    key: 'getSingleInDoubleOccupancyRoomDiscount',
    value: function getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
      return 0;
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

  createClass(BeachFrontRoomCategory, [{
    key: 'getBaseRateMultiplier',

    // Beach front rooms have a two adult minimum
    // Until there are two adults, children count as adults
    value: function getBaseRateMultiplier() {
      if (!this.isSharing) {
        return get(BeachFrontRoomCategory.prototype.__proto__ || Object.getPrototypeOf(BeachFrontRoomCategory.prototype), 'getBaseRateMultiplier', this).call(this);
      }

      var adults = this.reservation.adults;
      var children = this.reservation.children;

      if (adults === 1 && children > 0) {
        adults += 1;
        children -= 1;
      }

      return adults + children / 2;
    }
  }]);
  return BeachFrontRoomCategory;
}(AbstractRoomCategory);

var OceanViewRoomCategory = function (_AbstractRoomCategory3) {
  inherits(OceanViewRoomCategory, _AbstractRoomCategory3);

  function OceanViewRoomCategory() {
    classCallCheck(this, OceanViewRoomCategory);
    return possibleConstructorReturn(this, (OceanViewRoomCategory.__proto__ || Object.getPrototypeOf(OceanViewRoomCategory)).apply(this, arguments));
  }

  createClass(OceanViewRoomCategory, [{
    key: 'getBaseRateMultiplier',

    // Ocean view rooms have a two adult minimum
    // Until there are two adults, children count as adults
    value: function getBaseRateMultiplier() {
      if (!this.isSharing) {
        return get(OceanViewRoomCategory.prototype.__proto__ || Object.getPrototypeOf(OceanViewRoomCategory.prototype), 'getBaseRateMultiplier', this).call(this);
      }

      var adults = this.reservation.adults;
      var children = this.reservation.children;

      if (adults === 1 && children > 0) {
        adults += 1;
        children -= 1;
      }

      return adults + children / 2;
    }
  }]);
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
      return RoomCategoryFactory.createRoomCategory('GARDEN_SHARED_SHARING', this.reservation);
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
    key: 'createRoomCategory',
    value: function createRoomCategory(roomId, reservation) {
      switch (roomId) {
        case 'BEACHFRONT':
          return new BeachFrontRoomCategory('BEACHFRONT', false, reservation);
        case 'BEACHFRONT_SHARING':
          return new BeachFrontRoomCategory('BEACHFRONT', true, reservation);
        case 'OCEAN_VIEW':
          return new OceanViewRoomCategory('OCEAN_VIEW', false, reservation);
        case 'OCEAN_VIEW_SHARING':
          return new OceanViewRoomCategory('OCEAN_VIEW', true, reservation);
        case 'BEACH_HUT':
          return new BeachHutRoomCategory('BEACH_HUT', false, reservation);
        case 'BEACH_HUT_SHARING':
          return new BeachHutRoomCategory('BEACH_HUT', true, reservation);
        case 'GARDEN_BATH':
          return new GardenBathRoomCategory('GARDEN_BATH', false, reservation);
        case 'GARDEN_BATH_SHARING':
          return new GardenBathRoomCategory('GARDEN_BATH', true, reservation);
        case 'GARDEN_DOUBLE':
          return new GardenDoubleRoomCategory('GARDEN_DOUBLE', false, reservation);
        case 'GARDEN_DOUBLE_SHARING':
          return new GardenDoubleRoomCategory('GARDEN_DOUBLE', true, reservation);
        case 'GARDEN_SHARED':
          return new GardenSharedRoomCategory('GARDEN_SHARED', false, reservation);
        case 'GARDEN_SHARED_SHARING':
          return new GardenSharedRoomCategory('GARDEN_SHARED', true, reservation);
        case 'GARDEN_SINGLE':
          return new GardenSingleRoomCategory('GARDEN_SINGLE', false, reservation);
        case 'DORMITORY':
          return new DormitoryRoomCategory('DORMITORY', false, reservation);
        case 'TENT_HUT':
          return new TentHutRoomCategory('TENT_HUT', false, reservation);
        case 'TENT_SPACE':
          return new TentSpaceRoomCategory('TENT_SPACE', false, reservation);
        case 'NULL_ROOM':
          return new TentSpaceRoomCategory('NULL_ROOM', false, reservation);
        default:
          throw new Error('Invalid roomId: ' + roomId + '. Must be one of ' + rooms.map(function (r) {
            return r.id;
          }).join(', '));
      }
    }
  }]);
  return RoomCategoryFactory;
}();

var ttc = [{
  id: 'APRIL_2017',
  label: 'April 4 — May 1, 2017',
  checkInDate: '2017-04-03',
  checkOutDate: '2017-05-03',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'MAY_2017',
  label: 'May 4 — 31, 2017',
  checkInDate: '2017-05-03',
  checkOutDate: '2017-06-02',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'JUNE_2017',
  label: 'June 3 — 30, 2017',
  checkInDate: '2017-06-02',
  checkOutDate: '2017-07-02',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'JULY_2017',
  label: 'July 3 — 30, 2017',
  checkInDate: '2017-07-02',
  checkOutDate: '2017-08-01',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'NOVEMBER_2017',
  label: 'November 4 — December 1, 2017',
  checkInDate: '2017-11-03',
  checkOutDate: '2017-12-03',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'DECEMBER_2017',
  label: 'December 4 — 31, 2017',
  checkInDate: '2017-12-03',
  checkOutDate: '2018-01-03',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'JANUARY_2018',
  label: 'January 4 — 31, 2018',
  checkInDate: '2018-01-03',
  checkOutDate: '2018-02-02',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'FEBRUARY_2018',
  label: 'February 3 — March 2, 2018',
  checkInDate: '2018-02-02',
  checkOutDate: '2018-03-04',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'MARCH_2018',
  label: 'March 7 — April 3, 2018',
  checkInDate: '2018-03-06',
  checkOutDate: '2018-04-05',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'MAY_2018',
  label: 'May 6 — June 2, 2018',
  checkInDate: '2018-05-05',
  checkOutDate: '2018-06-04',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'JUNE_2018',
  label: 'June 5 — July 2, 2018',
  checkInDate: '2018-06-04',
  checkOutDate: '2018-07-04',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}, {
  id: 'JULY_2018',
  label: 'July 5 — August 1, 2018',
  checkInDate: '2018-07-04',
  checkOutDate: '2018-08-03',
  prices: {
    yvp: 0,
    rooms: {
      'TENT_SPACE': 2400,
      'DORMITORY': 3255,
      'TENT_HUT': 3490
    }
  }
}];

var RoomStay = function () {
  function RoomStay(stay, courses, reservation) {
    classCallCheck(this, RoomStay);

    this.checkInDate = moment(stay.checkInDate);
    this.checkOutDate = moment(stay.checkOutDate);

    this.courses = courses;
    this.reservation = reservation;

    this.roomDiscount = new Discount(stay.roomDiscount);
    this.yvpDiscount = new Discount(stay.yvpDiscount);

    this.roomCategory = RoomCategoryFactory.createRoomCategory(stay.roomId, reservation);
  }

  createClass(RoomStay, [{
    key: 'getDateRange',
    value: function getDateRange() {
      var dates = [];
      for (var m = moment(this.checkInDate); m.isBefore(this.checkOutDate); m.add(1, 'days')) {
        dates.push(m.clone());
      }
      return dates;
    }
  }, {
    key: 'getRoomRate',
    value: function getRoomRate(date) {
      return this.roomCategory.getRate(date);
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

      // YVP only applies to adults
      return SeasonPriceFactory.createSeasonPrice(date).getYVPRate() * this.reservation.adults;
    }
  }, {
    key: 'getDailyRoomYVPRate',
    value: function getDailyRoomYVPRate() {
      var _this = this;

      return this.getDateRange().map(function (date, i, dates) {
        var roomSubtotal = round(_this.getRoomRate(date), 2);
        var roomDiscount = round(_this.roomDiscount.calculateDailyAmount(roomSubtotal, dates.length), 2);
        var roomTotal = round(roomSubtotal - roomDiscount, 2);

        var yvpSubtotal = round(_this.getYVPRate(date), 2);
        var yvpDiscount = round(_this.yvpDiscount.calculateDailyAmount(yvpSubtotal, dates.length), 2);
        var yvpTotal = round(yvpSubtotal - yvpDiscount, 2);

        var total = round(roomTotal + yvpTotal, 2);

        return {
          date: date,
          room: {
            subtotal: roomSubtotal,
            discount: roomDiscount,
            total: roomTotal
          },
          yvp: {
            subtotal: yvpSubtotal,
            discount: yvpDiscount,
            total: yvpTotal
          },
          total: total
        };
      });
    }
  }]);
  return RoomStay;
}();

var TTCStay = function (_RoomStay) {
  inherits(TTCStay, _RoomStay);

  function TTCStay() {
    classCallCheck(this, TTCStay);
    return possibleConstructorReturn(this, (TTCStay.__proto__ || Object.getPrototypeOf(TTCStay)).apply(this, arguments));
  }

  createClass(TTCStay, [{
    key: 'getDateRange',
    value: function getDateRange() {
      return [this.checkInDate.clone()];
    }
  }, {
    key: 'getSession',
    value: function getSession(date) {
      var session = ttc.find(function (session) {
        return date.isSame(session.checkInDate, 'day');
      });

      if (!session) {
        throw new Error('Cannot find TTC session that starts on ' + date.format('YYYY-MM-DD'));
      }

      return session;
    }
  }, {
    key: 'getRoomRate',
    value: function getRoomRate(date) {
      var session = this.getSession(date);
      var room = session.prices.rooms[this.roomCategory.id];

      if (typeof room === 'undefined') {
        throw new Error('TTC session ' + session.id + ' has no price for room category: ' + this.roomCategory.id);
      }

      return room;
    }
  }, {
    key: 'getYVPRate',
    value: function getYVPRate(date) {
      var session = this.getSession(date);
      var yvp = session.prices.yvp;

      if (typeof yvp === 'undefined') {
        throw new Error('TTC session ' + session.id + ' has no price for yvp');
      }

      return yvp;
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
      throw new Error('Invalid stay type: ' + stay.type + '. Must be one of ROOM, TTC');
    }
  }]);
  return StayFactory;
}();

var Course = function () {
  function Course(_ref) {
    var startDate = _ref.startDate,
        endDate = _ref.endDate,
        tuition = _ref.tuition,
        _ref$discount = _ref.discount,
        discount = _ref$discount === undefined ? {} : _ref$discount;
    classCallCheck(this, Course);

    this.startDate = moment(startDate);
    this.endDate = moment(endDate);
    this.tuition = tuition;
    this.discount = new Discount(discount);
  }

  createClass(Course, [{
    key: 'doesYVPApply',
    value: function doesYVPApply(date) {
      // YVP is not included duing the duration of the course and one night before
      return date.isBetween(this.startDate.clone().subtract(1, 'days'), this.endDate, 'days', []);
    }
  }, {
    key: 'totalCost',
    value: function totalCost() {
      return this.tuition - this.discount.calculateAmount(this.tuition);
    }
  }]);
  return Course;
}();

var SivanandaPriceCalculator$1 = function () {
  createClass(SivanandaPriceCalculator, null, [{
    key: 'getRooms',
    value: function getRooms() {
      return rooms.slice();
    }
  }, {
    key: 'getSeasons',
    value: function getSeasons() {
      return seasons.slice();
    }
  }, {
    key: 'getTTC',
    value: function getTTC() {
      return ttc.slice();
    }
  }]);

  function SivanandaPriceCalculator(_ref) {
    var _this = this;

    var _ref$adults = _ref.adults,
        adults = _ref$adults === undefined ? 0 : _ref$adults,
        _ref$children = _ref.children,
        children = _ref$children === undefined ? 0 : _ref$children,
        _ref$stays = _ref.stays,
        stays = _ref$stays === undefined ? [] : _ref$stays,
        _ref$courses = _ref.courses,
        courses = _ref$courses === undefined ? [] : _ref$courses;
    classCallCheck(this, SivanandaPriceCalculator);

    this.validate(adults, children, stays, courses);
    this.reservation = {
      adults: adults,
      children: children,
      nights: stays.reduce(function (sum, stay) {
        return sum + moment(stay.checkOutDate).diff(moment(stay.checkInDate), 'days');
      }, 0)
    };
    this.courses = courses.map(function (course) {
      return new Course(course);
    });
    this.stays = stays.map(function (stay) {
      return StayFactory.createStay(stay, _this.courses, _this.reservation);
    });
  }

  createClass(SivanandaPriceCalculator, [{
    key: 'validate',
    value: function validate(adults, children, stays, courses) {
      // ** No stay is overlapping with another stay **
      // DateRangesOverlap = max(start1, start2) < min(end1, end2)
      // https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
      var stayDates = stays.map(function (stay) {
        return {
          roomId: stay.roomId,
          checkInDate: moment(stay.checkInDate),
          checkOutDate: moment(stay.checkOutDate)
        };
      });

      stayDates.forEach(function (a, i, dates) {
        dates.slice(i + 1).forEach(function (b, j) {
          if (moment.max(a.checkInDate, b.checkInDate).isBefore(moment.min(a.checkOutDate, b.checkOutDate), 'day')) {
            throw new Error('Stays cannot overlap. ' + a.roomId + ' (' + a.checkInDate.format('YYYY-MM-DD') + ' to ' + a.checkOutDate.format('YYYY-MM-DD') + ') overlaps with ' + b.roomId + ' (' + b.checkInDate.format('YYYY-MM-DD') + ' to ' + b.checkOutDate.format('YYYY-MM-DD') + ')');
          }
        });
      });
    }
  }, {
    key: 'getDailyRoomYVP',
    value: function getDailyRoomYVP() {
      return this.stays.reduce(function (days, stay) {
        return days.concat(stay.getDailyRoomYVPRate());
      }, []).sort(function (a, b) {
        return a.date.isBefore(b.date);
      }).map(function (day) {
        return Object.assign(day, { date: day.date.format('MM/DD/YYYY') });
      });
    }
  }, {
    key: 'getTotalNumberOfNights',
    value: function getTotalNumberOfNights() {
      return this.reservation.nights;
    }
  }, {
    key: 'getTotalRoom',
    value: function getTotalRoom() {
      return round(this.getDailyRoomYVP().reduce(function (sum, day) {
        return sum + day.room.total;
      }, 0), 2);
    }
  }, {
    key: 'getTotalYVP',
    value: function getTotalYVP() {
      return round(this.getDailyRoomYVP().reduce(function (sum, day) {
        return sum + day.yvp.total;
      }, 0), 2);
    }
  }, {
    key: 'getTotalCourse',
    value: function getTotalCourse() {
      return round(this.courses.reduce(function (sum, course) {
        return sum + course.totalCost();
      }, 0), 2);
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
  return SivanandaPriceCalculator;
}();

export default SivanandaPriceCalculator$1;
