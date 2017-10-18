import moment from 'moment'
import Discount from './Discount'

export default class Course {
  constructor({ startDate, endDate, tuition, discount }) {
    this.startDate = moment(startDate)
    this.endDate = moment(endDate)
    this.tuition = tuition
    this.discount = new Discount(discount || {})
  }

  doesYVPApply(date) {
    // YVP is not included duing the duration of the course and one night before
    return date.isBetween(this.startDate.clone().subtract(1, 'days'), this.endDate, 'days', [])
  }

  totalCost() {
    return this.discount.applyTo(this.tuition)
  }
}
