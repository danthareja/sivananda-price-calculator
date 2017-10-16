import * as _ from './lodash'
import { moment, createMoment } from './moment'
import { SEASON, ROOM_ID } from './constants'

const seasons = [
  {
    type: SEASON.SUMMER_2015,
    startDate: createMoment('2015-06-01'),
    endDate: createMoment('2015-10-31')
  },
  {
    type: SEASON.WINTER_2016,
    startDate: createMoment('2015-11-01'),
    endDate: createMoment('2016-03-31')
  },
  {
    type: SEASON.SUMMER_2016,
    startDate: createMoment('2016-04-01'),
    endDate: createMoment('2016-10-31')
  },
  {
    type: SEASON.WINTER_2017,
    startDate: createMoment('2016-11-01'),
    endDate: createMoment('2017-06-30')
  },
  {
    type: SEASON.SUMMER_2017,
    startDate: createMoment('2017-07-01'),
    endDate: createMoment('2017-10-31')
  },
  {
    type: SEASON.WINTER_2018,
    startDate: createMoment('2017-11-01'),
    endDate: createMoment('2018-06-30')
  },
  {
    type: SEASON.SUMMER_2018,
    startDate: createMoment('2018-07-01'),
    endDate: createMoment('2018-10-31')
  }
];

const yvpRates = {
  [SEASON.SUMMER_2015]: 20,
  [SEASON.WINTER_2016]: 32,
  [SEASON.WINTER_2017]: 32,
  [SEASON.SUMMER_2017]: 20,
};

const roomRates = {
  [ROOM_ID.BEACHFRONT]: {
    [SEASON.SUMMER_2015]: [136, 128, 121, 116],
    [SEASON.WINTER_2016]: [147, 137, 131, 127],
    [SEASON.WINTER_2017]: [159, 148, 141, 136],
    [SEASON.SUMMER_2017]: [136, 128, 121, 116]
  },
  [ROOM_ID.OCEAN_VIEW]: {
    [SEASON.SUMMER_2015]: [129, 121, 114, 109],
    [SEASON.WINTER_2016]: [140, 130, 124, 119],
    [SEASON.WINTER_2017]: [147, 137, 130, 125],
    [SEASON.SUMMER_2017]: [129, 121, 114, 109]
  },
  [ROOM_ID.BEACH_HUT]: {
    [SEASON.SUMMER_2015]: [109, 102, 97, 93],
    [SEASON.WINTER_2016]: [120, 112, 106, 102],
    [SEASON.WINTER_2017]: [127, 119, 112, 108],
    [SEASON.SUMMER_2017]:  [109, 102, 97, 93]
  },
  [ROOM_ID.GARDEN_BATH]: {
    [SEASON.SUMMER_2015]: [121, 113, 107, 103],
    [SEASON.WINTER_2016]: [131, 123, 116, 111],
    [SEASON.WINTER_2017]: [138, 129, 122, 117],
    [SEASON.SUMMER_2017]: [121, 113, 107, 103]
  },
  [ROOM_ID.GARDEN_DOUBLE]: {
    [SEASON.SUMMER_2015]: [99, 93, 88, 84],
    [SEASON.WINTER_2016]: [109, 103, 98, 94],
    [SEASON.WINTER_2017]: [138, 130, 124, 118],
    [SEASON.SUMMER_2017]: [120, 112, 106, 102]
  },
  [ROOM_ID.GARDEN_SHARED]: {
    [SEASON.SUMMER_2015]: [99, 93, 88, 84],
    [SEASON.WINTER_2016]: [109, 103, 98, 94],
    [SEASON.WINTER_2017]: [112, 106, 101, 97],
    [SEASON.SUMMER_2017]: [99, 93, 88, 84]
  },
  [ROOM_ID.GARDEN_SINGLE]:  {
    [SEASON.SUMMER_2015]: [116, 108, 103, 99],
    [SEASON.WINTER_2016]: [127, 119, 113, 108],
    [SEASON.WINTER_2017]: [133, 125, 119, 113],
    [SEASON.SUMMER_2017]: [116, 108, 103, 99]
  },
  [ROOM_ID.DORMITORY]: {
    [SEASON.SUMMER_2015]: [83, 77, 73, 70],
    [SEASON.WINTER_2016]: [94, 88, 84, 81],
    [SEASON.WINTER_2017]: [80, 75, 71, 69],
    [SEASON.SUMMER_2017]: [80, 75, 71, 69]
  },
  [ROOM_ID.TENT_HUT]: {
    [SEASON.SUMMER_2015]: [79, 74, 70, 67],
    [SEASON.WINTER_2016]: [79, 74, 70, 67],
    [SEASON.WINTER_2017]: [82, 77, 73, 70],
    [SEASON.SUMMER_2017]: [82, 77, 73, 70]
  },
  [ROOM_ID.TENT_SPACE]: {
    [SEASON.SUMMER_2015]: [69, 64, 61, 58],
    [SEASON.WINTER_2016]: [69, 64, 61, 58],
    [SEASON.WINTER_2017]: [69, 64, 61, 58]
  },
  [ROOM_ID.NULL_ROOM]: {
    [SEASON.SUMMER_2015]: [0, 0, 0, 0],
    [SEASON.WINTER_2016]: [0, 0, 0, 0],
    [SEASON.WINTER_2017]: [0, 0, 0, 0],
    [SEASON.SUMMER_2017]: [0, 0, 0, 0]
  }
};

class SeasonPrice {
  constructor(type) {
    this.type = type
  }

  getRoomBaseRate(roomId, nights){
    if (nights <= 6) { return roomRates[roomId][this.type][0] }
    if (nights <= 13) { return roomRates[roomId][this.type][1] }
    if (nights <= 20) { return roomRates[roomId][this.type][2] }
    if (nights >= 21) { return roomRates[roomId][this.type][3] }
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
      case SEASON.SUMMER_2015:
        return new WinterSeasonPrice(SEASON.SUMMER_2015)
      case SEASON.WINTER_2016:
        return new WinterSeasonPrice(SEASON.WINTER_2016)
      // The prices for Summer 2016 and Winter 2018 are the same as Winter 2017
      // Reusing SEASON.WINTER_2017 avoids inputting
      // duplicate price data and risking a type
      case SEASON.SUMMER_2016:
      case SEASON.WINTER_2017:
      case SEASON.WINTER_2018:
        return new WinterSeasonPrice(SEASON.WINTER_2017)
      // The prices for Summer 2018 are the same as Summer 2017
      // Reusing SEASON.SUMMER_2017 avoids inputting
      // duplicate price data and risking a typo
      case SEASON.SUMMER_2017:
      case SEASON.SUMMER_2018:
        return new SummerSeasonPrice(SEASON.SUMMER_2017)
      default:
        throw new Error(`Unexpected season type: "${season.type}"`)
    }
  }
}
