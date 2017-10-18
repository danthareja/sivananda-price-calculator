import * as _ from './lodash'
import { moment, createMoment } from './moment'
import Discount from './Discount'
import SeasonPriceFactory from './SeasonPriceFactory'
import RoomCategoryFactory from './RoomCategoryFactory'
import ttc from './data/ttc'

class RoomStay {
  constructor(stay, courses, reservation) {
    this._checkInDate = stay.checkInDate
    this._checkOutDate = stay.checkOutDate

    this.courses = courses
    this.reservation = reservation

    this.roomDiscount = new Discount(stay.roomDiscount || {})
    this.yvpDiscount = new Discount(stay.yvpDiscount || {})

    const isSharing = reservation.adults + reservation.children > 1
    this.roomCategory = RoomCategoryFactory.createRoomCategory(stay.roomId, isSharing)
  }

  checkInDate() {
    return createMoment(this._checkInDate)
  }

  checkOutDate() {
    return createMoment(this._checkOutDate)
  }

  getDateRange() {
    return Array.from(
      moment.range(
        this.checkInDate(),
        this.checkOutDate().subtract(1, 'days') // checkOutDate is not paid for
      ).by('days')
    )
  }

  getRoomRate(date) {
    return this.roomCategory.getRoomBaseRate(date, this.reservation.nights) * (this.reservation.adults + this.reservation.children / 2)
  }

  getYVPRate(date) {
    const isDuringCourse = this.courses.some(course => course.doesYVPApply(date))
    
    if (isDuringCourse) {
      return 0
    }

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
      date: this.checkInDate(),
      room: ttc.prices[this.roomCategory.id],
      yvp: 0
    }]
  }
}

export default class StayFactory{
  static createStay(stay, courses, reservation) {
    if (stay.type === 'ROOM') return new RoomStay(stay, courses, reservation)
    if (stay.type === 'TTC') return new TTCStay(stay, courses, reservation)
    throw new Error(`Invalid stay type: ${stay.type}`)
  }
}
