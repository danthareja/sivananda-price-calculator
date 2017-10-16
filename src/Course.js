import { moment, createMoment } from './moment'
import Discount from './Discount'

export default class Course {
  constructor({ startDate, endDate, tuition, discount }) {
    this._startDate = startDate
    this._endDate = endDate
    this.tuition = tuition
    this.discount = new Discount(discount || {})
  }

  startDate() {
    return createMoment(this._startDate)
  }

  endDate() {
    return createMoment(this._endDate)
  }

  // YVP is not included duing the duration of the course and one night before
  doesYVPApply(date) {
    return date.within(moment.range(this.startDate().subtract(1, 'days'), this.endDate()))
  }

  totalCost() {
    return this.discount.applyTo(this.tuition)
  }
}
