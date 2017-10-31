import round from 'lodash.round'
import moment from 'moment'
import StayFactory from './StayFactory'
import Course from './Course'
import rooms from './data/rooms'
import seasons from './data/seasons'
import ttc from './data/ttc'

export default class SivanandaPriceCalculator {
  static getRooms() {
    return rooms.slice()
  }

  static getSeasons() {
    return seasons.slice()
  }

  static getTTC() {
    return ttc.slice()
  }

  constructor({ adults = 0, children = 0, stays = [], courses = [] }) {
    this.validate(adults, children, stays, courses)
    this.reservation = {
      adults: adults,
      children: children,
      nights: stays.reduce((sum, stay) => {
        return sum + moment(stay.checkOutDate).diff(moment(stay.checkInDate), 'days')
      }, 0)
    }
    this.courses = courses.map(course => new Course(course))
    this.stays = stays.map(stay => StayFactory.createStay(stay, this.courses, this.reservation))
  }

  validate(adults, children, stays, courses) {
    // ** No stay is overlapping with another stay **
    // DateRangesOverlap = max(start1, start2) < min(end1, end2)
    // https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const stayDates = stays.map(stay => {
      return {
        roomId: stay.roomId,
        checkInDate: moment(stay.checkInDate),
        checkOutDate: moment(stay.checkOutDate)
      }
    })

    stayDates.forEach((a, i, dates) => {
      dates.slice(i + 1).forEach((b, j) => {
        if (moment.max(a.checkInDate, b.checkInDate).isBefore(moment.min(a.checkOutDate, b.checkOutDate), 'day')) {
          throw new Error(`Stays cannot overlap. ${a.roomId} (${a.checkInDate.format('YYYY-MM-DD')} to ${a.checkOutDate.format('YYYY-MM-DD')}) overlaps with ${b.roomId} (${b.checkInDate.format('YYYY-MM-DD')} to ${b.checkOutDate.format('YYYY-MM-DD')})`)
        }
      })
    })
  }

  getDailyRoomYVP() {
    return this.stays.reduce((days, stay) => {
      return days.concat(stay.getDailyRoomYVPRate())
    }, [])
    .sort((a, b) => a.date.isBefore(b.date))
    .map(day => Object.assign(day, { date: day.date.format('MM/DD/YYYY')}))
  }

  getTotalNumberOfNights() {
    return this.reservation.nights
  }

  getTotalRoom() {
    return round(this.getDailyRoomYVP().reduce((sum, day) => sum + day.room.total, 0), 2)
  }

  getTotalYVP() {
    return round(this.getDailyRoomYVP().reduce((sum, day) => sum + day.yvp.total, 0), 2)
  }

  getTotalCourse() {
    return round(this.courses.reduce((sum, course) => sum + course.totalCost(), 0), 2)
  }

  getSubtotal() {
    return this.getTotalRoom() + this.getTotalYVP() + this.getTotalCourse()
  }

  getGrandTotal() {
    return this.getSubtotal()
  }
}
