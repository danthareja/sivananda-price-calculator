export default class Discount {
  constructor({ type = 'FIXED', value = 0 } = {}) {
    this.type = type
    this.value = value
  }

  calculateAmount(price) {
    switch (this.type) {
      case 'PERCENT':
        return price * ( this.value / 100 )
      case 'FIXED':
        return this.value
      default:
        return 0
    }
  }

  calculateDailyAmount(price, days) {
    switch (this.type) {
      case 'PERCENT':
        return price * ( this.value / 100 )
      case 'FIXED':
        return this.value / days
      default:
        return 0
    }
  }
}
