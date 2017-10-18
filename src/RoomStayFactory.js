import moment from 'moment'
import * as _ from './lodash'
import Discount from './Discount'
import SeasonPriceFactory from './SeasonPriceFactory'
import RoomCategoryFactory from './RoomCategoryFactory'
import ttc from './data/ttc'

class RoomStay {
  constructor(stay, courses, reservation) {
    this.checkInDate = moment(stay.checkInDate)
    this.checkOutDate = moment(stay.checkOutDate)

    this.courses = courses
    this.reservation = reservation

    this.roomDiscount = new Discount(stay.roomDiscount)
    this.yvpDiscount = new Discount(stay.yvpDiscount)

    this.roomCategory = RoomCategoryFactory.createRoomCategory(stay.roomId, reservation)
  }

  getDateRange() {
    const dates = []
    for (let m = moment(this.checkInDate); m.isBefore(this.checkOutDate); m.add(1, 'days')) {
      dates.push(m.clone())
    }
    return dates;
  }

  getRoomRate(date) {
    return this.roomCategory.getRoomRate(date)
  }

  getYVPRate(date) {
    const isDuringCourse = this.courses.some(course => course.doesYVPApply(date))
    
    if (isDuringCourse) {
      return 0
    }

    // YVP only applies to adults
    return SeasonPriceFactory.createSeasonPrice(date).getYVPRate() * this.reservation.adults
  }

  getDailyRoomYVPRate() {
    return this.getDateRange().map(date => ({
      date: date,
      room: this.roomDiscount.applyTo(this.getRoomRate(date)),
      yvp: this.yvpDiscount.applyTo(this.getYVPRate(date)),
    }))
  }
}

class TTCStay extends RoomStay {
  getDailyRoomYVPRate() {
    if (!ttc.prices[this.roomCategory.id]) {
      throw new Error(`No TTC price for room "${this.roomCategory.id}"`)
    }
    return [{
      date: this.checkInDate.clone(),
      room: ttc.prices[this.roomCategory.id],
      yvp: 0
    }]
  }
}

export default class StayFactory {
  static getTTCData() {
    return ttc;
  }

  static createStay(stay, courses, reservation) {
    if (stay.type === 'ROOM') return new RoomStay(stay, courses, reservation)
    if (stay.type === 'TTC') return new TTCStay(stay, courses, reservation)
    throw new Error(`Invalid stay type: ${stay.type}`)
  }
}
