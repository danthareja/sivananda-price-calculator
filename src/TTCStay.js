import { ROOM_ID } from './constants'
import { createMoment } from './moment'
import RoomStay from './RoomStay'

// Room ID's allowed for a TTC stay
const roomIds = [
  ROOM_ID.TENT_SPACE,
  ROOM_ID.TENT_HUT,
  ROOM_ID.DORMITORY
];

// Dates of TTC, including the 1 free day
const dates = [{
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

export default class TTCStay extends RoomStay {
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

// Combine rooms and dates together
TTCStay.getDates = () => _.flatMap(TTCStay._dates, date =>
  TTCStay._roomIds.map(roomId => {
    return _.assign({ roomId }, date)
  })
);
