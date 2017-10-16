import * as _ from './lodash'
import { createMoment } from './moment'
import RoomStay from './RoomStay'
import TTCStay from './TTCStay'
import Course from './Course'

export default class ReservationCalculator {
  constructor({ adults = 0, children = 0, stays = [], courses = [] }) {
    this.reservation = {
      adults: adults,
      children: children,
      nights: _.sumBy(stays, stay => {
        return createMoment(stay.checkOutDate).diff(createMoment(stay.checkInDate), 'days')
      })
    }
    this.courses = courses.map(course => new Course(course))
    this.stays = stays.map(stay => {
      if (stay.type === 'RoomStay') return new RoomStay(stay, this.courses, this.reservation)
      if (stay.type === 'TTCStay') return new TTCStay(stay, this.courses, this.reservation)
      throw new Error(`Invalid stay type: ${stay.type}`)
    })
  }

  getDailyRoomYVP() {
    // Because stays could be overlapping, we should merge room rate objects together
    return this.stays.reduce((obj, stay) => {
      stay.getDailyRoomYVPRate().forEach(rate => {
        let key = rate.date.format('MM/DD/YYYY');

        if (!obj[key]) { obj[key] = {} }
        if (!obj[key].room) { obj[key].room = 0 }
        if (!obj[key].yvp) { obj[key].yvp = 0 }

        obj[key].room += rate.room
        obj[key].yvp += rate.yvp
      })
      return obj
    }, {})
  }

  getTotalNumberOfNights() {
    return this.reservation.nights
  }

  getTotalRoom() {
    return _.round(_.sumBy(_.values(this.getDailyRoomYVP()), 'room'), 2)
  }

  getTotalYVP() {
    return _.round(_.sumBy(_.values(this.getDailyRoomYVP()), 'yvp'), 2)
  }

  getTotalCourse() {
    return _.round(_.sumBy(this.courses, course => course.totalCost()), 2)
  }

  getSubtotal() {
    return this.getTotalRoom() + this.getTotalYVP() + this.getTotalCourse()
  }

  getGrandTotal() {
    return this.getSubtotal()
  }
}
