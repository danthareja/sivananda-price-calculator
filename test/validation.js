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

describe('validation', function (){
  it('should throw an error if a stay has an invalid roomId', function() {
    expect(() => {
      const calculator = new SivanandaPriceCalculator({
        adults: 1,
        stays: [{
          type: 'ROOM',
          roomId: 'INVALID_ROOM',
          checkInDate: formatMoment(dates['WINTER_2017'].clone()),
          checkOutDate: formatMoment(dates['WINTER_2017'].clone().add(2, 'days'))
        }]
      })
    }).to.throw
  })

  it('should throw an error if a stay has an invalid type', function() {
    expect(() => {
      const calculator = new SivanandaPriceCalculator({
        adults: 1,
        stays: [{
          type: 'INVALID_TYPE',
          roomId: 'OCEAN_VIEW',
          checkInDate: formatMoment(dates['WINTER_2017'].clone()),
          checkOutDate: formatMoment(dates['WINTER_2017'].clone().add(2, 'days'))
        }]
      })
    }).to.throw
  })

  it('should throw an error if a stay overlaps with another stay', function() {
    expect(() => {
      const calculator = new SivanandaPriceCalculator({
        adults: 1,
        stays: [{
          type: 'ROOM',
          roomId: 'GARDEN_DOUBLE',
          checkInDate: formatMoment(dates['WINTER_2017'].clone()),
          checkOutDate: formatMoment(dates['WINTER_2017'].clone().add(2, 'days'))
        }, {
          type: 'ROOM',
          roomId: 'OCEAN_VIEW',
          checkInDate: formatMoment(dates['WINTER_2017'].clone()),
          checkOutDate: formatMoment(dates['WINTER_2017'].clone().add(3, 'days'))
        }]
      })
    }).to.throw
  })

})