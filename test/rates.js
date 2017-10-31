const moment = require('moment')
const { expect } = require('chai');
const each = require('lodash.foreach')

const SivanandaPriceCalculator = require('..');

const formatMoment = (m) => m.format('YYYY-MM-DD');

const dates = {
  SUMMER_2015: moment('2015-06-01'),
  WINTER_2016: moment('2015-11-01'),
  SUMMER_2016: moment('2016-04-01'),
  WINTER_2017: moment('2016-11-01'),
  SUMMER_2017: moment('2017-07-01'),
  WINTER_2018: moment('2017-11-01'),
  SUMMER_2018: moment('2018-07-01'),
};

describe('rates', function() {
  const nights = [1, 7, 14, 21];
  
  const rooms = {
    BEACHFRONT_SHARING: {
      SUMMER_2015: [136, 128, 121, 116],
      WINTER_2016: [147, 137, 131, 127],
      SUMMER_2016: [159, 148, 141, 136],
      WINTER_2017: [159, 148, 141, 136],
      SUMMER_2017: [136, 128, 121, 116],
      WINTER_2018: [159, 148, 141, 136],
      SUMMER_2018: [136, 128, 121, 116],
    },
    OCEAN_VIEW_SHARING: {
      SUMMER_2015: [129, 121, 114, 109],
      WINTER_2016: [140, 130, 124, 119],
      SUMMER_2016: [147, 137, 130, 125],
      WINTER_2017: [147, 137, 130, 125],
      SUMMER_2017: [129, 121, 114, 109],
      WINTER_2018: [147, 137, 130, 125],
      SUMMER_2018: [129, 121, 114, 109],
    },
    BEACH_HUT_SHARING: {
      SUMMER_2015: [109, 102, 97, 93],
      WINTER_2016: [120, 112, 106, 102],
      SUMMER_2016: [127, 119, 112, 108],
      WINTER_2017: [127, 119, 112, 108],
      SUMMER_2017:  [109, 102, 97, 93],
      WINTER_2018: [127, 119, 112, 108],
      SUMMER_2018:  [109, 102, 97, 93],
    },
    GARDEN_BATH_SHARING: {
      SUMMER_2015: [121, 113, 107, 103],
      WINTER_2016: [131, 123, 116, 111],
      SUMMER_2016: [138, 129, 122, 117],
      WINTER_2017: [138, 129, 122, 117],
      SUMMER_2017: [121, 113, 107, 103],
      WINTER_2018: [138, 129, 122, 117],
      SUMMER_2018: [121, 113, 107, 103],
    },
    GARDEN_DOUBLE: {
      SUMMER_2015: [99, 93, 88, 84],
      WINTER_2016: [109, 103, 98, 94],
      SUMMER_2016: [138, 130, 124, 118],
      WINTER_2017: [138, 130, 124, 118],
      SUMMER_2017: [120, 112, 106, 102],
      WINTER_2018: [138, 130, 124, 118],
      SUMMER_2018: [120, 112, 106, 102],
    },
    GARDEN_SHARED_SHARING: {
      SUMMER_2015: [99, 93, 88, 84],
      WINTER_2016: [109, 103, 98, 94],
      SUMMER_2016: [112, 106, 101, 97],
      WINTER_2017: [112, 106, 101, 97],
      SUMMER_2017: [99, 93, 88, 84],
      WINTER_2018: [112, 106, 101, 97],
      SUMMER_2018: [99, 93, 88, 84],
    },
    GARDEN_SINGLE:  {
      SUMMER_2015: [116, 108, 103, 99],
      WINTER_2016: [127, 119, 113, 108],
      SUMMER_2016: [133, 125, 119, 113],
      WINTER_2017: [133, 125, 119, 113],
      SUMMER_2017: [116, 108, 103, 99],
      WINTER_2018: [133, 125, 119, 113],
      SUMMER_2018: [116, 108, 103, 99],
    },
    DORMITORY: {
      SUMMER_2015: [83, 77, 73, 70],
      WINTER_2016: [94, 88, 84, 81],
      SUMMER_2016: [80, 75, 71, 69],
      WINTER_2017: [80, 75, 71, 69],
      SUMMER_2017: [80, 75, 71, 69],
      WINTER_2018: [80, 75, 71, 69],
      SUMMER_2018: [80, 75, 71, 69],
    },
    TENT_HUT: {
      SUMMER_2015: [79, 74, 70, 67],
      WINTER_2016: [79, 74, 70, 67],
      SUMMER_2016: [82, 77, 73, 70],
      WINTER_2017: [82, 77, 73, 70],
      SUMMER_2017: [82, 77, 73, 70],
      WINTER_2018: [82, 77, 73, 70],
      SUMMER_2018: [82, 77, 73, 70],
    },
    TENT_SPACE: {
      SUMMER_2015: [69, 64, 61, 58],
      WINTER_2016: [69, 64, 61, 58],
      SUMMER_2016: [69, 64, 61, 58],
      WINTER_2017: [69, 64, 61, 58],
      WINTER_2018: [69, 64, 61, 58],
    },
    NULL_ROOM: {
      SUMMER_2015: [0, 0, 0, 0],
      WINTER_2016: [0, 0, 0, 0],
      SUMMER_2016: [0, 0, 0, 0],
      WINTER_2017: [0, 0, 0, 0],
      SUMMER_2017: [0, 0, 0, 0],
      WINTER_2018: [0, 0, 0, 0],
      SUMMER_2018: [0, 0, 0, 0],
    }
  };

  each(rooms, (rates, roomId) => {
    each(rates, (rate, season) => {
      each(nights, (nights, index) => {
        it(`${roomId.toUpperCase()}, ${season.toUpperCase()}, ${nights} night(s)`, () => {
          const calculator = new SivanandaPriceCalculator({
            adults: 1,
            stays: [{
              type: 'ROOM',
              roomId: roomId,
              checkInDate: formatMoment(dates[season].clone()),
              checkOutDate: formatMoment(dates[season].clone().add(nights, 'days'))
            }]
          })
          expect(calculator.getTotalRoom() / nights).to.equal(rates[season][index])
        })
      })
    })
  })
})
