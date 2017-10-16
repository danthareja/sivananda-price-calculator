// A common module to consistently import the extended version of 'moment'
import Moment from 'moment'

// Importing moment-range as a commonjs module avoids the rollup error
// Error: 'extendMoment' is not exported by node_modules/moment-range/dist/moment-range.js
const { extendMoment } = require('moment-range')

const format = 'YYYY-MM-DD'

export const moment = extendMoment(Moment)

export const createMoment = (date) => {
  return moment(date, format)
}

export const formatMoment = (moment) => {
  return moment.format(format)
}
