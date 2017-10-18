import * as _ from './lodash'
import { moment, createMoment } from './moment'

const seasons = [
  {
    type: 'SUMMER_2015',
    startDate: createMoment('2015-06-01'),
    endDate: createMoment('2015-10-31')
  },
  {
    type: 'WINTER_2016',
    startDate: createMoment('2015-11-01'),
    endDate: createMoment('2016-03-31')
  },
  {
    type: 'SUMMER_2016',
    startDate: createMoment('2016-04-01'),
    endDate: createMoment('2016-10-31')
  },
  {
    type: 'WINTER_2017',
    startDate: createMoment('2016-11-01'),
    endDate: createMoment('2017-06-30')
  },
  {
    type: 'SUMMER_2017',
    startDate: createMoment('2017-07-01'),
    endDate: createMoment('2017-10-31')
  },
  {
    type: 'WINTER_2018',
    startDate: createMoment('2017-11-01'),
    endDate: createMoment('2018-06-30')
  },
  {
    type: 'SUMMER_2018',
    startDate: createMoment('2018-07-01'),
    endDate: createMoment('2018-10-31')
  }
];

const yvpRates = {
  SUMMER_2015: 20,
  WINTER_2016: 32,
  WINTER_2017: 32,
  SUMMER_2017: 20,
};

const roomRates = {
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
    NULL_ROOM: [0, 0, 0, 0],
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
    NULL_ROOM: [0, 0, 0, 0],
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
    NULL_ROOM: [0, 0, 0, 0],
  },
  SUMMER_2017: {
    BEACHFRONT: [136, 128, 121, 116],
    OCEAN_VIEW: [129, 121, 114, 109],
    BEACH_HUT:  [109, 102, 97, 93],
    GARDEN_BATH: [121, 113, 107, 103],
    GARDEN_DOUBLE: [120, 112, 106, 102],
    GARDEN_SHARED: [99, 93, 88, 84],
    GARDEN_SINGLE: [116, 108, 103, 99],
    DORMITORY: [80, 75, 71, 69],
    TENT_HUT: [82, 77, 73, 70],
    NULL_ROOM: [0, 0, 0, 0],
  }
};

class SeasonPrice {
  constructor(type) {
    this.type = type
  }

  getRoomBaseRate(roomId, nights){
    if (nights <= 6) { return roomRates[this.type][roomId][0] }
    if (nights <= 13) { return roomRates[this.type][roomId][1] }
    if (nights <= 20) { return roomRates[this.type][roomId][2] }
    if (nights >= 21) { return roomRates[this.type][roomId][3] }
  }

  getYVPRate(){
    return yvpRates[this.type]
  }

  getSingleInDoubleOccupancyRoomDiscount() {
     return 0
  }
}

class WinterSeasonPrice extends SeasonPrice {}
class SummerSeasonPrice extends SeasonPrice {
  getSingleInDoubleOccupancyRoomDiscount() {
      return 15
  }
}

export default class SeasonPriceFactory {
  static getSeasonFromDate(date) {
    return _.find(seasons, ({ startDate, endDate }) =>
      date.within(moment.range(startDate, endDate))
    )
  };

  static createSeasonPrice(date) {
    const season = SeasonPriceFactory.getSeasonFromDate(date)

    if (!season) {
      throw new Error(`Could not find season for date: ${date.format('YYYY-MM-DD')}`)
    }

    switch (season.type) {
      case 'SUMMER_2015':
        return new WinterSeasonPrice('SUMMER_2015')
      case 'WINTER_2016':
        return new WinterSeasonPrice('WINTER_2016')
      // The prices for Summer 2016 and Winter 2018 are the same as Winter 2017
      // Reusing 'WINTER_2017' avoids inputting
      // duplicate price data and risking a type
      case 'SUMMER_2016':
      case 'WINTER_2017':
      case 'WINTER_2018':
        return new WinterSeasonPrice('WINTER_2017')
      // The prices for Summer 2018 are the same as Summer 2017
      // Reusing 'SUMMER_2017' avoids inputting
      // duplicate price data and risking a typo
      case 'SUMMER_2017':
      case 'SUMMER_2018':
        return new SummerSeasonPrice('SUMMER_2017')
      default:
        throw new Error(`Unexpected season type: "${season.type}"`)
    }
  }
}
