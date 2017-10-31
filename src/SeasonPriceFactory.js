import moment from 'moment'
import seasons from './data/seasons'

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
     return 0 // percent
  }
}

class WinterSeasonPrice extends SeasonPrice {}
class SummerSeasonPrice extends SeasonPrice {
  getSingleInDoubleOccupancyRoomDiscount() {
    return 15 // percent
  }
}

export default class SeasonPriceFactory {
  static createSeasonPrice(date) {
    if (!moment.isMoment(date)) {
      date = moment(date)
    }

    const season = seasons.find(season => {
      return date.isBetween(season.startDate, season.endDate, 'days', '[]')
    })

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
