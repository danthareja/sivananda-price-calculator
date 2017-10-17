import * as _ from './lodash'
import { moment, createMoment } from './moment'
import Discount from './Discount'
import SeasonPriceFactory from './SeasonPriceFactory'
import RoomCategoryFactory from './RoomCategoryFactory'
import { ROOM_ID, STAY } from './constants'

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

// Room ID's allowed for a TTC stay
const TTC_ROOM_IDS = [
  ROOM_ID.TENT_SPACE,
  ROOM_ID.TENT_HUT,
  ROOM_ID.DORMITORY
];

// Dates of TTC, including the 1 free day
const TTC_DATES = [{
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

class TTCStay extends RoomStay {
  getDailyRoomYVPRate() {
    let packagePrice;
    switch (this.roomCategory.id) {
      case ROOM_ID.TENT_SPACE:
        packagePrice = 2400
        break
      case ROOM_ID.DORMITORY:
        packagePrice = 3255
        break
      case ROOM_ID.TENT_HUT:
        packagePrice = 3490
        break
    }
    return [{
      date: this.checkInDate(),
      room: packagePrice,
      yvp: 0
    }]
  }
}

export default class StayFactory{
  static createStay(stay, courses, reservation) {
    if (stay.type === STAY.ROOM) return new RoomStay(stay, courses, reservation)
    if (stay.type === STAY.TTC) return new TTCStay(stay, courses, reservation)
    throw new Error(`Invalid stay type: ${stay.type}`)
  }
  static getTTCDates() {
    return _.flatMap(TTC_DATES, date =>
      TTC_ROOM_IDS.map(roomId => {
        return _.assign({ roomId }, date)
      })
    );
  }
}
