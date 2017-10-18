import * as _ from './lodash'
import { moment, createMoment } from './moment'

const seasons = [
  {
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
        NULL_ROOM: [0, 0, 0, 0],
      }
    }
  },
  {
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
        NULL_ROOM: [0, 0, 0, 0],
      }
    }
  },
  {
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
        NULL_ROOM: [0, 0, 0, 0],
      }
    }
  },
  {
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
        NULL_ROOM: [0, 0, 0, 0],
      }
    }
  },
  {
    id: 'SUMMER_2017',
    season: 'summer',
    startDate: '2017-07-01',
    endDate: '2017-10-31',
    prices: {
      yvp: 20,
      rooms: {
        BEACHFRONT: [136, 128, 121, 116],
        OCEAN_VIEW: [129, 121, 114, 109],
        BEACH_HUT:  [109, 102, 97, 93],
        GARDEN_BATH: [121, 113, 107, 103],
        GARDEN_DOUBLE: [120, 112, 106, 102],
        GARDEN_SHARED: [99, 93, 88, 84],
        GARDEN_SINGLE: [116, 108, 103, 99],
        DORMITORY: [80, 75, 71, 69],
        TENT_HUT: [82, 77, 73, 70],
        TENT_SPACE: [69, 64, 61, 58],
        NULL_ROOM: [0, 0, 0, 0],
      }
    }
  },
  {
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
        NULL_ROOM: [0, 0, 0, 0],
      }
    }
  },
  {
    id: 'SUMMER_2018',
    season: 'summer',
    startDate: '2018-07-01',
    endDate: '2018-10-31',
    prices: {
      yvp: 20,
      rooms: {
        BEACHFRONT: [136, 128, 121, 116],
        OCEAN_VIEW: [129, 121, 114, 109],
        BEACH_HUT:  [109, 102, 97, 93],
        GARDEN_BATH: [121, 113, 107, 103],
        GARDEN_DOUBLE: [120, 112, 106, 102],
        GARDEN_SHARED: [99, 93, 88, 84],
        GARDEN_SINGLE: [116, 108, 103, 99],
        DORMITORY: [80, 75, 71, 69],
        TENT_HUT: [82, 77, 73, 70],
        TENT_SPACE: [69, 64, 61, 58],
        NULL_ROOM: [0, 0, 0, 0],
      }
    }
  }
];

class SeasonPrice {
  constructor(season) {
    this.season = season
  }

  getRoomBaseRate(roomId, nights){
    if (typeof nights !== 'number' || nights <= 0) {
      throw new Error('Nights must be a number greater than 0.')
    }

    if (!this.season.prices.rooms[roomId]) {
      throw new Error(`Price for room "${roomId}" during season "${this.season.id}" does not exist.`)
    }

    if (nights <= 6) { return this.season.prices.rooms[roomId][0] }
    if (nights <= 13) { return this.season.prices.rooms[roomId][1] }
    if (nights <= 20) { return this.season.prices.rooms[roomId][2] }
    if (nights >= 21) { return this.season.prices.rooms[roomId][3] }
  }

  getYVPRate(){
    return this.season.prices.yvp
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
      date.within(moment.range(createMoment(startDate), createMoment(endDate)))
    )
  };

  static createSeasonPrice(date) {
    const season = SeasonPriceFactory.getSeasonFromDate(date)

    if (!season) {
      throw new Error(`Could not find season for date: ${date.format('YYYY-MM-DD')}`)
    }

    switch (season.season) {
      case 'winter':
        return new WinterSeasonPrice(season)
      case 'summer':
        return new SummerSeasonPrice(season)
      default:
        throw new Error(`Unexpected season type: "${season.type}"`)
    }
  }
}
