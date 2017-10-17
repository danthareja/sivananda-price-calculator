# Sivananda Price Calculator
A reservation price calculator for Sivananda Ashram Yoga Retreat

## Example

```js
import { ReservationCalculator } from 'sivananda-price-calculator'

// One adult staying 3 nights in an Ocean View Deluxe during the Winter 2017 season
const calculator = new ReservationCalculator({
  adults: 1,
  stays: [{
    type: 'ROOM',
    roomId: 'OCEANVIEW',
    checkInDate: '2016-11-01',
    checkOutDate: '2016-11-04'
  }]
})

calculator.getGrandTotal()
```

## Installation

To install this library, you must have access to [`npm`](https://www.npmjs.com) or [`yarn`](https://yarnpkg.com/en/)

```sh
npm install danthareja/sivananda-price-calculator
# - or -
yarn add danthareja/sivananda-price-calculator
```

## Usage

Coming soon. In the mean time, check out `test/ReservationCalculator.js` for more examples.