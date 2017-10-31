import round from 'lodash.round'
import moment from 'moment'
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
    return this.roomCategory.getRate(date)
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
    return this.getDateRange().map(date => {
      const roomSubtotal = round(this.getRoomRate(date), 2)
      const roomDiscount = round(this.roomDiscount.calculateAmount(roomSubtotal), 2)
      const roomTotal = round(this.roomDiscount.applyTo(roomSubtotal), 2)

      const yvpSubtotal = round(this.getYVPRate(date), 2)
      const yvpDiscount = round(this.yvpDiscount.calculateAmount(yvpSubtotal), 2)
      const yvpTotal = round(this.yvpDiscount.applyTo(yvpSubtotal), 2)

      const total = round(roomTotal + yvpTotal, 2)

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
      }
    })
  }
}

class TTCStay extends RoomStay {
  getDateRange() {
    return [this.checkInDate.clone()]
  }

  getSession(date) {
    const session = ttc.find(session => date.isSame(session.checkInDate, 'day'))

    if (!session) {
      throw new Error(`Cannot find TTC session that starts on ${date.format('YYYY-MM-DD')}`)
    }

    return session
  }

  getRoomRate(date) {
    const session = this.getSession(date)
    const room = session.prices.rooms[this.roomCategory.id]

    if (typeof room === 'undefined') {
      throw new Error(`TTC session ${session.id} has no price for room category: ${this.roomCategory.id}`)
    }

    return room
  }

  getYVPRate(date) {
    const session = this.getSession(date)
    const yvp = session.prices.yvp

    if (typeof yvp === 'undefined') {
      throw new Error(`TTC session ${session.id} has no price for yvp`)
    }

    return yvp
  }
}

export default class StayFactory {
  static createStay(stay, courses, reservation) {
    if (stay.type === 'ROOM') return new RoomStay(stay, courses, reservation)
    if (stay.type === 'TTC') return new TTCStay(stay, courses, reservation)
    throw new Error(`Invalid stay type: ${stay.type}. Must be one of ROOM, TTC`)
  }
}
