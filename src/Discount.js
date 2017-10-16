import { DISCOUNT } from './constants'

export default class Discount {
  constructor({ type = DISCOUNT.FIXED, value = 0 } = {}) {
    this.type = type
    this.value = value
  }

  calculateAmount(price) {
    switch (this.type) {
      case DISCOUNT.PERCENT:
        return price * ( this.value / 100 )
      case DISCOUNT.FIXED:
        return this.value
      default:
        return 0
    }
  }

  applyTo(price) {
    return price - this.calculateAmount(price)
  }
}
